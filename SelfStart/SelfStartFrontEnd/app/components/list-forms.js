import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  DS: Ember.inject.service('store'),
  assessID: "",
  modalName: Ember.computed(function(){
    return 'list-form' + this.get('ID');
  }),

  formsModel: Ember.computed(function(){
    return this.get('DS').findAll('form');
  }),

  actions: {

    AddTest(thisForm, thisPlan){
      console.log(thisForm);
      let temp = [];
      let questionList = [];
      thisForm.get("questionOrder").forEach(element => {
        temp.push("!!!!");
        questionList.pushObject(element.get("question"));
      });

      let newTest = this.get('DS').createRecord('assessment-test', {
        form: thisForm,
        questions: questionList,
        rehabPlan: thisPlan,
        answers: temp,
        completed: false,
      });
      newTest.save().then(()=> {
        this.set("assessID", newTest.get('id'));
        return true;
      });
    },
      
    openModal: function () {
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closeable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          var rehab = this.get('DS').peekRecord('rehabilitationplan', this.get('rehabPlan'));
          var test = this.get('DS').peekRecord('assessment-test', this.get('assessID'));

          console.log(rehab);
          console.log(test);

          let link = this.get('DS').createRecord('rehab-client-link', {
            terminated: this.get('rehabPlan.terminated'),
            RehabilitationPlan: rehab,
            Patient: this.get('patient'),
            assigned: true,
            assessmentTest: test
            //In memory of Ouda
          });

            link.save().then(()=> {
            
          });
          return true;
        }
      })
        .modal('show');
    },
  },
});
