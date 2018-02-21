var mongoose = require('mongoose');
var imagesSchema = mongoose.Schema(
    {
        name: String,
        type: String,
        size: String,
        rawSize: Number,
        imageData: String,
        exercise: [{type: mongoose.Schema.ObjectId, ref: 'Exercise'}],
        question: [{type: mongoose.Schema.ObjectId, ref: 'Questions'}]
    }
);

var Images = mongoose.model('image', imagesSchema);
exports.Model = Images;

