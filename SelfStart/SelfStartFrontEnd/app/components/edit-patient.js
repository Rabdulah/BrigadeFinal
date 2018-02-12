import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),
  pateintsData: null,


  tagName: '',




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

  modalName: computed(function () {
    return 'editPatient' + this.get('ID');
  }),



  actions: {

    assignDate (date){
      this.set('selectedDate', date);
    },

    save: function () {
      this.get('DS').findRecord('patient', this.get('pateintsData').id).then((rec) =>{
        rec.set('familyName', this.get('pateintsData.familyName'));
        rec.set('givenName', this.get('pateintsData.givenName'));
        rec.set('email', this.get('pateintsData.email'));
        rec.set('streetName', this.get('pateintsData.streetName'));
        rec.set('streetNumber', this.get('pateintsData.streetNumber'));
        rec.set('apartment', this.get('pateintsData.apartment'));
        rec.set('country', this.get('country'));
        rec.set('provinces', this.get('provinces'));
        rec.set('cities', this.get('cities'));
        rec.set('healthCardNumber', this.get('pateintsData.healthCardNumber'));
        rec.set('gender', this.get('gender'));
        rec.set('maritalStatus', this.get('maritalStatus'));
        rec.set('dateOfBirth', this.get('selectedDate'));
        rec.set('occupation', this.get('pateintsData.occupation'));
        rec.set('phoneNumber', this.get('pateintsData.phoneNumber'));
        rec.set('postalCode', this.get('pateintsData.postalCode'));

        rec.save().then(()=>{
          this.get('routing').transitionTo('patients');

        });
      });
    }
  }
});


