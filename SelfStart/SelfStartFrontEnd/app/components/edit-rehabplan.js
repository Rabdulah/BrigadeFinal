import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({

  DS: inject('store'),
  routing: inject('-routing'),
  rehabilitationplansData: null,
  tagName: '',

  modalName: computed(function () {
    return 'editRehabilitationplan' + this.get('ID');
  }),


  actions: {
    save: function () {
      this.get('DS').findRecord('rehabilitationplan', this.get('rehabilitationplansData').id).then((rec) =>{
        rec.set('planName', this.get('rehabilitationplansData.planName'));
        rec.set('description', this.get('rehabilitationplansData.description'));
        rec.set('physioID', this.get('rehabilitationplansData.physioID'));
        rec.set('goal', this.get('rehabilitationplansData.goal'));
        rec.set('timeToComplete', this.get('rehabilitationplansData.timeToComplete'));
        // rec.set('exercises', this.get('exercises'));

        rec.save().then(()=>{
          this.get('routing').transitionTo('rehabplans');
        });
      });
    }
  }


});
