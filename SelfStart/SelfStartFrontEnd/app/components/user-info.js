import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  router: inject('-routing'),
  loggedOut: false,
  tagName: '',
  authentication: inject('auth'),

  init(){
    this._super(...arguments);
    // console.log(this.get('authentication').hash("asdads"));
    // console.log(this.get('auth'));
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


  provModel: [],

  provinces: Ember.observer('country', function(){
    this.get('DS').query('province', {filter: {'country': this.get('country')}}).then((provinces) => {

      this.get('provModel').clear();

      provinces.forEach((prov)=>{
        this.get('provModel').pushObject(prov);
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

      let passwords = this.get('DS').createRecord('password', {
        email: self.get('email'),
        encryptedPassword: self.get('authentication').hash(self.get('encryptedPassword')),
        passwordMustChanged : true,
        passwordReset:true,
      });

      console.log("password b4 sent", passwords.get("encryptedPassword"));

      passwords.save().then((passwords) => {
        console.log("Password returned to front end after save", passwords);
        let patient = this.get('DS').createRecord('patient', {
          familyName: self.get('familyName'),
          givenName: self.get('givenName'),
          email: self.get('email'),
          encryptedPassword: passwords,
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
        });

        patient.save().then((res) => {
          console.log('this is the response', res);
          console.log(res.get("success"));
          if(!res.get("success")) {
            console.log("FAILED");
            patient.destroyRecord().then(o => {
              console.log("destroyed", o);
            });
            passwords.destroyRecord().then(o => {});
          } else{
            console.log("SUCCESS", res);
            passwords.set('client', res);
            passwords.save();
          }

          this.get('DS').query('form', {filter: {'name': 'Intake Form'}}).then((intake) => {
            var ans = [];

            let newTest = this.get('DS').createRecord('assessment-test', {
              name: "Intake Form",
              description: "Initial form before ou can book an appointment",
              form: intake.get('firstObject'),
              patient: res,

            });
            newTest.save().then(() => {

              this.get('DS').query('question-order', {filter: {'form': intake.get('firstObject').id}}).then((rec) => {

                rec.forEach((r) => {
                  var q = r.get('question');
                  var s = q.get('data');
                  //console.log(q.get('data.questionText'));
                  //console.log(q.get('questionText'));


                  let answer = this.get('DS').createRecord('answer', {
                    question: "",
                    answer: "",
                    test: newTest
                  });
                  answer.save();

                });

              });
            });
          });

          $('.ui.register.modal').modal('hide');
        });

      })
    },

    openModal: function () {
      console.log("model", this.model);
      $('.ui.register.modal').modal({
        // closable: false,
        // detachable: false,

        onDeny:()=>{
         return true
        },

      }).modal('show');
    },
  }
});


