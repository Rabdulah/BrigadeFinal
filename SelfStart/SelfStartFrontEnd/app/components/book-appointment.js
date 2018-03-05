import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),
  isEditing: false,

  getphysio: computed(function(){
    return this.get('DS').findAll('physiotherapist');
  }),



  actions: {

    bookAppointment(){

      this.set('isEditing', true);
    },

    cancelbookingappointment(){
      this.set('Reason', '');
      this.set('Other', '');
      this.set('selectedDate', '');
      this.set('isEditing', false);
    },
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
      let client = '5a80e1663ddc7324643209cd';
      let physio = self.get('selectphysio');
      console.log(physio);
      let booking = this.get('DS').createRecord('appointment', {
        reason: self.get('Reason'),
        other: self.get('Other'),
        date: self.get('selectedDate'),
      });

      this.get('DS').findRecord('patient', client).then(function (src) {
        booking.set('patient', src);
        src.get('appointments').pushObject(booking);
        booking.save().then(function (){
          console.log(booking);
          src.save().then(()=>{
            self.get('DS').findRecord('physiotherapist',physio).then(function (a) {
              a.get('appointments').pushObject(booking);
              a.save().then(()=>{
                self.set('Reason', '');
                self.set('Other', '');
                self.set('selectedDate', '');
                self.set('isEditing', false);
              });
            });
          });
        });


      });
      // this.get('DS').findRecord('patient', client).then(function (src) {
      //   booking.set('patient', src);
      // });
      // booking.save().then(() =>{
      //   console.log(booking);
      //   this.get('DS').findRecord('patient', client). then(function (a) {
      //     a.get('appointments').pushObject(booking);
      //     a.save().then(()=>{
      //     });
      //   });
      //
      //   this.get('DS').findRecord('physiotherapist', self.get('selectphysio')). then(function (a) {
      //     a.get('appointments').pushObject(booking);
      //     a.save().then(()=>{
      //     });
      //   });
      //
      //
      //   this.set('Reason', '');
      //   this.set('Other', '');
      //   this.set('selectedDate', '');
      //   //this.get('routing').transitionTo('patients');
      // });
    }

  },

});


