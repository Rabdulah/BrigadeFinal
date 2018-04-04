import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import Ember from "ember";
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  selectedProvince: null,


  provModel: [],

  provinceModel: Ember.observer('country', function(){
    this.get('DS').query('province', {filter: {'country': this.get('country')}}).then((provinces) => {

      this.get('provModel').clear();

      provinces.forEach((prov)=>{
        this.get('provModel').pushObject(prov);
      });

    });
  }),

  actions: {

    selectProvince(province) {
      this.set('selectedProvince', province);
    },

    submit(){
      let self = this;

      let newCity = this.get('DS').createRecord('city', {
        name: self.get('name'),
      });

      this.get('DS').findRecord('province', self.get('selectedProvince')).then(function (src) {

        newCity.set('province', src);

        newCity.save().then(function ()  {
          $('.ui.small.newCity.modal').modal('hide');
        });
      });

      this.set('name', '');
      this.set('selectedProvince', null);
    },

    openModal: function () {

      $('.ui.small.newCity.modal').modal({
        closable: false,

        onDeny: () => {
          return true;
        },
      }).modal('show');
    },
  }
});


