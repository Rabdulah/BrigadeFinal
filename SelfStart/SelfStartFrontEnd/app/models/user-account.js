import DS from 'ember-data';

export default DS.Model.extend({
    //account
    userAccountName: DS.attr(),
    encryptedPassword: DS.attr(),
    salt: DS.attr()
});
