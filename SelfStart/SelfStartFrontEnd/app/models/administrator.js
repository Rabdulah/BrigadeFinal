import DS from 'ember-data';

export default DS.Model.extend({
  ID: DS.attr(),
  familyName: DS.attr(),
  givenName: DS.attr(),
  email: DS.attr(),
  dateHired: DS.attr("Date"),
  dateFired: DS.attr("Date"),
  phoneNumber: DS.attr(),
  message: DS.attr(),
  account: DS.attr(),
});
