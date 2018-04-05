import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import Ember from "ember";
import $ from 'jquery';


export default Component.extend({
  DS: inject('store'),
  loggedOut: false,


  init(){
    this._super(...arguments);

    this.set('familyName', '');
    this.set('givenName', '');
    this.set('email', '');
    this.set('streetName', '');
    this.set('streetNumber', '');
    this.set('apartment', '');
    this.set('selectedCity', '');
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

  // countryModel: computed(function(){
  //   return this.get('DS').findAll('country');
  // }),

  provModel: [],

  provinces: Ember.observer('country', function(){
    this.get('DS').query('province', {filter: {'country': this.get('country')}}).then((provinces) => {

      this.get('provModel').clear();

      provinces.forEach((prov)=>{
        this.get('provModel').pushObject(prov);
      });

    });
  }),

  cityModel: [],

  cities: Ember.observer('province', function(){
    this.get('DS').query('city', {filter: {'province': this.get('province')}}).then((cities) => {

      this.get('cityModel').clear();

      cities.forEach((rec)=>{
        this.get('cityModel').pushObject(rec);
      });

    });
  }),

  genderModel: computed(function(){
    return this.get('DS').findAll('gender');
  }),


    actions: {
      assignDate(date) {
        this.set('selectedDate', date);
      },

      selectGender(gender) {
        this.set('selectedGender', gender);
      },


      submit() {
        let self = this;

        var temp = [];
        var questionList = [];

        // this.get('DS').findAll('form').then((rec)=>{
        //   rec.forEach((r)=>{
        //     if(r.get('name') === 'Intake Form'){
        //       thisForm = r;
        //     }
        //   })
        // });


        this.get('DS').query('question-order', {filter: {'form': '5ac1ae2773e03d3f78384c92'}}).then((questions) => {

          // self.get('questionList').clear();

          questions.forEach((q)=>{
            temp.push("");
            questionList.pushObject(q.get('question'));

          });

        });


        let newTest = this.get('DS').createRecord('assessment-test', {
          // form: thisForm,
          questions: questionList,
          answers: temp,
          completed: false,
        });
        newTest.save().then(()=> {


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
            country: self.get('country'),
            province: self.get('province'),
            city: self.get('city'),
            dateOfBirth: new Date(this.get('selectedDate')),
            gender: self.get('selectedGender'),
            phoneNumber: self.get('phoneNumber'),
            postalCode: self.get('postalCode'),
            account: patientAccount,
            intakeForm: newTest
          });

          patient.save().then((patient) =>{
            localStorage.clear();
            $('.ui.register.modal').modal('hide');
            // localStorage.setItem('loggedIn', false);
          });
        });
      },



      openModal: function ()  {
        $('.ui.register.modal').modal({
          closable: false,

          onDeny: () => {
            return true;
          },

        }).modal('show')
      },
    }

});
