import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),


  qNum:0,

  assessmentModel: Ember.computed(function(){
    return this.get('DS').find('assessment-test', this.get('id'));

  }),

  actions: {
    Submit(){
      // var x = this.get('DS').find('assessment-test', this.get('id'));
      // console.log(x.get('questions'));

    },
  },
});
