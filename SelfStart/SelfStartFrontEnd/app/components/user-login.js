import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  router: inject('-routing'),
  model: null,
  ajax: Ember.inject.service(),
  temp: false,
  authentication: inject('auth'),
  authent: inject('auth'),
  error: null,

  errorMessage: Ember.computed('error', function () {
    return this.get('error');
  }),
 
  actions: {
   
    deny(){
      $('.ui.login.modal').modal('hide');
    },

    submit(){
      var auth = this.get("authentication");
      var self = this;
      if (this.get('Email') === "root") {
        auth.openRoot(this.get('password')).then(function (name) {
          auth.set('isLoginRequested', false);
          auth.set('getName', name);
          self.get('routing').transitionTo('home');
        }, function () {
          //console.log("Root" + error);
        });
      } else {
      auth.open(this.get('Email'), this.get('PWord')).then(function() {
        auth.set('isLoginRequested', false);
      }, function(error) {
        if (error === "passwordReset") {
          Ember.$('.ui.changePassword.modal').modal({
            // closable: false,
            // detachable: false,
            onDeny: function () {
              self.set('error', null);
              return true;
            },
            onApprove: function () {
              if (!self.get('firstPassword') || self.get('firstPassword').trim().length === 0) {
                self.set('error', 'Your must enter a password value');
                return false;
              } else {
                if (self.get('firstPassword') !== self.get('secondPassword')) {
                  self.set('error', 'Your password and confirmation password do not match');
                  return false;
                } else {
                  self.set('error', null);
                  // var ourAuth = self.get('authent')
                  var myStore = self.get('DS');
                  var userName = self.get('name');
                  console.log()
                  var hashedPassword = auth.hash(self.get('firstPassword'));
                  console.log("BEfore");
                  console.log(self.get('Email'));
                  myStore.queryRecord('password', {filter: {"email": self.get('Email')}}).then(function (userShadow) {
                    console.log("hashedPassword", hashedPassword);
                    auth.set('encryptedPassword', hashedPassword);
                    userShadow.set('encryptedPassword', hashedPassword);
                    userShadow.set('passwordMustChanged', true);
                    console.log(userShadow);
                    userShadow.set('passwordReset', false);
                    userShadow.save().then(function () {
                      // auth.close();
                      auth.set('isLoginRequested', true);
                      console.log("Success update");
                      // self.get('routing').transitionTo('login');
                    //  return true;
                    });
                  });
                }
              }
            }
          })
            .modal('show');
        } else {
          if (error === "wrongUserName") {
            self.set('error', 'Please enter a correct user name');
          } else {
            if (error === "wrongPassword") {
              console.log("Wrong Pass");
              self.set('error', 'Please enter a correct password');
            } else {
              if (error === "loginFailed") {
                self.set('error', 'Login Failed ...');
              }
            }
          }
        }
      });
    }
    },

    logout: function() {
      localStorage.clear();
    },

    openModal: function ()  {
      $('.ui.login.modal').modal({}).modal('show')
    },
  }

});
