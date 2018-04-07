import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({

  DS: inject('store'),
  SAanswer:"",
  rateValue: 0,
  mcop1: 0,
  mcop2: 0,
  mcop3: 0,
  mcop4: 0,
  mcop5: 0,
  mcop6: 0,
  a: [],
  init(){
    this._super(...arguments);
    //console.get(this.get("assessment"));
    //console.log(this.get("answers"));
  },

  actions: {
    ratingSave(rv) {
      this.set('rateValue', rv);

      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          let answerModel = this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer",this.get("rateValue"));
          });
          answerModel.save();
        }
      });
    },

    TFtrue() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          let answerModel = this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer","Yes");
          });
          answerModel.save();
        }
      });
    },

    TFfalse() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          let answerModel = this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer","No");
          });
          answerModel.save();
        }
      });
    },

    saSave() {

      this.get("answers").forEach((rec) =>{
        if(rec.get("id") === "5ac6cf0e5c8d7e2cf47f0643"){
          console.log("in");
          this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer",this.get("SAanswer"));
            rec.save();
          });

        }
      });

    },

    mcop1Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          let answerModel = this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer","0");
          });
          answerModel.save();
        }
      });
    },

    mcop2Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          let answerModel = this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer","1");
          });
          answerModel.save();
        }
      });
    },

    mcop3Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          let answerModel = this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer","2");
          });
          answerModel.save();
        }
      });
    },

    mcop4Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          let answerModel = this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer","3");
          });
          answerModel.save();
        }
      });
    },

    mcop5Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          let answerModel = this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer","4");
          });
          answerModel.save();
        }
      });
    },

    mcop6Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          let answerModel = this.get('DS').findRecord('answer', rec.get("id")).then((ans) => {
            rec.set("answer","5");
          });
          answerModel.save();
        }
      });
    },
  },

});
