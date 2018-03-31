import Component from '@ember/component';

export default Component.extend({

    DS: Ember.inject.service('store'),
    ID: "5abebc7102c70211947971e0",

    assessmentModel: Ember.computed(function(){
        return this.get('DS').find('assessment-test', this.get('ID'));
    }),

});
