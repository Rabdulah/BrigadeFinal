import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  DS: Ember.inject.service('store'),
  questionData: null,
  questionText: Ember.computed.oneWay('questionData.questionText'),
  helpDescription: Ember.computed.oneWay('questionData.helpDescription'),

  modalName: Ember.computed(function() {
    return 'questionData' + this.get('ID');
  }),


  actions: {
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
