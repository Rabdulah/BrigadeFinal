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
          //check if user is filling one of the form fields
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

  maritalStatusModel: computed(function(){
    return this.get('DS').findAll('maritalStatus');
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
        provinces: self.get('provinces'),
        cities: self.get('cities'),
        dateOfBirth: self.get('selectedDate'),
        healthCardNumber: self.get('healthCardNumber'),
        occupation: self.get('occupation'),
        gender: self.get('gender'),
        maritalStatus: self.get('maritalStatus'),
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
      this.set('provinces', '');
      this.set('cities', '');
      this.set('healthCardNumber', '');
      this.set('gender', '');
      this.set('maritalStatus', '');
      this.set('dateOfBirth', '');
      this.set('occupation', '');
      this.set('phoneNumber', '');
      this.set('postalCode', '');

    }
  },

});


