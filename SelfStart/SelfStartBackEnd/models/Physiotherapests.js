var mongoose = require('mongoose');

var physiotherapestsSchema = mongoose.Schema({
    ID: String,
    familyName: String,
    givenName: String,
    email: String,
    dateHired: Date,
    dateFired: Date,
    treatment: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}],
    account: {
        userAccountName: String,
        encryptedPassword: String,
        salt: String
    }

});
var PhysiotherapestsSchema = mongoose.model('physiotherapest', physiotherapestsSchema);
exports.Model = PhysiotherapestsSchema;

