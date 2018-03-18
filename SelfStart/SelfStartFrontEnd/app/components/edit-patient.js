import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),

  selectedGender: null,
  selectedCountry: null,

  pateintsData: null,

  // title: computed.oneWay('pateintsData.title'),
  // body: computed.oneWay('pateintsData.body'),

  tagName: '',

init(){
  this._super(...arguments);

  var date = this.get('pateintsData').get('dateOfBirth');
  var dateString = date.toISOString().substring(0, 10);
  this.set('selectedDate', dateString);

  this.set('selectedGender', this.get('pateintsData').get('gender'));
  this.set('selectedCountry', this.get('pateintsData').get('country'));
},

  didRender() {
    this._super(...arguments);

    // let date = this.get('DOB');
    // this.set('selectedDate', date.toISOString().substring(0, 10));


    $(document).ready(function ($) {
      if ($('.floating-labels').length > 0) floatLabels();

      function floatLabels() {
        let inputFields = $('.floating-labels .cd-label').next();
        inputFields.each(function () {
          let singleInput = $(this);
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


  modalName: computed(function () {
    return 'editPatient' + this.get('pateintsData').id;
  }),



  actions: {
    assignDate (date){
      this.set('selectedDate', date);
    },
    selectGender (gender){
      this.set('selectedGender', gender);
    },
    selectCountry (country){
      this.set('selectedCountry', country);
    },

    submit(){
      this.get('DS').findRecord('patient', this.get('pateintsData').id).then((rec) =>{
        rec.set('familyName', this.get('pateintsData.familyName'));
        rec.set('givenName', this.get('pateintsData.givenName'));
        rec.set('email', this.get('pateintsData.email'));
        rec.set('streetName', this.get('pateintsData.streetName'));
        rec.set('streetNumber', this.get('pateintsData.streetNumber'));
        rec.set('apartment', this.get('pateintsData.apartment'));
        rec.set('country', this.get('selectedCountry'));
        rec.set('province', this.get('pateintsData.province'));
        rec.set('city', this.get('pateintsData.city'));
        rec.set('healthCardNumber', this.get('pateintsData.healthCardNumber'));
        rec.set('gender', this.get('selectedGender'));
        rec.set('dateOfBirth', new Date(this.get('selectedDate')));
        rec.set('phoneNumber', this.get('pateintsData.phoneNumber'));
        rec.set('postalCode', this.get('pateintsData.postalCode'));

        rec.save().then(()=>{
          return true;

        });
      });
    },

    openModal: function () {

      $('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        transition: 'horizontal flip',
        centered: false,
        dimmerSettings: { opacity: 0.25 },
        onDeny: () => {
          return true;
        },

      })
        .modal('show');
    }
  },

});


