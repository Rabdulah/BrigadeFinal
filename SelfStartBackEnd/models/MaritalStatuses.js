var mongoose = require('mongoose');

var maritalStatusSchema = mongoose.Schema({
    name: String,
    patients: [{type: mongoose.Schema.ObjectId, ref: "PatientProfiles"}]
});
var MaritalStatusSchema = mongoose.model('maritalStatus', maritalStatusSchema);
exports.Model = MaritalStatusSchema;