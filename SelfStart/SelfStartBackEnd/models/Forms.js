var mongoose = require('mongoose');

var formsSchema = mongoose.Schema({
    name: String,
    description: String,
    author: {type: mongoose.Schema.ObjectId, ref: 'Administrators'},
    question: [{type: mongoose.Schema.ObjectId, ref: 'Questions'}],
    assessmentTest: [{type: mongoose.Schema.ObjectId, ref: 'AssessmentTests'}]
});

var Forms = mongoose.model('form', formsSchema);
exports.Model = Forms;
