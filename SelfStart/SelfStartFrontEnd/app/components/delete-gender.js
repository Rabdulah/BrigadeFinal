import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  modalName: computed(function () {
    return 'Delete-gender' + this.get('ID');
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

          this.get('DS').find('gender', this.get('ID')).then((gender) => {
            gender.set('name', '');
            gender.save().then(function () {
              gender.destroyRecord();
            });
          });

        }
      })
        .modal('show');
    },
  }
});


