import DS from 'ember-data';

export default DS.Model.extend({
  // patient
  ID: DS.attr(),
  familyName: DS.attr(),
  givenName: DS.attr(),
  email: DS.attr(),
  dateOfBirth: DS.attr(),
  phoneNumber: DS.attr(),
  healthCardNumber: DS.attr(),
  occupation: DS.attr(),
  maritalStatus:  DS.attr(),
  gender: DS.attr(),
  country:DS.attr(),
  cities: DS.attr(),
  provinces: DS.attr(),
  apartment: DS.attr(),
  streetNumber: DS.attr(),
  streetName: DS.attr(),
  postalCode: DS.attr(),

});
