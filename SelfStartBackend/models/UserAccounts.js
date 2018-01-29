var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userAccountName: {
		type: String,
		required: true
    },
    encryptedPassword: {
		type: String,
		required: true
    }
});

var Model = mongoose.model('userAccount', schema);
module.exports = Model;
