import Component from '@ember/component';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  actions: {
    openModal: function ()  {
      this.set('name', null);

      $('.ui.small.newStatus.modal').modal({
        closable: false,
        detachable: false,

        onDeny:  () => {
          return true;
        },

        onApprove: () => {

          let newStatus = this.get('DS').createRecord('maritalStatus', {
            name: this.get('name'),
          });
          newStatus.save().then(()=> {
            return true;
          });
        }
      }).modal('show')
    },
  }

});
