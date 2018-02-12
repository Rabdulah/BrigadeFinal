import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  countryId: null,



  countries: function () {
    return this.get('DS').findAll('country');
  }.property(),


  actions: {


    setCountryId: function (comp, id) {
      this.set('countryId', id);
    },

    openModal: function () {
      this.set('name', '');
      this.set('countryId', null);
      this.set('city', []);

      $('.ui.small.newProvince.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {

          let self = this;

          let newProvince = this.get('DS').createRecord('province', {
            name: self.get('name'),
            country: self.get('DS').peekRecord('country', self.get('countryId')),
            city: []
          }).save().then(function () {
            return true;
          });

          // newProvince.save().then(() => {
          //   return true;
          // });
        }
      }).modal('show')
    },
  }
});

