import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  rehabilitationplansData: null,
  description: computed.oneWay('rehabilitationplansData.description'),
  physioID: computed.oneWay('rehabilitationplansData.physioID'),
  goal: computed.oneWay('rehabilitationplansData.goal'),
  timeToComplete: computed.oneWay('rehabilitationplansData.timeToComplete'),
  planName: computed.oneWay('rehabilitationplansData.planName'),
  exercises: computed.oneWay('rehabilitationplansData.exercises'),
  assessmentTests: computed.oneWay('rehabilitationplansData.assessmentTests'),

  modalName: computed(function () {
    return 'editRehabilitationplan' + this.get('ID');
  }),

  actions: {
    openModal: function () {
      this.set('rehabilitationplansData', this.get('DS').peekRecord('rehabilitationplan', this.get('ID')))

      $('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        transition: 'horizontal flip',
        detachable: false,
        onDeny: () => {
          return true;
        },

        onApprove: () => {
          this.get('DS').findRecord('rehabilitationplan' , this.get('ID')).then((rec)=>{
            rec.set('planName', this.get('planName'));
            rec.set('description', this.get('description'));
            rec.set('physioID', this.get('physioID'));
            rec.set('goal', this.get('goal'));
            rec.set('timeToComplete', this.get('timeToComplete'));
            rec.set('exercises', this.get('exercises'));
            rec.set('assessmentTests', this.get('assessmentTests'));
            rec.save().then(()=>{
              return true;
            });
          });
        }
      })
        .modal('show');
    },
  }


});
