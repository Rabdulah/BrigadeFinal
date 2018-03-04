var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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
        postalCode: String,
        account: {
                    userAccountName: String,
                    encryptedPassword: String,
                    salt: String
                },
        payments: [{
                    dayTimestamp: Date,
                    amount: Number,
                    note: String
                }],
        appointments: [{type: mongoose.Schema.ObjectId, ref: 'Appointments'}],
        askAPhysio: [{type: mongoose.Schema.ObjectId, ref: 'AskAPhysio'}],

        plan: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}]
    }
);

var PatientProfiles = mongoose.model('patientProfile', patientProfilesSchema);
const Client = exports.Model = PatientProfiles;

//Adding Functionalities to Model

//----------------------------Get User By ID-----------------------------------//
exports.getUserByID = function(id, callback) {
    const query = {id: id};
    Client.findById(id, callback);
}
//----------------------------Get User By Email--------------------------------//
exports.getUserByEmail = function(email, callback) {
    const query = {email: email};
    Client.findOne(query, callback);
}
//----------------------------Add New Client----------------------------------//
exports.addClient = function(client, callback) {
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(client.account.encryptedPassword, salt, (err, hash) =>{
            if(err){
                throw err;
            }
            client.account.encryptedPassword = hash;
            client.account.salt = salt;
            client.save(callback);
        });
    });
}


  