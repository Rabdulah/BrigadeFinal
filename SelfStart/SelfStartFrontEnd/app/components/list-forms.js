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
      let temp = [];
      let questionList = [];

      this.get('DS').query('question-order', {filter: {'form': thisForm.get('id')}}).then((questions) => {

        // this.get('questionList').clear();
        console.log(questions);
        console.log("****************");
        questions.forEach((q)=>{
          console.log(q.get('question'));
          temp.push("!!");
          questionList.pushObject(q.get('question'));
        });
        console.log("****************");

      });

      // thisForm.get("questionOrder").forEach(element => {
      //   temp.push("!!!!");
      //   questionList.pushObject(element.get("question"));
      // });
      console.log(temp);
      console.log(questionList);
      console.log("****************");
      let newTest = this.get('DS').createRecord('assessment-test', {
        form: thisForm,
        questions: questionList,
        answers: temp,
        completed: false,
        formName: thisForm.get('name')
      });
      newTest.save().then(()=> {
        this.set("assessID", newTest.get('id'));
        console.log(newTest.get('questions')[0]);
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
