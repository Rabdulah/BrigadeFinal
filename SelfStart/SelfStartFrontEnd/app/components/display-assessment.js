import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),

  qNum:0,

  assessmentModel: Ember.computed(function(){
    return this.get('DS').find('assessment-test', this.get('id'));
  }),

  actions: {
    Submit(){
      this.get('DS').findRecord('assessment-test', this.get("id")).then((rec)=>{
        rec.set("completed", true);
        rec.save();
      });
    },
  },
});
