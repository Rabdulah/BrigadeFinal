import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),

  tagName: '',

  init(){
    this._super(...arguments);

    this.set('familyName', '');
    this.set('givenName', '');
    this.set('email', '');
    this.set('streetName', '');
    this.set('streetNumber', '');
    this.set('apartment', '');
    this.set('selectedCountry', '');
    this.set('province', '');
    this.set('city', '');
    this.set('healthCardNumber', '');
    this.set('selectedGender', '');
    this.set('dateOfBirth', '');
    this.set('phoneNumber', '');
    this.set('postalCode', '');
    this.set('userAccountName', '');
    this.set('encryptedPassword', '');

    // this.set('selectedGender', this.get('selectedGender'));
    // this.set('selectedCountry', this.get('selectedCountry'));
  },

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

    assignDate (date){
      this.set('selectedDate', date);
    },

    selectCountry (country){
      this.set('selectedCountry', country);
    },

    selectGender (gender){
      this.set('selectedGender', gender);
    },

    cancel() {
      return true;
    },

    save: function () {

      let self = this;

      let patientAccount = {};
      patientAccount['userAccountName'] = self.get('userAccountName');
      patientAccount['encryptedPassword'] =    self.get('encryptedPassword');

      let patient = this.get('DS').createRecord('patient', {
        familyName: self.get('familyName'),
        givenName: self.get('givenName'),
        email: self.get('email'),
        streetName: self.get('streetName'),
        streetNumber: self.get('streetNumber'),
        apartment: self.get('apartment'),
        country: self.get('selectedCountry'),
        province: self.get('province'),
        city: self.get('city'),
        dateOfBirth: new Date(this.get('selectedDate')),
        healthCardNumber: self.get('healthCardNumber'),
        gender: self.get('selectedGender'),
        phoneNumber: self.get('phoneNumber'),
        postalCode: self.get('postalCode'),
        account: patientAccount
      });

        patient.save().then(() =>{
          this.get('routing').transitionTo('patients');
        });

    }
  },

});


