var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var bcrypt=require('bcrypt');

var physiotherapestsSchema = mongoose.Schema({
    ID: String,
    familyName: String,
    givenName: String,
    email: String,
    encryptedPassword: {type: mongoose.Schema.ObjectId, ref: 'Passwords'},
    gender: String,
    phoneNumber: String,
    dateHired: Date,
    dateFired: Date,
    success: {
        type: Boolean,
        default: true
    },
    treatment: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}],
    appointments: [{type: mongoose.Schema.ObjectId, ref: 'Appointments'}],

    account: {
        //New----------------------------------------
        nonce: String,
        response: String,
        token: String,
        requestType: String,
        wrongUserName: Boolean,
        wrongPassword: Boolean,
        passwordMustChanged: Boolean,
        passwordReset: Boolean,
        loginFailed: Boolean,
        sessionIsActive: Boolean,
        //-------------------------------------------
        accType: {
            type: String,
            default: "1"
        }
    }

});

physiotherapestsSchema.plugin(mongoosePaginate);
var PhysiotherapestsSchema = mongoose.model('physiotherapest', physiotherapestsSchema);
const Physio = exports.Model = PhysiotherapestsSchema;


//Adding Functionalities to Model

//----------------------------Get User By ID-----------------------------------//
exports.getUserByID = function(id, callback) {
    const query = {id: id};
    Physio.findById(id, callback);
};
//----------------------------Get User By Email--------------------------------//
exports.getUserByEmail = function(email, callback) {
    const query = {email: email};
    Physio.findOne(query, callback);
};
//-----------------------Get User By Email Direct Return-----------------------//
exports.getUserByEmailDirect = function(email) {
    const query = {email: email};
    Physio.findOne(query, (err, physio) =>{
        return physio;
    });
};
//----------------------------Add New Physiotherapest--------------------------//
exports.addPhysio = function(physio, callback) {

    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(physio.account.encryptedPassword, salt, (err, hash) =>{
            if(err){
                throw err;
            }
            physio.account.encryptedPassword = hash;
            physio.account.salt = salt;
            console.log("THIS IS THE CLIENT", physio);
            physio.save(callback);
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
