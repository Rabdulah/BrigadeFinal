import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),

  tagName: '',

  didRender() {
    this._super(...arguments);

    $(document).ready(function ($) {
      if ($('.floating-labels').length > 0) floatLabels();

      function floatLabels() {
        var inputFields = $('.floating-labels .cd-label').next();
        inputFields.each(function () {
          var singleInput = $(this);
          //check if  is filling one of the form fields
          checkVal(singleInput);
          singleInput.on('change keyup', function () {
            checkVal(singleInput);
          });
        });
      }

      function checkVal(inputField) {
        ( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
      }

    });
  },


  conutryModel: computed(function(){
    return this.get('DS').findAll('country');
  }),

  genderModel: computed(function(){
    return this.get('DS').findAll('gender');
  }),



  actions: {

    addPatient(){
      this.set('isEditing', true);
    },

    assignDate (date){
      this.set('selectedDate', date);
    },


    cancel() {
      return true;
    },

    save: function () {

      let self = this;

      let patient = this.get('DS').createRecord('patient', {
        familyName: self.get('familyName'),
        givenName: self.get('givenName'),
        email: self.get('email'),
        streetName: self.get('streetName'),
        streetNumber: self.get('streetNumber'),
        apartment: self.get('apartment'),
        country: self.get('country'),
        province: self.get('province'),
        city: self.get('city'),
        dateOfBirth: self.get('selectedDate'),
        healthCardNumber: self.get('healthCardNumber'),
        gender: self.get('gender'),
        phoneNumber: self.get('phoneNumber'),
        postalCode: self.get('postalCode'),

      });
      patient.save().then(() =>{
        this.get('routing').transitionTo('patients');
      });

      this.set('familyName', '');
      this.set('givenName', '');
      this.set('email', '');
      this.set('streetName', '');
      this.set('streetNumber', '');
      this.set('apartment', '');
      this.set('country', '');
      this.set('province', '');
      this.set('city', '');
      this.set('healthCardNumber', '');
      this.set('gender', '');

      this.set('dateOfBirth', '');

      this.set('phoneNumber', '');
      this.set('postalCode', '');

    }
  },

});


