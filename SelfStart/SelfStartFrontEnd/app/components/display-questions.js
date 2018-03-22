import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    questionNumber: 54,


    formModel: Ember.computed(function(){
        return this.get('DS').find('form', this.get('id'));
    }),
});