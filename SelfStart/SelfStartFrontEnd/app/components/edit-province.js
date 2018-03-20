import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  provinceData: null,
  name: computed.oneWay('provinceData.name'),

  modalName: computed(function () {
    return 'editProvince' + this.get('ID');
  }),

  countries: computed(function(){
    return this.get('DS').findAll('country');
  }),

  actions: {
    setCountryId: function (comp, id) {
      this.set('countryId', id);
    },
    openModal: function () {
      this.set('provinceData', this.get('DS').peekRecord('province', this.get('ID')));


      $('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        transition: 'horizontal flip',

        onDeny: () => {
          return true;
        },

        onApprove: () => {

          var country = this.get('DS').peekRecord('country', this.get('countryId'));

          this.get('DS').findRecord('province', this.get('ID')).then((rec) =>{
            rec.set('name', this.get('name') );
            rec.set('country', country);
            rec.save().then(()=>{
              return true;
            });
          });
        }
      })
        .modal('show');
    },
  }
});
