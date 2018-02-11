import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  modalName: computed(function () {
    return 'Delete-Country' + this.get('ID');
  }),

  actions: {
    openModal: function () {
      $('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {

          this.get('DS').find('country', this.get('ID')).then((country) => {
            country.set('name', '');
            country.save().then(function () {
              country.destroyRecord();
            });
          });

        }
      })
        .modal('show');
    },
  }
});

