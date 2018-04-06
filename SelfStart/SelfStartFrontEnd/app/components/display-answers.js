import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  init() {
    this._super(...arguments);
    var self =this;
    var a = [];

    this.get('DS').query('answer', {filter: {'test': this.get('assessid')}}).then((ans) => {
      ans.forEach((rec)=>{
        a.pushObject(rec.get('answer'));
      })
      

      if(this.get('question').get('type') === "Short answer"){
        this.set("SAanswer", a[this.get('qNumber')]);
      }
      if(this.get('question').get('type') === "Rating"){
        this.set("Rating", a[this.get('qNumber')]);
      }
      if(this.get('question').get('type') === "True/False"){
        if(a[this.get('qNumber')] === "Yes"){
          this.set("checkTrue", true);
        }
        else{
          this.set("checkFalse", true);
        }
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

    
    
        if(a[this.get('qNumber')] === "0"){
          this.set("checkmcop1", true);
        }
        else if(a[this.get('qNumber')] === "1"){
          this.set("checkmcop2", true);
        }
        else if(a[this.get('qNumber')] === "2"){
          this.set("checkmcop3", true);
        }
        else if(a[this.get('qNumber')] === "3"){
          this.set("checkmcop4", true);
        }
        else if(a[this.get('qNumber')] === "4"){
          this.set("checkmcop5", true);
        }
        else{
          this.set("checkmcop6", true);
        }
      }
    //});

    });
  },
    // let question =  this.get('DS').findRecord('question', this.get('question').id).then((rec)=>{
      


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

  actions: {
    tf(){
      console.log("f");
    }
  },

});
