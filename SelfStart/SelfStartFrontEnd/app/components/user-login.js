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
        authentication.openRoot(this.get('password')).then(function (name) {
          self.get('oudaAuth').set('isLoginRequested', false);
          authentication.set('getName', name);
          self.get('routing').transitionTo('home');
        }, function () {
          //console.log("Root" + error);
        });
      } else {
      auth.open(this.get('Email'), this.get('PWord')).then(function() {
        self.get('authentication').set('isLoginRequested', false);
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
                  var myStore = self.get('DS');
                  var userName = self.get('name');
                  var hashedPassword = auth.hash(self.get('firstPassword'));

                  myStore.queryRecord('password', {filter: {userName: userName}}).then(function (userShadow) {
                    userShadow.set('encryptedPassword', hashedPassword);
                    userShadow.set('passwordMustChanged', true);
                    userShadow.set('passwordReset', false);
                    userShadow.save().then(function () {
                      self.get('authentication').close();
                      self.get('authentication').set('isLoginRequested', true);
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
