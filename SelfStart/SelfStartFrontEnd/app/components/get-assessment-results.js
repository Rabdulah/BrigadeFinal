import Component from '@ember/component';

export default Component.extend({

    DS: Ember.inject.service('store'),
    ID: "5abfeb9cda17a420b84b2591",

    assessmentModel: Ember.computed(function(){
        return this.get('DS').find('assessment-test', this.get('ID'));
    }),

});
