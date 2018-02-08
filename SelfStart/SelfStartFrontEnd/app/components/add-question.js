import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    DS: inject('store'),

    isEditing: false,
    shortAns: false,
    multipleChoice:false,
    rating: false,
    trueFalse:false,
    option2:false,
    option3:false,
    option4:false,
    option5:false,
    option6:false,
    oNumber:1,
    removable: false,
    addable:true,
  
    actions: {

      multipleChoice (){
        this.set('multipleChoice', true);
        this.set('shortAns', false);
        this.set('trueFalse', false);
        this.set('rating',false);
      },

      addOption(){
        if(this.option2 == false){
          this.set('option2', true);
          this.set('removable', true);
          this.oNumber++;
          return;
        }
        if(this.option3 == false){
          this.set('option3', true);
          this.oNumber++;
          return;
        }     
        if(this.option4 == false){
          this.set('option4', true);
          this.oNumber++;
          return;
        }
        if(this.option5 == false){
          this.set('option5', true);
          this.oNumber++;
          return;
        }
        if(this.option6 == false){
          this.set('option6', true);
          this.set('addable', false);
          this.oNumber++;
          return;
        }
      },

      removeOption(){
        if(this.option6 == true){
          this.set('option6', false);
          this.set('addable', true);
          this.oNumber--;
          return;
        }
        if(this.option5 == true){
          this.set('option5', false);
          this.oNumber--;
          return;
        }     
        if(this.option4 == true){
          this.set('option4', false);
          this.oNumber--;
          return;
        }
        if(this.option3 == true){
          this.set('option3', false);
          this.oNumber--;
          return;
        }  
        if(this.option2 == true){
          this.set('option2', false);
          this.set('removable', false);
          this.oNumber--;
          return;
        }  
      },

      shortAns (){
        this.set('shortAns', true);
        this.set('multipleChoice', false);
        this.set('trueFalse', false);
        this.set('rating',false);
      },

      trueFalse (){
        this.set('trueFalse', true);
        this.set('shortAns', false);
        this.set('multipleChoice', false);
        this.set('rating',false);
      },

      rating (){
        this.set('trueFalse', false);
        this.set('shortAns', false);
        this.set('multipleChoice', false);
        this.set('rating',true);
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
            qtype = "Short answer";
        }
        if(this.multipleChoice){
            help = self.get('mchelp');
            question = self.get('mcquestion');
            qtype = "Multiple choice";

            for(var i = 1; i <= this.oNumber; i++){
              question += "+++";
              question += self.get('mcop' + i);
            }
        }
        if(this.trueFalse){
          help = self.get('tfhelp');
          question = self.get('tfquestion');
          qtype = "True/False";
        }

        if(this.rating){
          help = self.get('rhelp');
          question = self.get('rquestion');
          qtype = "Rating";
        }

        let newQuestion = this.get('DS').createRecord('question', {
         
            helpDescription: help,
            questionText: question,
            type: qtype,
            optionNumber: this.oNumber
        });
  
        newQuestion.save().then(function() {
          this.set('isEditing', false);
          return true;
        });

        this.set('isEditing', false);
      }
  },
});