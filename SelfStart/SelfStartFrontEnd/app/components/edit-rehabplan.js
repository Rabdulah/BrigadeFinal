import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  selectedExercise: null,
  plansData: null,

  tagName: '',

  init(){
    this._super(...arguments);

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


  exerciseModel: computed(function(){
    return this.get('DS').findAll('exercise');
  }),

  modalName: computed(function () {
    return 'editPlan' + this.get('plansData').id;
  }),

  actions: {

    selectExercise (exercise){
      this.set('selectedExercise', exercise);
    },


    submit(){
      this.get('DS').findRecord('rehabilitationplan' , this.get('plansData').id).then((rec)=>{
        rec.set('planName', this.get('plansData.planName'));
        rec.set('description', this.get('plansData.description'));
        rec.set('goal', this.get('plansData.goal'));
        rec.set('timeToComplete', this.get('plansData.timeToComplete'));
        rec.set('exercises', this.get('selectedExercise'));
        // rec.set('physioID', "5aae0822aec70d36c8cc12be");
        // rec.set('assessmentTests', this.get('assessmentTests'));
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
