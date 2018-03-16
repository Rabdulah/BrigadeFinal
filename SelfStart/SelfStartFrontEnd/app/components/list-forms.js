import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function(){
        return 'list-form' + this.get('ID');
    }),

    formsModel: Ember.computed(function(){
        return this.get('DS').findAll('form');
    }),
    
    actions: {

        AddTest(thisForm, thisPlan){

            let newTest = this.get('DS').createRecord('assessment-test', {
              form: thisForm,
              questions: thisForm.get("questions"),
            //  rehabPlan: thisPlan,     
           });
            newTest.save().then(()=> {
                return true;
            });
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
    },
});
