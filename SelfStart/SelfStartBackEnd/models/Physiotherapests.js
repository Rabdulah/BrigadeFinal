var mongoose = require('mongoose');

var physiotherapestsSchema = mongoose.Schema({
    ID: String,
    familyName: {
        type: String,
        required: true
    },
    givenName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateHired: {
        type: Date,
        required: true
    },
    dateFired: Date,
    treatment: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}],
    account: {
        userAccountName: String,
        encryptedPassword: String,
        salt: String
    }

});
var PhysiotherapestsSchema = mongoose.model('physiotherapist', physiotherapestsSchema);
exports.Model = PhysiotherapestsSchema;

