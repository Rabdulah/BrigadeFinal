import Component from '@ember/component';

Ember.Handlebars.registerHelper('isMC', function (value, options) {
    if (value == "Multiple Choice") {
        return options.fn(this);
    }
    return options.inverse(this);
});

export default Component.extend({
    DS: Ember.inject.service('store'),

    formModel: Ember.computed(function(){
        return this.get('DS').find('form', this.get('id'));
    }),

    checkType:function(){
      return this.get('q');      
    },

    mc:false,
    sa:false,
    rating:false,
    tf:false,
    touch:false,

    actions:{
    
    }

});