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

    AddTest(thisForm, thisPaitent){

       let newTest = this.get('DS').createRecord('assessment-test', {
        name: thisForm.get("name"),
        description: thisForm.get("description"),
        form: thisForm,
        patient: thisPaitent,

       });
       newTest.save().then(()=> {
         this.set("assessID", newTest.get("id"));
         this.get('DS').query('question-order', {filter: {'form': thisForm.get("id")}}).then((rec)=>{

          rec.forEach((r)=>{

              let answer = this.get('DS').createRecord('answer', {
                question: "testnew",
                answer: "",
                test: newTest
              });
              answer.save();
          })
        })

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
          console.log(test);//GOOD
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
