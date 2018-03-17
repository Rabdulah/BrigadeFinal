import DS from 'ember-data';

export default DS.Model.extend({
  planName: DS.attr(),
  description: DS.attr(),
  physioID: DS.attr(),
  goal: DS.attr(),
  timeToComplete: DS.attr(),
  exercises: DS.hasMany('exercise'),
  assessmentTests: DS.hasMany('assessment-test')
});
