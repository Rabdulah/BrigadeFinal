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
  assessment: null,

  init(){
    this._super(...arguments);
    //console.get(this.get("assessment"));
    this.get('DS').findRecord('question',this.get("qID")).then((temp)=>{
      this.set('question', temp);
    });
  },

  actions: {
    ratingSave(rv) {
      this.set('rateValue', rv);
      console.log(this.get("assessment"));
      this.get("answers").forEach((rec) =>{
        if(rec.get('question') === this.get("question").get("questionText")){
          console.log("inside rating");
            rec.set('answer', this.get("rateValue"));
            rec.set('test', this.get("assessment"));
            rec.save();

        }
      });
    },

    TFtrue() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
            rec.set("answer","YES");
            rec.set("test",this.get("assessment"));
            rec.save();

        }
      });
    },

    TFfalse() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
            rec.set("answer","NO");
            rec.set("test",this.get("assessment"));
            rec.save();
        }
      });
      },

    saSave() {

      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
            rec.set("answer",this.get("SAanswer"));
            rec.set("test",this.get("assessment"));
            rec.save();
        }
      });
    },

    mcop1Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
            rec.set("answer","1");
            rec.set("test",this.get("assessment"));
            rec.save();
        }
      });
    },

    mcop2Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
            rec.set("answer","2");
            rec.set("test",this.get("assessment"));
            rec.save();
        }
      });
    },

    mcop3Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
            rec.set("answer","3");
            rec.set("test",this.get("assessment"));
            rec.save();
        }
      });
    },

    mcop4Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
            rec.set("answer","4");
            rec.set("test",this.get("assessment"));
            rec.save();
        }
      });
    },

    mcop5Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
            rec.set("answer","5");
            rec.set("test",this.get("assessment"));
            rec.save();
        }
      });
    },

    mcop6Save() {
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
            rec.set("answer","6");
            rec.set("test",this.get("assessment"));
            rec.save();
        }
      });
    },
  },

});
