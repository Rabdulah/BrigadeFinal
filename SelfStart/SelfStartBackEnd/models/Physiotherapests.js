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
    dateFinished: Date,
    treatment: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}],
    account: {
        userAccountName: String,
        encryptedPassword: String,
        salt: String
    }

});
var PhysiotherapestsSchema = mongoose.model('physiotherapest', physiotherapestsSchema);
exports.Model = PhysiotherapestsSchema;

