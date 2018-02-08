import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  DS: Ember.inject.service('store'),
  questionData: null,
  questionText: Ember.computed.oneWay('questionData.questionText'),
  helpDescription: Ember.computed.oneWay('questionData.helpDescription'),
  questionType: Ember.computed.oneWay('questionData.type'),
  multipleChoice: false,
  opt2: false,
  opt3: false,
  opt4: false,
  opt5: false,
  opt6: false,
  opt1String: " ",
  opt2String: " ",
  opt3String: " ",
  opt4String: " ",
  opt5String: " ",
  opt6String: " ",
  questionString: " ",

  modalName: Ember.computed(function() {
    return 'questionData' + this.get('ID');
  }),


  actions: {

    isMultipleChoice: function() {
      console.log(this.get('questionData.type'));
      if(this.get('questionData.type') == "Multiple choice"){
          this.set('multipleChoice',true);
          var breakdown = this.get('questionData.questionText').split('+++');
          console.log(breakdown[0]);
          this.set('questionString', breakdown[0]);

          if(this.get('questionData.optionNumber') == 6){
            this.set('opt2', true);
            this.set('opt3', true);
            this.set('opt4', true);
            this.set('opt5', true);
            this.set('opt6', true);
            for(var i = 0; i < 6;i++){
                this.set('opt' +(i+1) + 'String', breakdown[i+1]);
            }
          }

          else if (this.get('questionData.optionNumber') == 5) {
            this.set('opt2', true);
            this.set('opt3', true);
            this.set('opt4', true);
            this.set('opt5', true);
            for(var i = 0; i < 5;i++){
              this.set('opt' +(i+1) + 'String', breakdown[i+1]);
            }
          }

          else if (this.get('questionData.optionNumber') == 4) {
            this.set('opt2', true);
            this.set('opt3', true);
            this.set('opt4', true);
            for(var i = 0; i < 4;i++){
              this.set('opt' +(i+1) + 'String', breakdown[i+1]);
            }
          }

          else if (this.get('questionData.optionNumber') == 3) {
            this.set('opt2', true);
            this.set('opt3', true);
            for(var i = 0; i < 3;i++){
              this.set('opt' +(i+1) + 'String', breakdown[i+1]);
            }
          }

          else if (this.get('questionData.optionNumber') == 2) {
            this.set('opt2', true);
            for(var i = 0; i < 2;i++){
              this.set('opt' +(i+1) + 'String', breakdown[i+1]);
            }
          }
      }
      else
         this.set('multipleChoice',false);
    },

    openModal: function () {
      this.set('questionData', this.get('DS').peekRecord('question', this.get('ID')));

      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closeable: false,
        transaction: 'horizontal flip',
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          this.get('DS').findRecord('question', this.get('ID')).then((rec) => {
            rec.set('questionText', this.get('questionText')),
            rec.set('helpDescription', this.get('helpDescription')),
            rec.save().then(()=>{
              return true;
            });
          })
        }
      })
        .modal('show');
    },
  }
});
