var mongoose = require('mongoose');
var imagesSchema = mongoose.Schema(
    {
        name: String,
        type: String,
        size: String,
        rawSize: Number,
        imageData: String
    }
);

var Images = mongoose.model('image', imagesSchema);
exports.Model = Images;

