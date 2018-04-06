import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import Ember from "ember";
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  qNumber: 0,
  tf: true,
  SAanswer: "",
  Rating: 1,
  true:"",
  checkTrue:false,
  checkFalse:false,
  checkmcop1: false,
  checkmcop2: false,
  checkmcop3: false,
  checkmcop4: false,
  checkmcop5: false,
  checkmcop6: false,
  mcop1: "",
  mcop2: "",
  mcop3: "",
  mcop4: "",
  mcop5: "",
  mcop6: "",
 index: 0,
  onChange: 1,

  activeModel:Ember.observer('onChange', function () {
    console.log('im here!');
    // let question =  this.get('DS').findRecord('question', this.get('question').id).then((rec)=>{
      if(this.get('orders')[this.get("onChange")].get('question').get('type') === "Short answer"){
        this.set("SAanswer", this.get('assessment').get('answer')[this.get('onChange')].get('answer'));
      }
      if(this.get('orders')[this.get("onChange")].get('question').get('type') === "Rating"){
        this.set("Rating", this.get('assessment').get('answer')[this.get('onChange')].get('answer'));
      }
      if(this.get('orders')[this.get("onChange")].get('question').get('type') === "True/False"){
        if(this.get('assessment').get('answer')[this.get('onChange').get('answer')] === "True"){
          this.set("checkTrue", true);
        }
        else{
          this.set("checkFalse", true);
        }
      }
      if(this.get('orders')[this.get("onChange")].get('question').get('type') === "Multiple choice"){
        let breakdown = this.get('orders')[this.get("onChange")].get('question').get("optionString").split('+++');
        let length = breakdown.length;
        this.set("mcop1", breakdown[0]);
        this.set("mcop2", breakdown[1]);
        if(length > 2){
          this.set("mcop3", breakdown[2]);
        }
        if(length > 3){
          this.set("mcop4", breakdown[3]);
        }
        if(length > 4){
          this.set("mcop5", breakdown[4]);
        }
        if(length > 5){
          this.set("mcop6", breakdown[5]);
        }
    
    
        if(this.get('assessment').get('answer')[this.get('onChange').get('answer')] === "0"){
          this.set("checkmcop1", true);
        }
        else if(this.get('assessment').get('answer')[this.get('onChange').get('answer')] === "1"){
          this.set("checkmcop2", true);
        }
        else if(this.get('assessment').get('answer')[this.get('onChange').get('answer')] === "2"){
          this.set("checkmcop3", true);
        }
        else if(this.get('assessment').get('answer')[this.get('onChange').get('answer')] === "3"){
          this.set("checkmcop4", true);
        }
        else if(this.get('assessment').get('answer')[this.get('onChange').get('answer')] === "4"){
          this.set("checkmcop5", true);
        }
        else{
          this.set("checkmcop6", true);
        }
      }
      if(this.get("onChange") < this.get("model").get("questionOrder").length)
        this.set("onChange", this.get("onChange") + 1);
    //});
  }),

  modalName: computed(function () {
    return 'viewAnswers' + this.get('model').id;
  }),


  orders:[],

   questionModel: computed(function () {

   }),

  init(){
    this._super(...arguments);
    this.get('DS').findAll('form');
    this.get('DS').findAll('question-order');
    this.get('DS').findAll('question');
    var self = this;

    this.get('DS').query('question-order', {filter: {'form': this.get('model').id}}).then((records) => {
      self.set('orders', records.toArray());
     
    });
    
    this.set('onChange', 0);
  },

  actions: {
    openModal: function () {

      $('.ui.' + this.get('modalName') + '.modal').modal({
        // transition: 'horizontal flip',

        // dimmerSettings: { opacity: 0.25 },


        onDeny: () => {
          return true;
        },
      })
        .modal('show');
    },

    // Submit(){
    //   this.get('DS').findRecord('assessment-test', this.get("id")).then((rec)=>{
    //     rec.set("completed", true);
    //     rec.save();
    //   });
    // },
  },
});
