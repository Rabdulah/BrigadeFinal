import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),

    formModel: Ember.computed(function(){
        return this.get('DS').find('form', this.get('id'));
    }),

    actions:{
    
    }

});