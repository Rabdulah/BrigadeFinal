import Component from '@ember/component';

export default Component.extend({

  DS: Ember.inject.service('store'),
  ID: "5ac6b3c8be4a9233e02c9b23",
  open:false,
  notOpen:true,
  linker: null,
  form: null,
  orders:[],
  ans:[],
  assessmentModel: Ember.computed(function(){
    var id = "5ac6b3c8be4a9233e02c9b23";
    console.log(id);
    return this.get('DS').find('assessment-test', id);
  }),

  init() {
    this._super(...arguments);
    var self = this;
    this.get('DS').query('question-order', {filter: {'form': "5ac1ae2773e03d3f78384c92"}}).then((records) => {
      self.set('orders', records.toArray());
    });
    this.get('DS').query('answer', {filter: {'test': this.get('assessid')}}).then((records) => {
      self.set('ans', records.toArray());
    });
    console.log(this.get("a"));
    this.set('form', '5ac1ae2773e03d3f78384c92');
  },

  actions:{
    Open(){
      this.set("open", true);
      this.set("notOpen",false);
    }
  }
});
