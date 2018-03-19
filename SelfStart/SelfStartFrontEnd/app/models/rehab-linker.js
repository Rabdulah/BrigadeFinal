import DS from 'ember-data';

export default DS.Model.extend({
  terminated: DS.attr(),
  RehabilitationPlan: DS.belongsTo('patient'),
  Patient: DS.belongsTo('patient')
});
