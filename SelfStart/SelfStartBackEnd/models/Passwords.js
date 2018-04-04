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
exports.Model = Passwords;