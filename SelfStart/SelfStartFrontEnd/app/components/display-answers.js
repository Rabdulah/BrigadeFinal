import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
init() {
    this._super(...arguments);

    let question =  this.get('DS').findRecord('question', this.get('qID')).then((rec)=>{
        if(rec.get('type') === "Short answer"){
            this.set("SAanswer", this.get('assessment').get('answers')[this.get('qNumber')]);
        }
        if(rec.get('type') === "Rating"){
            this.set("Rating", this.get('assessment').get('answers')[this.get('qNumber')]);
        }
        if(rec.get('type') === "True/False"){
          if(this.get('assessment').get('answers')[this.get('qNumber')] === "True"){
               this.set("checkTrue", true);
          }
          else{
            this.set("checkFalse", true);
          }
        }
        if(rec.get('type') === "Multiple choice"){
            let breakdown = rec.get("optionString").split('+++');
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
            

            if(this.get('assessment').get('answers')[this.get('qNumber')] === "0"){
                 this.set("checkmcop1", true);
            }
            else if(this.get('assessment').get('answers')[this.get('qNumber')] === "1"){
                this.set("checkmcop2", true);
            }
            else if(this.get('assessment').get('answers')[this.get('qNumber')] === "2"){
                this.set("checkmcop3", true);
            }
            else if(this.get('assessment').get('answers')[this.get('qNumber')] === "3"){
                this.set("checkmcop4", true);
            }
            else if(this.get('assessment').get('answers')[this.get('qNumber')] === "4"){
                this.set("checkmcop5", true);
            }
            else{
                this.set("checkmcop6", true);
            }
          }
    });
},


DS: inject('store'),
tf: true,
SAanswer: "true",
Rating: 4,
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
