var mongoose = require('mongoose');

var askAPhysioSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    comment: String,
    patient: {type: mongoose.Schema.ObjectId, ref: 'PatientProfiles'}
});
var AskAPhysioSchema = mongoose.model('askAPhysio', askAPhysioSchema);
exports.Model = AskAPhysioSchema;