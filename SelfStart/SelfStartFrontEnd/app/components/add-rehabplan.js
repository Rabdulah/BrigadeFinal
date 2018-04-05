import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  tagName: '',
  flagAdd: null,

  init(){
    this._super(...arguments);

    this.set('isEditing', false);
    this.set('Name', '');
    this.set('description', '');
    this.set('goal', '');
    this.set('timeToComplete', '');
    this.set('exercises', '');
    this.set('assessmentTests', '');
    this.set('authorName', '');

  },

  didRender() {
    this._super(...arguments);

    $(document).ready(function ($) {
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

    });
  },

  exerciseModel: computed(function(){
    return this.get('DS').findAll('exercise');
  }),



  actions: {

    selectExercise (exercise){
      this.set('selectedExercise', exercise);
    },

    submit(){
      let self = this;
      //connect to rehabilitationplans

      this.get('DS').findRecord('physiotherapest', "5aae0822aec70d36c8cc12be").then(function (phys) {
        let rehabplan = self.get('DS').createRecord('rehabilitationplan', {
          planName: self.get('Name'),
          physioID: phys,
          description: self.get('description'),
          goal: self.get('goal'),
          //exercises: self.get('exercises'),
          // assessmentTests: self.get('assessmentTests'),
        });
        //when save is successfull close form
        rehabplan.save().then(function() {
          $('.ui.newPlan.modal').modal('hide');
          if (self.get('flagAdd')=== true)
            self.set('flagAdd', false);
          else
            self.set('flagAdd', true);
          return true;
        });
      });

    },

    openModal: function ()  {
      $('.ui.newPlan.modal').modal({
        closable: false,

        onDeny: () => {
          return true;
        },

      }).modal('show')
    },
  }
});
