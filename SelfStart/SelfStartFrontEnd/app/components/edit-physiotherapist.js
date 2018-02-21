import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  routing: inject('-routing'),
  physiotherapistData: null,

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

  modalName: computed(function () {
    return 'edit-physiotherapist' + this.get('ID');
  }),

  actions: {
    openModal: function () {
      $('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        detachable: false,
        transition: 'fly down',

        onDeny: () => {
          return true;
        },
        onApprove: () => {

          this.get('DS').find('physiotherapest', this.get('ID')).then((physiotherapest) => {
    
              physiotherapest.destroyRecord();
          
          });

        }
      })
        .modal('show');
    },

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
      this.get('DS').findRecord('physiotherapest',this.get('physiotherapistData').id).then((rec)=>{
        rec.set('familyName', this.get('physiotherapistData.familyName'));
        rec.set('givenName', this.get('physiotherapistData.givenName'));
        rec.set('email', this.get('physiotherapistData.email'));
        rec.set('dateHired', this.get('physiotherapistData.dateHired'));
        rec.set('datefired', this.get('physiotherapistData.dateFired'));
        rec.set('treatment', this.get('physiotherapistData.treatment'));
        rec.set('account', this.get('physiotherapistData.account'));
      })

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

        rec.save().then(()=>{
          this.get('routing').transitionTo('physiotherapists');
      });
    }
  },

});