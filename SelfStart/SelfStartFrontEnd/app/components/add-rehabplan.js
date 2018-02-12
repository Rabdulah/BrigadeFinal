import Component from '@ember/component';
export default Component.extend({
  DS: Ember.inject.service('store'),

  actions: {


    decreaseTime: function () {
      if (!this.get('ttc') == ""){
        var time = parseInt(this.get('ttc'));
        console.log(time);
        if (!time < 1)
          this.set('ttc', time-1);
      }
    },

    increaseTime: function () {
      if (!this.get('ttc') == "") {
        var time = parseInt(this.get('ttc'));
        this.set('ttc', time + 1);
      }
    },



    openModal: function () {
      this.set('Name', '');
      this.set('description', '');
      this.set('goal', '');
      this.set('ttc', '');
      this.set('exercises', '');
      this.set('assessmentTests', '');
      this.set('authorName', '');
      Ember.$('.ui.addRehab.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {

          let rehabplan = this.get('DS').createRecord('rehabilitationplan', {
            planName: this.get('Name'),
            physioID: this.get('authorName'),
            description: this.get('description'),
            goal: this.get('goal'),
            timeToComplete: this.get('ttc'),
            // exercises: self.get('exercises'),
            // assessmentTests: self.get('assessmentTests'),
          });


          rehabplan.save().then(()=> {
            return true;
          });
        }
      })
        .modal('show');
    },
  }
});





/*
import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  DS: inject('store'),

  actions: {
    openModal: function () {
      Ember.$('.ui.addRehab.modal').modal({
        closable: false,
        detachable: false,
        transition: 'horizontal flip',

        onDeny: () => {
          return true;
        },

        onApprove: () => {
          let self = this;
          var rehabplan = this.get('DS').createRecord('rehabilitationplan', {
            planName: self.get('Name'),
            physioID: self.get('authorName'),
            description: self.get('description'),
            goal: self.get('goal'),
            timeToComplete: self.get('ttc'),
            // exercises: self.get('exercises'),
            // assessmentTests: self.get('assessmentTests'),
          });
          rehabplan.save().then(()=>{
            return true;
          });
        }
      })
        .modal('show');
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
*/
