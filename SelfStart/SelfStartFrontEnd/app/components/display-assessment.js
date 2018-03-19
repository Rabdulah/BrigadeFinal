import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    DS: inject('store'),

    qNum:0,

    assessmentModel: Ember.computed(function(){
        console.log(this.assessID)
        return this.get('DS').find('assessment-test', this.assessID);
    }),

    actions: {
        Submit(){
            
           var x = this.get('DS').find('assessment-test', this.get('assessid'));
            console.log(x.get('questions'));
        },
    },
});
