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

  modalName: Ember.computed(function() {
    return 'questionData' + this.get('ID');
  }),


  actions: {

    isMultipleChoice: function() {
      if(this.get('questionData.type') == "Multiple choice"){
          this.set('multipleChoice',true);

          if(this.get('questionData.optionNumber') == 6){
            this.set('opt2', true);
            this.set('opt3', true);
            this.set('opt4', true);
            this.set('opt5', true);
            this.set('opt6', true);
          }

          else if (this.get('questionData.optionNumber') == 5) {
            this.set('opt2', true);
            this.set('opt3', true);
            this.set('opt4', true);
            this.set('opt5', true);
          }

          else if (this.get('questionData.optionNumber') == 4) {
            this.set('opt2', true);
            this.set('opt3', true);
            this.set('opt4', true);
          }

          else if (this.get('questionData.optionNumber') == 3) {
            this.set('opt2', true);
            this.set('opt3', true);
          }

          else if (this.get('questionData.optionNumber') == 2) {
            this.set('opt2', true);
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
