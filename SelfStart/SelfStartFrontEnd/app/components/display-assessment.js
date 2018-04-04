import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),

  qNum:0,

  assessmentModel: Ember.computed(function(){
    return this.get('DS').find('assessment-test', this.get('id'));
  }),

  actions: {
    Submit(){
      var assess = this.get("assessmentModel");
      // this.get('DS').findRecord('assessment-test', this.assessid).then((rec) => {
      //   rec.save().then(()=>{
      //   });
      // });
    },
  },
});
