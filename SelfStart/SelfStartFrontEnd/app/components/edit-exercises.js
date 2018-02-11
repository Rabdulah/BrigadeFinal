import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    DS: Ember.inject.service('store'),

    exerciseData: null,
    
    description: Ember.computed.oneWay('exerciseData.description'),
    name: Ember.computed.oneWay('exerciseData.name'),
    authName: Ember.computed.oneWay('exerciseData.authName'),
    objective: Ember.computed.oneWay('exerciseData.objective'),
    actionSteps: Ember.computed.oneWay('exerciseData.AuthName'),
    location: Ember.computed.oneWay('exerciseData.location'),
    frequency: Ember.computed.oneWay('exerciseData.frequency'),
    duration: Ember.computed.oneWay('exerciseData.duration'),
    targetedDate: Ember.computed.oneWay('exerciseData.targetDate'),
    MMURL: Ember.computed.oneWay('exerciseData.multimediaURL'),
    // planName: Ember.computed.oneWay('rehabilitationplansData.planName'),
    // exercises: Ember.computed.oneWay('rehabilitationplansData.exercises'),
    // assessmentTests: Ember.computed.oneWay('rehabilitationplansData.assessmentTests'),
  
    modalName: Ember.computed(function () {
      return 'editExercise' + this.get('ID');
    }),
  
    actions: {
      openModal: function () {
        this.set('exerciseData', this.get('DS').peekRecord('exerciseData', this.get('ID')))
  
        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          detachable: false,
          onDeny: () => {
            return true;
            },
  
          onApprove: () => {
            this.get('DS').findRecord('exerciseData' , this.get('ID')).then((rec)=>{
              rec.set('', this.get('Name'));
              rec.set('description', this.get('Description'));
              rec.set('authName', this.get('AuthName'));
              rec.set('objective', this.get('Objective'));
              rec.set('actionSteps', this.get('ActionSteps'));
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
