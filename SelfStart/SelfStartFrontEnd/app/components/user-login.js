import Component from '@ember/component';
import { inject } from '@ember/service';
import Ember from 'ember';

export default Component.extend({
    DS: inject('store'),

    ajax: Ember.inject.service(),

    authentication() {
        return this.get('ajax').request('http://localhost:8082/patients/Authenticate', {
          method: 'POST',
          data: {
            email: this.get('Email'),
            password: this.get('PWord')
          },
          success: function(res) {
              localStorage.setItem('id_token', res.token);
          }
        });
    },

    actions: {
        submit: function() {
            this.authentication();
        }
    }
});
