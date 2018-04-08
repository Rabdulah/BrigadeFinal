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

    this.set('familyName', 'abcde');
    this.set('givenName', 'a');
    this.set('email', 'af@dsa.ax');
    this.set('streetName', 'a');
    this.set('streetNumber', 'a');
    this.set('apartment', 'a');
    this.set('selectedCity', 'a');
    this.set('province', 'a');
    this.set('city', 'a');
    this.set('healthCardNumber', 'aa');
    this.set('selectedGender', 'aa');
    this.set('dateOfBirth', 'a');
    this.set('phoneNumber', '');
    this.set('postalCode', 'a');
    // this.set('userAccountName', '');
    this.set('encryptedPassword', 'aaa');

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

         //var temp = [];
         //var questionList = [];


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
        });

        patient.save().then((patient) =>{
          this.get('DS').query('form', {filter: {'name': 'Intake Form'}}).then((intake) => {

            var ans = [];


            //console.log(intake.get('firstObject'));

            let newTest = this.get('DS').createRecord('assessment-test', {
              name: "Intake Form",
              description: "Initial form before you can book an appointment",
              form: intake.get('firstObject'),
              patient: patient,

            });
            newTest.save().then(()=> {
              console.log("in save");
              this.get('DS').query('question-order', {filter: {'form': intake.get('firstObject').id}}).then((rec)=>{

                rec.forEach((r)=>{
                  var q = r.get('question');
                  var s = q.get('data');
                  console.log(q.questionText);
               //   console.log(r[this.get('question')].get('questionText'));
               //   console.log(q.get('questionText'));


                  let answer = this.get('DS').createRecord('answer', {
                    question: "test",
                    answer: "",
                    test: newTest
                  });
                  answer.save();

                })

              });

              localStorage.clear();
              $('.ui.register.modal').modal('hide');
              // localStorage.setItem('loggedIn', false);
            });
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
