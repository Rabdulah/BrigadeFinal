var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
'use strict';
const nodemailer = require('nodemailer');

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
                    salt: String,
                    accType: {
                        type: String,
                        default: "0"
                    }
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
            console.log("THIS IS THE CLIENT", client);
            client.save(callback);
        });
    });
}
//--------------------Comparing Password For Authentication-------------------//
exports.comparePassword = function(candidatePass, hash, callback) {
    bcrypt.compare(candidatePass, hash, (err, isMatch) => {
        if(err) throw err;

        callback(null, isMatch);
    });
}
//-------------------------------------------Mail Config-------------------------------------//
// var transport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//             type: 'OAuth2',
//             user: 'mdawoud2@uwo.ca',
//             clientId: '',
//             clientSecret: '',
//             refreshToken: ''
//     }
// });
//--------------------------------Send Mail For Validation------------------------------------//
// exports.sendEmail = function(user, verificationTokenData){
//     var verificationUrl = "https://se3316lab05-mustafadawoud97.c9users.io:8081/users/verify/" + verificationTokenData;
//     var emailBody = '<p>Hey, <br/>Verify your email by clicking the following link: <a href="' + 
//         verificationUrl + '" target="_blank"> Click me</a></p>';
    
//     var mailOptions = {
//         from: 'Stephanie <user@domain.com>',
//         to: user.email,
//         subject: 'Marcotte Physiotherapy Email Verification',
//         html: emailBody
//     }
    
//     transport.sendMail(mailOptions, (err, res) => {
//         if(err){
//             console.log(err); return false;
//         } else {
//             console.log("Email sent"); return true;
//         }
//     }); 
// }