import Component from '@ember/component';
import { inject } from '@ember/service';
import Ember from 'ember';

export default Component.extend({
    DS: inject('store'),

    ajax: Ember.inject.service(),
    temp: false,

    authentication() {
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
          }
        });
        } else {
            console.log("NOT AN ACC");
        }
    },

    actions: {
        submit: function() {
            localStorage.setItem('temp', false);
            this.get('ajax').request('http://localhost:8082/patients/' + this.get('Email'), {
                method: 'GET',
                success: function(res) {
                    console.log(res);
                    if(res.patient) {
                        console.log("THIS IS A CLIENT");
                        localStorage.setItem('temp', true);
                    }
                }
            });

            this.get('ajax').request('http://localhost:8082/administrators/' + this.get('Email'), {
                method: 'GET',
                success: function(res) {
                    if(res.admin) {
                        console.log("THIS IS A Admin");
                        localStorage.setItem('temp', true);
                    }
                }
            });

            this.get('ajax').request('http://localhost:8082/physiotherapests/' + this.get('Email'), {
                method: 'GET',
                success: function(res) {
                    if(res.physio) {
                        console.log("THIS IS A Physio");
                        localStorage.setItem('temp', true);
                    }
                }
            });
            
            // if(localStorage.getItem('temp')) {
                this.authentication();
            // } else {
                // console.log("NOT AN ACCOUNT");
            // }

        },
        logout: function() {
            localStorage.clear();
        }
    }
});
