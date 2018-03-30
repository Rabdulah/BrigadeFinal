import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';
import Ember from 'ember';

export default Component.extend({
  plansData: null,
  store: inject('store'),
  model: null,
  ajax: Ember.inject.service(),

  modalName: computed(function () {
    return 'editAssign' + this.get('plansData').id;
  }),

  actions: {
    openModal: function () {
      $('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,

        transition: 'fly down',

        onDeny: () => {
          return true;
        },
        onApprove: () => {

          let link = this.get('store').createRecord('rehab-client-link', {
            terminated: this.get('plansData.terminated'),
            RehabilitationPlan: this.get('plansData'),
            Patient: this.get('model'),
            assigned: true
          });

          let tests = this.get('store').findAll('assessment-test');
          console.log(tests);
          tests.forEach(test => {
            console.log(test.get('rehabLink'));
            if (test.get('rehabLink') === null ) {
              let thisLink = this.get('store').findRecord('rehab-client-link', "5ab930d8e13ebe423412e083");
              console.log(thisLink);
              test.set('rehabLink', thisLink);
              console.log(test);
            }
          })
         link.save().then((res)=> {
              this.get('ajax').request('http://localhost:8082/rehabClientLinks', {
                method: 'POST',
                data: {
                  rehabClientLink: {
                    terminated: this.get('plansData.terminated'),
                    RehabilitationPlan: this.get('plansData'),
                    Patient: this.get('model'),
                    assigned: true
                  }
                },
                success: function(res) {
                  if(res.success) {
                    $('.ui.' + this.get('modalName') + '.modal').modal('hide');
                    return true;
                  } else {
                    alert("This Rehab Plan is already assigned to this patient");
                  }
                }
              });

            if (res.success) {
              $('.ui.' + this.get('modalName') + '.modal').modal('hide');
              return true;
            } else {
              alert("This Rehab Plan is already assigned to this patient");
            }
          });
        }
      })
        .modal('show');
    },
  }
});
