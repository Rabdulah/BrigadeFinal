import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  modalName: computed(function () {
    return 'Delete-Province' + this.get('ID');
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

          this.get('DS').find('province', this.get('ID')).then((province) => {
            province.set('name', '');
            province.set('country', null);
            province.save().then(function () {
              province.destroyRecord();
            });
          });

        }
      })
        .modal('show');
    },
  }
});


