var mongoose = require('mongoose');

var questionOrderSchema = mongoose.Schema({
    question: {type: mongoose.Schema.ObjectId, ref: 'Questions'},
    form: {type: mongoose.Schema.ObjectId, ref: 'Forms'},
    order: Number
});

var QuestionOrderSchema = mongoose.model('province', questionOrderSchema);
exports.Model = QuestionOrderSchema;