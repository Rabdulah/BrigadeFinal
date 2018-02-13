var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
    questionText: String,
    helpDescription: String,
    optionNumber: Number,
    optionString: String,
    type: String,
    questionOrder: [{type: mongoose.Schema.ObjectId, ref: 'QuestionOrder'}],
});

var Questions = mongoose.model('question', questionsSchema);
exports.Model = Questions;