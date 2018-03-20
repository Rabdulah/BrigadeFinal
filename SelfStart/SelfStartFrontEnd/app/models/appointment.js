import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr(),
  endDate: DS.attr(),
  reason: DS.attr(),
  other: DS.attr(),
  patient: DS.belongsTo('patient')
});
