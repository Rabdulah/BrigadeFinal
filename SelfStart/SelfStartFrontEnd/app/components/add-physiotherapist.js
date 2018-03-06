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

      let physiotherapist = this.get('DS').createRecord('physiotherapest', {
        familyName: self.get('familyName'),
        givenName: self.get('givenName'),
        email: self.get('email'),
        dateHired: self.get('dateHired'),
        dateFired: self.get('dateFired'),
        treatment: self.get('treatment'),
        account: self.get('account'),

      });
      physiotherapist.save().then(() =>{
        this.get('routing').transitionTo('physiotherapists');
      });

      this.set('familyName', '');
      this.set('givenName', '');
      this.set('email', '');
      this.set('dateHired','');
      this.set('dateFired','');
      this.set('treatment','');
      this.set('account','')
    }
  },

});