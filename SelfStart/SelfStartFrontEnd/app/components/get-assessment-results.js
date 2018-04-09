import Component from '@ember/component';

export default Component.extend({

  DS: Ember.inject.service('store'),
  ID: "5acbb1e984bdf02a643bd758",
  open:false,
  notOpen:true,
  linker: null,
  form: null,
  orders:[],
  ans:[],
  assessmentModel: Ember.computed(function(){
    var id = "5acbb1e984bdf02a643bd758";
    console.log(id);
    return this.get('DS').find('assessment-test', id);
  }),

  init() {
    this._super(...arguments);
    var self = this;


    this.get('DS').query('question-order', {filter: {'form': "5acbb1bb84bdf02a643bd751"}}).then((records) => {
      self.set('orders', records.toArray());
    });
    this.get('DS').query('answer', {filter: {'test':"5acbb1e984bdf02a643bd758"}}).then((records) => {
      self.set('ans', records.toArray());
      console.log("********");
      console.log(this.get("ans"));
      console.log("********");
    });
    console.log(this.get('assessid'));
    //this.set('form', '5ac1ae2773e03d3f78384c92');
  },

  actions:{
    Open(){
      this.set("open", true);
      this.set("notOpen",false);
    }
  }
});
