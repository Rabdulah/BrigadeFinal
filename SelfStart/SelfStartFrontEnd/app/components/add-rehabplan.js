import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  DS: inject('store'),

  isEditing: false,

  actions: {
    addRehabPlan (){
      this.set('isEditing', true);
    },

    cancel: function () {
      this.set('isEditing', false);
    },

    decreaseTime: function () {

    },

    increaseTime: function () {

    },

    submit: function () {

      let self = this;
      //connect to ro
      let rehabplan = this.get('DS').createRecord('rehabilitationplans', {
        name: self.get('Name'),
        authorName: self.get('authorName'),
        description: self.get('description'),
        goal: self.get('goal'),
        timeFrameToComplete: self.get('ttc'),
        // exercises: self.get('exercises'),
        // assessmentTests: self.get('assessmentTests'),
      });

      rehabplan.save().then(function() {
        this.set('isEditing', false);
      });
      this.set('Name', '');
      this.set('description', '');
      this.set('goal', '');
      this.set('ttc', '');
      this.set('exercises', '');
      this.set('assessmentTests', '');
      this.set('authorName', '');
    }
  },

});
