var mongoose = require('mongoose');

var citiesSchema = mongoose.Schema({
    name: String,
    province: {type: mongoose.Schema.ObjectId, ref: "Provinces"},
});
var CitiesSchema = mongoose.model('city', citiesSchema);
exports.Model = CitiesSchema;