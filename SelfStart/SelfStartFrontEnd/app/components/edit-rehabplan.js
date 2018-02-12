import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),
  rehabilitationplansData: null,
  description: Ember.computed.oneWay('rehabilitationplansData.description'),
  physioID: Ember.computed.oneWay('rehabilitationplansData.physioID'),
  goal: Ember.computed.oneWay('rehabilitationplansData.goal'),
  timeToComplete: Ember.computed.oneWay('rehabilitationplansData.timeToComplete'),
  planName: Ember.computed.oneWay('rehabilitationplansData.planName'),
  exercises: Ember.computed.oneWay('rehabilitationplansData.exercises'),
  assessmentTests: Ember.computed.oneWay('rehabilitationplansData.assessmentTests'),

  modalName: Ember.computed(function () {
    return 'editRehabilitationplan' + this.get('ID');
  }),

  actions: {
    openModal: function () {
      this.set('rehabilitationplansData', this.get('DS').peekRecord('rehabilitationplan', this.get('ID')))

      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        transition: 'horizontal flip',
        detachable: false,
        onDeny: () => {
          return true;
        },

        onApprove: () => {
          this.get('DS').findRecord('rehabilitationplan' , this.get('ID')).then((rec)=>{
            rec.set('planName', this.get('planName'));
            rec.set('description', this.get('description'));
            rec.set('physioID', this.get('physioID'));
            rec.set('goal', this.get('goal'));
            rec.set('timeToComplete', this.get('timeToComplete'));
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