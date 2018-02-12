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
      //connect to rehabilitationplans
      let rehabplan = this.get('DS').createRecord('rehabilitationplan', {
        planName: self.get('Name'),
        physioID: self.get('authorName'),
        description: self.get('description'),
        goal: self.get('goal'),
        timeToComplete: self.get('ttc'),
        // exercises: self.get('exercises'),
        // assessmentTests: self.get('assessmentTests'),
      });
      //when save is successfull close form
      rehabplan.save().then(function() {
        this.set('isEditing', false);
      });
      //CHANGE THIS WHEN ITS DONE
      this.set('isEditing', false);
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
