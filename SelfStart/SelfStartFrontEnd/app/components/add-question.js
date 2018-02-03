import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    DS: inject('store'),

    isEditing: false,
    shortAns: false,
    multipleChoice:false,
    option2:false,
    option3:false,
    option4:false,
    option5:false,
    option6:false,
    removable: false,
    addable:true,
  
    actions: {

      multipleChoice (){
        this.set('multipleChoice', true);
        this.set('shortAns', false);
      },

      addOption(){
        if(this.option2 == false){
          this.set('option2', true);
          this.set('removable', true);
          return;
        }
        if(this.option3 == false){
          this.set('option3', true);
          return;
        }     
        if(this.option4 == false){
          this.set('option4', true);
          return;
        }
        if(this.option5 == false){
          this.set('option5', true);
          return;
        }
        if(this.option6 == false){
          this.set('option6', true);
          this.set('addable', false);
          return;
        }
      },

      removeOption(){
        if(this.option6 == true){
          this.set('option6', false);
          this.set('addable', true);
          return;
        }
        if(this.option5 == true){
          this.set('option5', false);
          return;
        }     
        if(this.option4 == true){
          this.set('option4', false);
          return;
        }
        if(this.option3 == true){
          this.set('option3', false);
          return;
        }  
        if(this.option2 == true){
          this.set('option2', false);
          this.set('removable', false);
          return;
        }  
      },

      shortAns (){
        this.set('shortAns', true);
        this.set('multipleChoice', false);
      },

      addQuestion (){
        this.set('isEditing', true);
      },
  
      cancel: function () {
        this.set('isEditing', false);
      },
  
      submit: function () {
  
        let self = this;
  
        let patient = this.get('DS').createRecord('patient', {
          familyName: self.get('familyName'),
          givenName: self.get('givenName'),
          email: self.get('email'),
        });
  
          patient.save().then(function() {
            this.set('isEditing', false);
        });
        this.set('familyName', '');
        this.set('givenName', '');
        this.set('email', '');
      }
  },
});
