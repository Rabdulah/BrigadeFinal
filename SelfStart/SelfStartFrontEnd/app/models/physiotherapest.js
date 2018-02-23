import DS from 'ember-data';

export default DS.Model.extend({
  ID:DS.attr(),
  familyName: DS.attr(),
  givenName: DS.attr(),
  email: DS.attr(),
  dateHired: DS.attr(),
  dateFinished:DS.attr(),

  appointment: DS.hasMany('appointment')
});
