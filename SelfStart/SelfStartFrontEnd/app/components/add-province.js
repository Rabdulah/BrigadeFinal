import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  //selectedCountry: null,



  actions: {

    selectCountry(country) {
      this.set('selectedCountry', country);
    },


    submit(){
      let self = this;

      let newProvince = this.get('DS').createRecord('province', {
        name: self.get('name'),
      });

      this.get('DS').findRecord('country', self.get('selectedCountry')).then(function (src) {

        newProvince.set('country', src);

        newProvince.save().then(function ()  {
          $('.ui.small.newProvince.modal').modal('hide');
        });
      });

      this.set('name', '');
      this.set('selectedCountry', null);
    },

    openModal: function () {


      $('.ui.small.newProvince.modal').modal({
        closable: false,

        onDeny: () => {
          return true;
        },
      }).modal('show');
    },
  }
});


