var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
    questionText: String,
    helpDescription: String,
    optionNumber: Number,
    optionString: String,
    type: String,
    mc: Boolean,
    sa: Boolean,
    tf: Boolean,
    ra: Boolean,
    answer: [{type: mongoose.Schema.ObjectId, ref: 'Answers'}],
    form: [{type: mongoose.Schema.ObjectId, ref: 'Forms'}]
});

var Questions = mongoose.model('question', questionsSchema);
exports.Model = Questions;