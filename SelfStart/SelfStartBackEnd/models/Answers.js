var mongoose = require('mongoose');

var answersSchema = mongoose.Schema({
    answer: String,
    question: {type: mongoose.Schema.ObjectId, ref: 'Questions'},
    patient: {type: mongoose.Schema.ObjectId, ref: 'PatientProfiles'},
    form: {type: mongoose.Schema.ObjectId, ref: 'Forms'}
});

var AnswersSchema = mongoose.model('answer', answersSchema);
exports.Model = AnswersSchema;
