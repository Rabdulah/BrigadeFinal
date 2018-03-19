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
  province: DS.attr(),
  city: DS.attr(),
  dateOfBirth: DS.attr('Date'),
  healthCardNumber: DS.attr(),
  gender: DS.attr(),
  phoneNumber: DS.attr(),
  postalCode: DS.attr(),
  appointments: DS.hasMany('appointment', { async: true }),
  rehablink: DS.hasMany('rehab-linker', { async: true }),
  account: DS.attr()

});

