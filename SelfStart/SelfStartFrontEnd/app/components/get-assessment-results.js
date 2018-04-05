import Component from '@ember/component';

export default Component.extend({

  DS: Ember.inject.service('store'),
  ID: "5ac54ced216555175846b082",
  open:false,
  notOpen:true,
  linker: null,

  assessmentModel: Ember.computed(function(){
    var id = this.get("linker").get("assessmentTest").get("id");
    console.log(id);
    return this.get('DS').find('assessment-test', id);
  }),

  fName: "",

  init() {
    this._super(...arguments);
    var assessID = this.get("linker").get("assessmentTest").get("id");
    this.get('DS').findRecord('assessment-test', assessID).then((rec) => {
      this.set("fName", rec.get('formName'));
    });
  },

  actions:{
    Open(){
      this.set("open", true);
      this.set("notOpen",false);
    }
  }
});
