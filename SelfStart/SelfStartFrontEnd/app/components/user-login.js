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

  authentication() {
    var self= this;
    if(localStorage.getItem('temp')) {
      return this.get('ajax').request('http://localhost:8082/Authenticate', {
        method: 'POST',
        data: {
          email: this.get('Email'),
          password: this.get('PWord')
        },
        success: function(res) {
          localStorage.setItem('id_token', res.token);
          localStorage.setItem('user_level', res.user.account.accType);
          localStorage.setItem('_id', res.user._id);
          localStorage.setItem('loggedIn', true);
          $('.ui.login.modal').modal('hide');
          this.get('router').transitionTo('dashboard');

        }
      });

    } else {
      console.log("NOT AN ACC");
    }
  },


  actions: {
    goToInfo(){

    },

    deny(){
      $('.ui.login.modal').modal('hide');
    },

    submit(){
      var auth = this.get("authentication");
      var self = this;
      auth.open(this.get('Email'), this.get('PWord')).then(function() {
        self.get('authentication').set('isLoginRequired', false);
      }, function(error) {
      });
    },

    logout: function() {
      localStorage.clear();
    },

    openModal: function ()  {
      $('.ui.login.modal').modal({}).modal('show')
    },
  }

});
