import Component from '@ember/component';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  actions: {



    openModal: function () {
      this.set('name', null);
      this.set('provinces', []);
      // this.set('patient', null);


      $('.ui.newCountry.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {
          var newCountry = this.get('DS').createRecord('country', {
            name: this.get('name'),
            provinces: this.get('provinces'),
            // patient: this.get('patient'),
          });
          newCountry.save().then(()=> {
            return true;
          });
        }
      })
        .modal('show');
    },
  }
});
