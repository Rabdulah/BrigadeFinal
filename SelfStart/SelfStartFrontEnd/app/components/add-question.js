import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    DS: inject('store'),

    isEditing: false,
    shortAns: false,
    multipleChoice:false,
    trueFalse:false,
    option2:false,
    option3:false,
    option4:false,
    option5:false,
    option6:false,
    optionNumber:1,
    removable: false,
    addable:true,
  
    actions: {

      multipleChoice (){
        this.set('multipleChoice', true);
        this.set('shortAns', false);
        this.set('trueFalse', false);
      },

      addOption(){
        if(this.option2 == false){
          this.set('option2', true);
          this.set('removable', true);
          this.optionNumber++;
          return;
        }
        if(this.option3 == false){
          this.set('option3', true);
          this.optionNumber++;
          return;
        }     
        if(this.option4 == false){
          this.set('option4', true);
          this.optionNumber++;
          return;
        }
        if(this.option5 == false){
          this.set('option5', true);
          this.optionNumber++;
          return;
        }
        if(this.option6 == false){
          this.set('option6', true);
          this.set('addable', false);
          this.optionNumber++;
          return;
        }
      },

      removeOption(){
        if(this.option6 == true){
          this.set('option6', false);
          this.set('addable', true);
          this.optionNumber--;
          return;
        }
        if(this.option5 == true){
          this.set('option5', false);
          this.optionNumber--;
          return;
        }     
        if(this.option4 == true){
          this.set('option4', false);
          this.optionNumber--;
          return;
        }
        if(this.option3 == true){
          this.set('option3', false);
          this.optionNumber--;
          return;
        }  
        if(this.option2 == true){
          this.set('option2', false);
          this.set('removable', false);
          this.optionNumber--;
          return;
        }  
      },

      shortAns (){
        this.set('shortAns', true);
        this.set('multipleChoice', false);
        this.set('trueFalse', false);
      },

      trueFalse (){
        this.set('trueFalse', true);
        this.set('shortAns', false);
        this.set('multipleChoice', false);
      },

      addQuestion (){
        this.set('isEditing', true);
      },
  
      cancel: function () {
        this.set('isEditing', false);
      },
  
      submit: function () {
  
        var question, help, qtype;

        let self = this;

        if(this.shortAns){
            help = self.get('sahelp');
            question = self.get('saquestion');
            qtype = "sa";
        }
        if(this.multipleChoice){
            help = self.get('mchelp');
            question = self.get('mcquestion');
            qtype = "mc";

            for(var i = 1; i <= this.optionNumber; i++){
              question += "+++";
              question += self.get('mcop' + i);
            }
        }
        if(this.trueFalse){
          help = self.get('tfhelp');
          question = self.get('tfquestion');
          qtype = "tf";
        }

        let newQuestion = this.get('DS').createRecord('question', {
         
            helpDescription: help,
            questionText: question,
            type: qtype
        });
  
        newQuestion.save().then(function() {
          this.set('isEditing', false);
          return true;
        });

        this.set('isEditing', false);
      }
  },
});