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
  errorMessage: null,

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
    this.set('skype', '');
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

    close(){
      let self = this;
      self.set('familyName', "");
      self.set('givenName', "");
      self.set('email', "");
      self.set('confirmPassword', "");
      self.set('encryptedPassword', "");
      self.set('streetName', "");
      self.set('streetNumber', "");
      self.set('apartment', "");
      self.set('country', null);
      self.set('city', "");
      self.set('dateOfBirth', "");
      self.set('gender', null);
      self.set('phoneNumber', "");
      self.set('skype', "");
      self.set('postalCode', "");
      self.set("errorMessage", null)
    },
    submit() {
      let self = this;

      if(this.get("encryptedPassword") === this.get("confirmPassword")) {
        
      let passwords = this.get('DS').createRecord('password', {
        email: self.get('email'),
        encryptedPassword: self.get('authentication').hash(self.get('encryptedPassword')),
        passwordMustChanged : true,
        passwordReset:false,
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
          country: self.get('country'),
          province: self.get('province'),
          city: self.get('city'),
          dateOfBirth: new Date(this.get('selectedDate')),
          gender: self.get('selectedGender'),
          phoneNumber: self.get('phoneNumber'),
          postalCode: self.get('postalCode'),
          skype: self.get('skype')
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
              description: "Initial form before you can book an appointment",
              form: intake.get('firstObject'),
              patient: res,
            
            });
            newTest.save().then(() => {

              this.get('DS').query('question-order', {filter: {'form': intake.get('firstObject').id}}).then((rec) => {

                rec.forEach((r) => {



                 //console.log(r.get('order'));
                  //console.log(q.get('questionText'));
                    r.get('question').then((q)=>{
                      let answer = this.get('DS').createRecord('answer', {
                        question: q.get('questionText'),
                        answer: "",
                        test: newTest
                      });

                    answer.save();
                      })


                });

              });
            });
          });

          $('.ui.register.modal').modal('hide');
        });

      })
      self.set('familyName', "");
      self.set('givenName', "");
      self.set('email', "");
      self.set('encryptedPassword', "");
      self.set('confirmPassword', "");
      self.set('streetName', "");
      self.set('streetNumber', "");
      self.set('apartment', "");
      self.set('country', null);
      self.set('city', "");
      self.set('dateOfBirth', "");
      self.set('gender', null);
      self.set('phoneNumber', "");
      self.set('skype', "");
      self.set('postalCode', "");
      self.set("errorMessage", null)
    } else {
      this.set("errorMessage", "Password and confirm password don't match!")
    }
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


