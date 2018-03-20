import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  selectedGender: null,
  selectedHiredDate: null,
  selectedFiredDate: null,
  physiosData: null,

  tagName: '',

  init(){
    this._super(...arguments);


  },

  didRender() {
    this._super(...arguments);

    var dateHired = this.get('physiosData').get('dateHired');
    var dateFired = this.get('physiosData').get('dateFired');

    if (dateHired !== undefined){
      var dateHiredString = dateHired.toISOString().substring(0, 10);
      this.set('selectedHiredDate', dateHiredString);
    }
    else if (dateFired !== undefined){
      var dateFiredString = dateFired.toISOString().substring(0, 10);
      this.set('selectedFiredDate', dateFiredString);
    }
    this.set('selectedGender', this.get('physiosData').get('gender'));
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

  genderModel: computed(function(){
    return this.get('DS').findAll('gender');
  }),

  modalName: computed(function () {
    return 'editPhysio' + this.get('physiosData').id;
  }),


  actions: {
    assignHiredDate (date){
      this.set('selectedHiredDate', date);
    },
    assignFiredDate (date){
      this.set('selectedFiredDate', date);
    },
    selectGender (gender){
      this.set('selectedGender', gender);
    },

    submit(){
      this.get('DS').findRecord('physiotherapest', this.get('physiosData').id).then((rec) =>{
        rec.set('familyName', this.get('physiosData.familyName'));
        rec.set('givenName', this.get('physiosData.givenName'));
        rec.set('email', this.get('physiosData.email'));
        rec.set('gender', this.get('selectedGender'));
        rec.set('dateHired', new Date(this.get('selectedHiredDate')));
        rec.set('dateFired', new Date(this.get('selectedFiredDate')));
        rec.set('phoneNumber', this.get('physiosData.phoneNumber'));

        rec.save().then(()=>{
          $('.ui.' + this.get('modalName') + '.modal').modal('hide');
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


