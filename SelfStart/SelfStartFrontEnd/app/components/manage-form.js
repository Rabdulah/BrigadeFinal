import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({

  DS: Ember.inject.service('store'),


  modalName: Ember.computed(function(){
  return 'Manage-form' + this.get('ID');
}),

edit: false,

questionsModel: Ember.computed(function(){
  return this.get('DS').findAll('question');
}),

actions: {

  addQuestion(thisQuestion, thisForm){
    thisForm.get('questions').pushObject(thisQuestion);
    thisQuestion.get('forms').pushObject(thisForm);
  },
  manageForm() {
    this.set('edit',true);
  },
  done(){
    this.set('edit',false);
  },

  openModal: function () {
    Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
      closeable: false,
      detachable: false,
      onDeny: () => {
        return true;
      },
      onApprove: () => {
        return true;
      }
    })
    .modal('show');
  },
}
});
