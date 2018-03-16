var mongoose = require('mongoose');

var assessmentTestSchema = mongoose.Schema({
    form: {type: mongoose.Schema.ObjectId, ref: 'Forms'},
    rehabPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'},
    questions:  [{type: mongoose.Schema.ObjectId, ref: 'Questions'}],
    answers:  [{type: mongoose.Schema.ObjectId, ref: 'Answers'}]

});
var AssessmentTestSchema = mongoose.model('assessmentTest', assessmentTestSchema);
exports.Model = AssessmentTestSchema;
