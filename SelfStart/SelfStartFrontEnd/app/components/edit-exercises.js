import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    DS: Ember.inject.service('store'),

    exerciseData: null,
    
    Description: Ember.computed.oneWay('exerciseData.description'),
    Name: Ember.computed.oneWay('exerciseData.name'),
    AuthName: Ember.computed.oneWay('exerciseData.authorName'),
    Objective: Ember.computed.oneWay('exerciseData.objective'),
    ActionSteps: Ember.computed.oneWay('exerciseData.actionName'),
    Location: Ember.computed.oneWay('exerciseData.location'),
    Frequency: Ember.computed.oneWay('exerciseData.frequency'),
    Duration: Ember.computed.oneWay('exerciseData.duration'),
    TargetedDate: Ember.computed.oneWay('exerciseData.targetDate'),
    MMURL: Ember.computed.oneWay('exerciseData.multimediaURL'),
  
    modalName: Ember.computed(function () {
      return 'editExercise' + this.get('ID');
    }),
  
    actions: {
      openModal: function () {
        this.set('exerciseData', this.get('DS').peekRecord('exercise', this.get('ID')))
  
        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          detachable: false,
          onDeny: () => {
            return true;
            },
           
          onApprove: () => {
            this.get('DS').findRecord('exercise' , this.get('ID')).then((rec)=>{
              rec.set('name', this.get('Name'));
              rec.set('description', this.get('Description'));
              rec.set('authorName', this.get('AuthName'));
              rec.set('objective', this.get('Objective'));
              rec.set('actionSteps', this.get('ActionSteps'));
              rec.set('location', this.get('Location'));
              rec.set('frequency', this.get('Frequency'));
              rec.set('duration', this.get('Duration'));
              rec.set('targetDate', this.get('TargetDate'));
              rec.set('MMURL', this.get('MMURL'));
              // rec.set('exercises', this.get('exercises'));
              // rec.set('assessmentTests', this.get('assessmentTests'));
              rec.save().then(()=>{
                return true;
              });
            });
          }
        })
          .modal('show');
      },
    }
});
