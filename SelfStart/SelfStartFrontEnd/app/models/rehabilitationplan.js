import DS from 'ember-data';

export default DS.Model.extend({
  planName: DS.attr(),
  description: DS.attr(),
  physioID: DS.belongsTo('physiotherapest'),
  goal: DS.attr(),
  exercises: DS.attr(),
  assessmentTests: DS.hasMany('assessment-test')
});
