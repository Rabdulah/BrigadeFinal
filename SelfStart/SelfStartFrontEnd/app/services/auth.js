import Ember from 'ember';
import crypto from "npm:crypto-browserify";

export default Ember.Service.extend({
  email: null,
  encryptedPassword: null,
  isAuthenticated: false,
  store: Ember.inject.service(),
  isLoginRequested: false,
  userCList: null,
  ajax: Ember.inject.service(),

  getName: Ember.computed(function () {
    var identity = localStorage.getItem('sas-session-id');
    if (identity) {
      return this.decrypt(identity);
    } else {
      return null;
    }
  }),

  setName(name) {
    this.set('email', name.toLowerCase());
    var identity = this.encrypt(this.get('email'));
    localStorage.setItem('sas-session-id', identity);
  },


  setPassword(password) {
    this.set('encryptedPassword', this.hash(password));
  },

  hash(text){
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('binary');
  },

  encrypt(plainText){
    var cipher = crypto.createCipher('aes256', 'SE3350b Winter 2016');
    var crypted = cipher.update(plainText, 'ascii', 'binary');
    crypted += cipher.final('binary');
    return crypted;
  },

  decrypt(cipherText){
    var decipher = crypto.createDecipher('aes256', 'SE3350b Winter 2016');
    var dec = decipher.update(cipherText, 'binary', 'ascii');
    dec += decipher.final('ascii');
    return dec;
  },

  open(email, password) {
    var self = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      // send username and password to the server asking for a challenge (nonce)
      console.log(password)
      self.setPassword(password);
      var myStore = self.get('store');
      
      self.get('ajax').request(window.location.protocol + "//" +  window.location.hostname + ":8082" + "/Authenticate", {
        method: 'POST',
        data: {
          email: email,
          password: null, //first message password should be null
          nonce: null,  // a challenge from the server
          response: null,  // client response
          requestType: "open"
        },
        success: function(serverResponse) {
          console.log(serverResponse)
          console.log(serverResponse.login.loginFailed);
          if (serverResponse.login.loginFailed) {
            self.close(name);
            reject("loginFailed");
          } else {
            if (serverResponse.login.wrongUserName) {
              //       self.close(name);
              reject("wrongUserName");
            } else {
              var NONCE = self.encrypt(serverResponse.login.nonce);
              console.log("NONCE", NONCE);
              self.get('ajax').request(window.location.protocol + "//" +  window.location.hostname + ":8082" + "/Authenticate", {
                method: 'POST',
                data: {
                  email: email,
                  password: self.get('encryptedPassword'),
                  nonce: null,  // a challenge from the server
                  response: NONCE,  // client response
                  requestType: "openResponse"
                },
                success: function(message4) {
                  console.log(message4);
                  if (serverResponse.login.loginFailed) {
                    ////  self.close(name);
                    reject("loginFailed");
                  } else {
                    if (message4.login.wrongPassword) {
                      ////self.close(name);
                      reject("wrongPassword");
                    } else {
                      if (message4.login.passwordReset) {
                        //self.close(name);
                        reject("passwordReset");
                      } else {
                        self.setName(name);
                        // var userRole = self.decrypt(message4.get('token'));
                        var userRole = null;
                        self.set('isAuthenticated', true);
                        // self.set('userCList', userRole);
                        resolve(userRole);
                      }
                    }
                  }
                }
              });
          }
        }
      }
    });

    });
  },

  fetch()
  {
    // get the current token from backend database
    var self = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      var identity = localStorage.getItem('sas-session-id');
      if (identity) {
        var email = self.decrypt(identity);
        self.set('email', email);
        var myStore = self.get('store');
        
        self.get('ajax').request(window.location.protocol + "//" +  window.location.hostname + ":8082" + "/Authenticate", {
                method: 'POST',
                data: {
                  email: email,
                  password: null,
                  nonce: null,
                  response: null,
                  requestType: "fetch"
                },
                success: function(serverResponse) {
                  if (serverResponse.login.loginFailed) {
                    self.close(name);
                    reject("fetchFailed");
                  } else {
                    var NONCE = self.encrypt(serverResponse.login.nonce);
                    self.get('ajax').request(window.location.protocol + "//" +  window.location.hostname + ":8082" + "/Authenticate", {
                      method: 'POST',
                      data: {
                        email: email,
                        password: null,
                        nonce: null,  // a challenge from the server
                      response: NONCE,  // client response
                      requestType: "fetchResponse"
                      },
                      success: function(givenToken) {
                        if (givenToken.loginFailed) {
                          self.close(name);
                          reject("fetchFailed");
                        } else {
                          // var plainToken = self.decrypt(givenToken.get('token'));
                          var plainToken = null;
                          self.set('isAuthenticated', true);
                          self.set('userCList', plainToken);
                          resolve(plainToken);
                        }
                      }
                    });
                  } 
                }
              });
      }
      else {
        reject("userNotActive");
      }
    });
  },

  close(user)
  {
    var myStore = this.get('store');
    myStore.query('login', {filter: {email: user}}).then(function (Login) {
      if (Login) {
        Login.forEach((record) => {
          record.destroyRecord();
        });
      }
    });
    window.localStorage.removeItem('sas-session-id');
    this.set('getName', null);
    this.set('email', null);
    this.set('encryptedPassword', null);
    this.set('isAuthenticated', false);
    this.set('isLoginRequested', false);
  },

  openRoot(password)
  {
    var self = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (password) {
        var myStore = self.get('store');
        var loginRequest = myStore.createRecord('root', {
          password: null,
          nonce: null,
          response: null
        });
        loginRequest.save().then(function (serverResponse) {
          // encrypt server nonce and set client response
          var NONCE = self.encrypt(serverResponse.get('nonce'));
          var clientResponse = myStore.createRecord('root', {
            password: self.encrypt(self.hash(password)),
            nonce: null,
            response: NONCE
          });
          clientResponse.save().then(function (message4) {
            if (message4.get('wrongPassword')) {
              self.closeRoot();
              reject("wrongPassword");
            } else {
              // self.setName("Root");
              self.set('isAuthenticated', true);
              resolve("Root");
            }

          });
        });
      } else {
        self.closeRoot();
        reject("wrongPassword");
      }

    });
  },

  closeRoot()
  {
    var myStore = this.get('store');
    myStore.queryRecord('root', {}).then(function (Login) {
      if (Login) {
        Login.destroyRecord();
      }
    });
    //window.localStorage.removeItem('sas-session-id');
    this.set('getName', null);
    this.set('email', null);
    this.set('isAuthenticated', false);
    this.set('isLoginRequested', false);
  }
})
;
