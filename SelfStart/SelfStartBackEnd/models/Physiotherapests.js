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
        salt: String,
        accType: {
            type: String,
            default: "1"
        }
    }

});
var PhysiotherapestsSchema = mongoose.model('physiotherapest', physiotherapestsSchema);
const Physio = exports.Model = PhysiotherapestsSchema;


//Adding Functionalities to Model

//----------------------------Get User By ID-----------------------------------//
exports.getUserByID = function(id, callback) {
    const query = {id: id};
    Physio.findById(id, callback);
}
//----------------------------Get User By Email--------------------------------//
exports.getUserByEmail = function(email, callback) {
    const query = {email: email};
    Physio.findOne(query, callback);
}
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
}
//--------------------Comparing Password For Authentication-------------------//
exports.comparePassword = function(candidatePass, hash, callback) {
    bcrypt.compare(candidatePass, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

