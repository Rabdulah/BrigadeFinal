var mongoose = require('mongoose');

var countriesSchema = mongoose.Schema({
    name: String,
    provinces: [{type: mongoose.Schema.ObjectId, ref: "Provinces"}],
    patient: [{type: mongoose.Schema.ObjectId, ref: "PatientProfiles"}]
});

var CountriesSchema = mongoose.model('country', countriesSchema);
exports.Model = CountriesSchema;