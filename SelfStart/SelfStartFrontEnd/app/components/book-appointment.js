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
      let client = '5a88738e1f0fdc2b94498e81';
      let booking = this.get('DS').createRecord('appointment', {
        reason: self.get('Reason'),
        other: self.get('Other'),
        date: self.get('selectedDate'),
      });
      this.get('DS').findRecord('patient', client).then(function (src) {
        booking.set('patient', src);
      });
      booking.save().then(() =>{


        console.log(booking);
        this.get('DS').findRecord('patient', client). then(function (a) {
          a.get('appointment').pushObject(booking);
          a.save().then(()=>{
          });
        });

        this.get('DS').findRecord('physiotherapest', self.get('selectphysio')). then(function (a) {
          a.get('appointment').pushObject(booking);
          a.save().then(()=>{
          });
        });


        this.set('Reason', '');
        this.set('Other', '');
        this.set('selectedDate', '');
        //this.get('routing').transitionTo('patients');
      });




    }

  },

});


