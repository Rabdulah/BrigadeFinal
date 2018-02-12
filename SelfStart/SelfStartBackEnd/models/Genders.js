var mongoose = require('mongoose');

var gendersSchema = mongoose.Schema({
    name: String,
    patient: [{type: mongoose.Schema.ObjectId, ref: "PatientProfiles"}]
});
var GendersSchema = mongoose.model('gender', gendersSchema);
exports.Model = GendersSchema;