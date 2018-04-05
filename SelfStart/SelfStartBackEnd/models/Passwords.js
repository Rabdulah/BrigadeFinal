var mongoose = require('mongoose');
var passwordsSchema = mongoose.Schema(
    {
        email: String,
        salt: String,
        encryptedPassword: String,
        passwordMustChanged : Boolean,
        passwordReset: Boolean,
        admin: {type: mongoose.Schema.ObjectId, ref: ('Administrators')},
        practitioner: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapests')},
        client: {type: mongoose.Schema.ObjectId, ref: ('PatientProfiles')}
    }
);

var Passwords = mongoose.model('password', passwordsSchema);
const Pass = exports.Model = Passwords;

//----------------------------Get User By Email--------------------------------//
exports.getUserByEmail = function(email, callback) {
    const query = {email: email};
    Pass.findOne(query, callback);
};
//----------------------------------------------------------------------------//