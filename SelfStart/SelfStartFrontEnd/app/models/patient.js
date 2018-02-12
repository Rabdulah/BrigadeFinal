import DS from 'ember-data';

export default DS.Model.extend({
  // patient
  ID: DS.attr(),
  familyName: DS.attr(),
  givenName: DS.attr(),
  email: DS.attr(),
  streetName: DS.attr(),
  streetNumber: DS.attr('Number'),
  apartment: DS.attr('Number'),
  country:DS.attr(),
  provinces: DS.attr(),
  cities: DS.attr(),
  dateOfBirth: DS.attr('Date'),
  healthCardNumber: DS.attr(),
  occupation: DS.attr(),
  maritalStatus:  DS.attr(),
  gender: DS.attr(),
  phoneNumber: DS.attr(),
  postalCode: DS.attr(),

});
