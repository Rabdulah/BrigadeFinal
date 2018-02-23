import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),


  getphysio: computed(function(){
    return this.get('DS').findAll('physiotherapest');
  }),



  actions: {
    updateValue(physio){
      this.set('selectphysio', physio);
    },
    assignDate (date){
      this.set('selectedDate', date);

    },

    cancel() {
      return true;
    },


    save: function () {

      let self = this;
      //temp client until we get token
      let client = this.get('DS').find('patient', '5a88738e1f0fdc2b94498e81');
      let physioid = self.get('selectphysio');
      let selectedphysio = this.get('DS').findRecord('physiotherapest', self.get('selectphysio'));
      let booking = this.get('DS').createRecord('appointment', {
        Reason: self.get('Reason'),
        Other: self.get('Other'),
        date: self.get('selectedDate'),
        patient : client
      });
      booking.save().then(() =>{
        console.log(booking.get('id'));
        client.get('appointment').pushObject(booking.get('id'));
        client.save().then(()=>{

        });

        selectedphysio.get('appointment').pushObject(booking.get('id'));
        selectedphysio.save().then(()=>{

        });

        this.set('Reason', '');
        this.set('Other', '');
        this.set('selectedDate', '');
        //this.get('routing').transitionTo('patients');
      });




    }

  },

});


