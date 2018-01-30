var mongoose = require('mongoose');

var administratorsSchema = mongoose.Schema({
    ID: String,
    familyName: String,
    givenName: String,
    email: String,
    dateHired: Date,
    dateFired: Date,
    form: [{type: mongoose.Schema.ObjectId, ref: 'Forms'}],
     account: {
                    userAccountName: String,
                    encryptedPassword: String,
                    salt: String
                },

});
var AdministratorsSchema = mongoose.model('administrator', administratorsSchema);
exports.Model = AdministratorsSchema;
