import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  modalName: computed(function () {
    return 'Delete-patient' + this.get('ID');
  }),

  actions: {
    openModal: function () {
      $('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        detachable: false,
        transition: 'fly down',

        onDeny: () => {
          return true;
        },
        onApprove: () => {

          this.get('DS').find('patient', this.get('ID')).then((patient) => {
            patient.set('name', '');
            patient.save().then(function () {
              patient.destroyRecord();
            });
          });

        }
      })
        .modal('show');
    },
  }
});

