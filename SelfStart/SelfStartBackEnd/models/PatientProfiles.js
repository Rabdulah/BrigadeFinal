var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var bcrypt=require('bcrypt');

var patientProfilesSchema = mongoose.Schema(
    {
        ID: String,
        familyName: String,
        givenName: String,
        email: String,
        dateOfBirth: Date,
        phoneNumber: String,
        healthCardNumber: String,
        // occupation: String,
        // maritalStatus: String,
        gender: String,
        country: String,
        province: String,
        city: String,
        apartment: Number,
        streetNumber: Number,
        streetName: String,
        answer: [{type: mongoose.Schema.ObjectId, ref: 'Answers'}],
        postalCode: String,
        account: {
                    userAccountName: String,
                    encryptedPassword: String,
                    salt: String,
                    accType: {
                        type: String,
                        default: "0"
                    }
                },

        // payments: [{
        //             dayTimestamp: Date,
        //             amount: Number,
        //             note: String
        //         }],
        appointments: [{type: mongoose.Schema.ObjectId, ref: 'Appointments'}],
        rehablink: [{type: mongoose.Schema.ObjectId, ref: 'RehabClientLink'}],        // askAPhysio: [{type: mongoose.Schema.ObjectId, ref: 'AskAPhysio'}],
        intakeForm: {type: mongoose.Schema.ObjectId, ref: 'AssessmentTest'},
        // plan: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}]
    }
);

patientProfilesSchema.plugin(mongoosePaginate);
var PatientProfiles = mongoose.model('patient', patientProfilesSchema);
const Client = exports.Model = PatientProfiles;

//Adding Functionalities to Model
//----------------------------Get User By ID-----------------------------------//
exports.getUserByID = function(id, callback) {
    const query = {id: id};
    Client.findById(id, callback);
};
//----------------------------Get User By Email--------------------------------//
exports.getUserByEmail = function(email, callback) {
    const query = {email: email};
    Client.findOne(query, callback);
};
//----------------------------Add New Client----------------------------------//
exports.addClient = function(client, callback) {

    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(client.account.encryptedPassword, salt, (err, hash) =>{
            if(err){
                throw err;
            }
            client.account.encryptedPassword = hash;
            client.account.salt = salt;
            console.log("THIS IS THE CLIENT", client);
            client.save(callback);
        });
    });
};
//--------------------Comparing Password For Authentication-------------------//
exports.comparePassword = function(candidatePass, hash, callback) {
    bcrypt.compare(candidatePass, hash, (err, isMatch) => {
        if(err) throw err;

        callback(null, isMatch);
    });
};