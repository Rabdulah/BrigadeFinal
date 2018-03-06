import DS from 'ember-data';

export default DS.Model.extend({
    ID: DS.attr(),
    familyName: DS.attr(),
    givenName: DS.attr(),
    email: DS.attr(),
    dateHired: DS.attr(),
    dateFired: DS.attr(),
    treatment: DS.attr(),
    account: DS.attr(),
  appointments: DS.hasMany('appointment' , { async: true })
});
