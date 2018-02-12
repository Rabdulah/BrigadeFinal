import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  init: function() {
    this._super();
    let a = this.get('DS').find('form', this.get('ID'));
    //console.log(a.get('name'));
 },

  DS: Ember.inject.service('store'),


  modalName: Ember.computed(function(){
  return 'Manage-form' + this.get('ID');
}),

//x: a,
edit: false,

questionsModel: Ember.computed(function(){
  return this.get('DS').findAll('question');
}),

actions: {

  addQuestion(question){
    var q = [this.get('DS').findRecord('question', question.get('id'))];

    console.log(question.get('id'));
    this.get('DS').findRecord('form', this.get('ID')).then((rec) => {
      rec.set('questions', q),
      rec.
      rec.save().then(()=>{
        return true;
      });
    });
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
        this.get('DS').find('form', this.get('ID')).then((form) => {
          form.destroyRecord().then(() => {
            return true;
          });
        })
      }
    })
      .modal('show');
  },
}
});
