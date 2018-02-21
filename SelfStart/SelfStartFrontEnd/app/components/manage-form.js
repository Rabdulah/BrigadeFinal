import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  init: function() {
    this._super();
    //let a = this.get('DS').find('form', this.get('ID'));
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
    let form = this.get('DS').peekRecord('form',this.get('ID'));
    this.get('DS').findRecord('question', question.get('id')).then((rec) => {
      rec.set('form', form)
      rec.save().then(()=>{
        return true;
      });
    });

    console.log(form);
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
