import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  router: inject('-routing'),
  loggedOut: false,
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
    // this.set('userAccountName', '');
    this.set('encryptedPassword', '');

    // this.set('selectedGender', this.get('selectedGender'));
    // this.set('selectedCountry', this.get('selectedCountry'));
  },

  didRender() {
    this._super(...arguments);

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
  },


  conutryModel: computed(function(){
    return this.get('DS').findAll('country');
  }),

  genderModel: computed(function(){
    return this.get('DS').findAll('gender');
  }),

  accountValue: "active",
  introValue: "disabled",
  appointmentValue: "disabled",
  paymentValue: "disabled",
  confirmValue: "disabled",

  account: true,
  intro: false,
  appointment: false,
  payment: false,
  confirm: false,

  actions: {
    assignDate(date) {
      this.set('selectedDate', date);
    },

    selectCountry(country) {
      this.set('selectedCountry', country);
    },

    selectGender(gender) {
      this.set('selectedGender', gender);
    },

    submit() {

      let self = this;

      let patientAccount = {};
      // patientAccount['userAccountName'] = localStorage.getItem('UName');
      patientAccount['encryptedPassword'] = self.get('encryptedPassword');

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
        gender: self.get('selectedGender'),
        phoneNumber: self.get('phoneNumber'),
        postalCode: self.get('postalCode'),
        account: patientAccount
      });

      patient.save().then((patient) =>{
        localStorage.clear();
        // localStorage.setItem('loggedIn', false);
      });

    },
    backToAccount() {
      this.set('accountValue', "active");
      this.set('introValue', "");
      this.set('intro', false);
      this.set('account', true);
    },
    goToAppointment() {
      this.set('introValue', "completed");
      this.set('appointmentValue', "active");
      this.set('appointment', true);
      this.set('intro', false);
    },
    backToIntro() {
      this.set('introValue', "active");
      this.set('appointmentValue', "");
      this.set('intro', true);
      this.set('appointment', false);
    },
    goToPayment() {
      this.set('paymentValue', "active");
      this.set('appointmentValue', "completed");
      this.set('appointment', false);
      this.set('payment', true);
    },
    backToAppointment() {
      this.set('appointmentValue', "active");
      this.set('paymentValue', "");
      this.set('payment', false);
      this.set('appointment', true);
    },
    goToConfirm() {
      this.set('confirmValue', "active");
      this.set('paymentValue', "completed");
      this.set('payment', false);
      this.set('confirm', true);
    },
    backToPayment() {
      this.set('paymentValue', "active");
      this.set('confirmValue', "");
      this.set('payment', true);
      this.set('confirm', false);
    },
    goToPaypal() {

    },
  }
});


