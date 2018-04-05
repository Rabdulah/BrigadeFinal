import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import moment from 'moment';
import $ from 'jquery';

export default Component.extend({

  DS: inject('store'),
  routing: inject('-routing'),
  onProfile: true,
  onAccount: false,
  onHistory: false,
  onAppointment: false,
  onProfileColor: "white",
  onAccountColor: "#747474",
  onHistoryColor: "#747474",
  onAppointmentColor: "#747474",
  OPC:Ember.computed('onProfileColor', function() {
    var color = (this.get('onProfileColor'));
    return new Ember.String.htmlSafe("color: " + color);
  }),
  OAC:Ember.computed('onAccountColor', function() {
    var color = (this.get('onAccountColor'));
    return new Ember.String.htmlSafe("color: " + color);
  }),
  OHC:Ember.computed('onHistoryColor', function() {
    var color = (this.get('onHistoryColor'));
    return new Ember.String.htmlSafe("color: " + color);
  }),
  OAPC:Ember.computed('onAppointmentColor', function() {
    var color = (this.get('onAppointmentColor'));
    return new Ember.String.htmlSafe("color: " + color);
  }),

  modelAttributes:
    [{'key': 'givenName', 'name':'First Name', 'dir' : 'asc', 'class' :'left aligned two wide column'},
      {'key': 'familyName', 'name':'Last Name', 'dir' : '','class' :'left aligned two wide column'},
      {'key': 'dateOfBirth', 'name':'Date of Birth', 'dir' : '','class' :'left aligned five wide column'},
      // {'key': 'address', 'name':'Address'},
      {'key': 'email', 'name':'Email', 'dir' : '','class' :'left aligned four wide column'}],
  // {'key': 'phoneNumber', 'name':'Phone Number'}],



  pateintsData : null,
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
  init(){
    this._super(...arguments);
    let self = this;
    this.set('pateintsData', this.get('DS').findRecord('patient', '5ac534f93d763c33cc978c39')).then( function () {
      var dateString = moment(self.get('pateintsData').get('dateOfBirth'),'DD-MM-YYYY').toISOString().substring(0, 10);
      // var dateString = date.toISOString().substring(0, 10);
      self.set('selectedDate', dateString);
    });

  },
  conutryModel: computed(function(){
    return this.get('DS').findAll('country');
  }),

  genderModel: computed(function(){
    return this.get('DS').findAll('gender');
  }),
  actions:{
    assignDate (date){
      this.set('selectedDate', date);
    },
    selectGender (gender){
      this.set('selectedGender', gender);
    },
    selectCountry (country){
      this.set('selectedCountry', country);
    },
    ProfileClick(){
      this.set('onProfile', true);
      this.set('onAccount', false);
      this.set('onHistory', false);
      this.set('onAppointment', false);
      this.set('onAppointmentColor', '#747474');
      this.set('onProfileColor', 'white');
      this.set('onAccountColor',  '#747474');
      this.set('onHistoryColor', '#747474');
    },
    settingsClick(){
      this.set('onProfile', false);
      this.set('onAccount', true);
      this.set('onHistory', false);
      this.set('onAppointment', false);
      this.set('onAppointmentColor', '#747474');
      this.set('onProfileColor', '#747474');
      this.set('onAccountColor',  'white');
      this.set('onHistoryColor', '#747474');
    },
    historyClick(){
      this.set('onProfile', false);
      this.set('onAccount', false);
      this.set('onHistory', true);
      this.set('onAppointment', false);
      this.set('onAppointmentColor', '#747474');
      this.set('onProfileColor', '#747474');
      this.set('onAccountColor',  '#747474');
      this.set('onHistoryColor', 'white');
    },
    appointmentClick(){
      this.set('onProfile', false);
      this.set('onAccount', false);
      this.set('onHistory', false);
      this.set('onAppointment', true);
      this.set('onAppointmentColor', 'white');
      this.set('onProfileColor', '#747474');
      this.set('onAccountColor',  '#747474');
      this.set('onHistoryColor', '#747474');
    },
    saveChange(){
      this.get('DS').findRecord('patient', '5ac534f93d763c33cc978c39').then((rec) => {

        rec.set('familyName', this.get('pateintsData.familyName'));
        rec.set('givenName', this.get('pateintsData.givenName'));
        rec.set('email', this.get('pateintsData.email'));
        rec.set('streetName', this.get('pateintsData.streetName'));
        rec.set('streetNumber', this.get('pateintsData.streetNumber'));
        rec.set('apartment', this.get('pateintsData.apartment'));
        rec.set('country', this.get('selectedCountry'));
        rec.set('province', this.get('pateintsData.province'));
        rec.set('city', this.get('pateintsData.city'));
        rec.set('gender', this.get('selectedGender'));
        rec.set('dateOfBirth', new Date(this.get('selectedDate')));
        rec.set('phoneNumber', this.get('pateintsData.phoneNumber'));
        rec.set('postalCode', this.get('pateintsData.postalCode'));

        rec.save().then(() => {
          alert("Saved");
        });
      });
    },

    savePassword(){
      let old =(this.get('oldPassword'));
      let newp = (this.get('newPassword'));
      let confp= (this.get('confirmPassword'));
      let self = this;


      if (newp !== confp){
        console.log('adsf');
      }

    },
  },
});
