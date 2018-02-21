var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
    questionText: String,
    helpDescription: String,
    optionNumber: Number,
    optionString: String,
    type: String,
    image: {type: mongoose.Schema.ObjectId, ref: 'Images'},
    form: [{type: mongoose.Schema.ObjectId, ref: 'Forms'}],
});

var Questions = mongoose.model('question', questionsSchema);
exports.Model = Questions;