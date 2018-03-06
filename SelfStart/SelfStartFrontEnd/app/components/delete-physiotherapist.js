import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  modalName: computed(function () {
    return 'Delete-physiotherapest' + this.get('ID');
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

          this.get('DS').find('physiotherapest', this.get('ID')).then((physiotherapest) => {
    
            physiotherapest.set('name', '');
            physiotherapest.save().then(function () {
              physiotherapest.destroyRecord();
            });
          });

        }
      })
        .modal('show');
    },
  }
});

