import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    DS: Ember.inject.service('store'),

    exerciseData: null,

    // obj: [],

    Description: Ember.computed.oneWay('exerciseData.description'),
    Name: Ember.computed.oneWay('exerciseData.name'),
    AuthName: Ember.computed.oneWay('exerciseData.authorName'),
    obj: Ember.computed.oneWay('exerciseData.objectives'),
    actionStep: Ember.computed.oneWay('exerciseData.actionSteps'),
    Location: Ember.computed.oneWay('exerciseData.location'),
    Frequency: Ember.computed.oneWay('exerciseData.frequency'),
    Duration: Ember.computed.oneWay('exerciseData.duration'),
    TargetedDate: Ember.computed.oneWay('exerciseData.targetDate'),
    MMURL: Ember.computed.oneWay('exerciseData.multimediaURL'),
  
    modalName: Ember.computed(function () {
      return 'editExercise' + this.get('ID');
    }),
  
    actions: {
      openModalDelete: function () {
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
              rec.set('actionStep', this.get('ActionSteps'));
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


      addObjective: function(){
        let newObj = this.get('Objective');
        this.get('obj').pushObject(newObj);
        this.set('Objective', "");
      },

      addActionStep(){
        let newActStep = this.get('ActionSteps');
        this.get('actionStep').pushObject(newActStep);
        this.set('ActionSteps', "");
      },

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
              rec.set('actionStep', this.get('ActionSteps'));
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