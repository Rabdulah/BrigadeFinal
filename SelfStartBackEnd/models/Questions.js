var mongoose = require('mongoose');

var questionsSchema = mongoose.Schema({
    questionText: String,
    helpDescription: String,
    order: Number,
    type: {
            name: String
          },
    form: {type: mongoose.Schema.ObjectId, ref: 'Forms'},
});

var Questions = mongoose.model('question', questionsSchema);
exports.Model = Questions;
