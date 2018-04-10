import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  DS: inject('store'),
  flagDelete: null,

  modalName: computed(function () {
    return 'Delete-patient' + this.get('ID');
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
          let a =(this.get('ID'));
          let b= (this.get('patientID'));
          this.get('DS').queryRecord('rehab-client-link',{filter:
            {'assessmentTest': a,
              'Patient' : b}}).then((obj)=>{
            obj.set('terminated', true);
            obj.save().then(()=>{
              return true;
            })
          });
          // let patient = this.get('DS').peekRecord('assessment-test', this.get('ID'));
          // console.log(patient);
          // patient.set('terminated', true);
          // patient.save().then(()=>{
          //   return true;
          // })
        }
      })
        .modal('show');
    },
  }
});
