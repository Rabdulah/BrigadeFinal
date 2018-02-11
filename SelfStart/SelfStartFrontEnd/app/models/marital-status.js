import DS from 'ember-data';

export default DS.Model.extend({
  // status
  name: DS.attr(),
  patients: DS.hasMany('patient', { async: true }) // 1 to many
});
