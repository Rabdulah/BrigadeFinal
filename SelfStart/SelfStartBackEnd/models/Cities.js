var mongoose = require('mongoose');

var citiesSchema = mongoose.Schema({
    name: String,
    provinces: {type: mongoose.Schema.ObjectId, ref: "Provinces"},
});
var CitiesSchema = mongoose.model('city', citiesSchema);
exports.Model = CitiesSchema;