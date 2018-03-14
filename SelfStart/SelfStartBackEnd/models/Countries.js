var mongoose = require('mongoose');

var countriesSchema = mongoose.Schema({
    name: String,
    provinces: [{type: mongoose.Schema.ObjectId, ref: "Provinces"}]
});

var CountriesSchema = mongoose.model('country', countriesSchema);
exports.Model = CountriesSchema;