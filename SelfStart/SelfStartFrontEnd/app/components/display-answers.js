import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  init() {
    this._super(...arguments);
    var self =this;

    if(this.get('question').get('type') === "Short answer"){
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          this.set("SAanswer", rec.get("answer"));
        }
      });
    }
    if(this.get('question').get('type') === "Rating"){
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          this.set("Rating", rec.get("answer"));
        }
      });
    }
    if(this.get('question').get('type') === "True/False"){
      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          if(rec.get("answer") == "No")
            checkFalse = true;
          else
            checkTrue = true;
        }
      });
    }
    if(this.get('question').get('type') === "Multiple choice"){
      let breakdown = this.get('question').get("optionString").split('+++');
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

      this.get("answers").forEach((rec) =>{
        if(rec.get("question") === this.get("question").get("questionText")){
          if(rec.get("answer") == "0")
            this.set("checkmcop1", true);
          if(rec.get("answer") == "1")
            this.set("checkmcop2", true);
          if(rec.get("answer") == "2")
            this.set("checkmcop3", true);
          if(rec.get("answer") == "3")
            this.set("checkmcop4", true);
          if(rec.get("answer") == "4")
            this.set("checkmcop5", true);
          if(rec.get("answer") == "5")
            this.set("checkmcop6", true);
        }
      });

    }
  },

  DS: inject('store'),
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
});
