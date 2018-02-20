var mongoose = require('mongoose');
var patientProfilesSchema = mongoose.Schema(
    {
        ID: String,
        familyName: String,
        givenName: String,
        email: String,
        dateOfBirth: Date,
        phoneNumber: String,
        healthCardNumber: String,
        occupation: String,
        maritalStatus: String,
        gender: String,
        country: String,
        province: String,
        city: String,
        apartment: Number,
        streetNumber: Number,
        streetName: String,

        postalCode: String
        // account: {
        //             userAccountName: String,
        //             encryptedPassword: String,
        //             salt: String
        //         },
        // payments: [{
        //             dayTimestamp: Date,
        //             amount: Number,
        //             note: String
        //         }],
        // appointments: [{type: mongoose.Schema.ObjectId, ref: 'Appointments'}],
        // askAPhysio: [{type: mongoose.Schema.ObjectId, ref: 'AskAPhysio'}],
        // plan: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}]
    }
);

var PatientProfiles = mongoose.model('patient', patientProfilesSchema);
exports.Model = PatientProfiles;