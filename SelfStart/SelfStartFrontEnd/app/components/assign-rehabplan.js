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
  disabled: "",

  modalName: computed(function () {
    return 'editAssign' + this.get('plansData').id;
  }),

  init(){
    this._super(...arguments);

    let client = this.get('model').id;
    let plan = this.get('plansData').id;

    this.get('store').query('rehab-client-link', {filter: {'RehabilitationPlan': plan, 'Patient': client}}).then((update) => {
      console.log(update.content.length);
      if (update.content.length !== 0) {
        this.set('disabled', "disabled");
      } else {
        this.set('disabled', "");
      }
    })
  },

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
          link.save().then((res)=> {
              $('.ui.' + this.get('modalName') + '.modal').modal('hide');
              this.set('disabled', "disabled");
          });
        }
      })
        .modal('show');
    },
  }
});
