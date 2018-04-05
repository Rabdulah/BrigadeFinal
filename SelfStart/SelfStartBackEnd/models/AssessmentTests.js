var mongoose = require('mongoose');

var assessmentTestSchema = mongoose.Schema({
    form: {type: mongoose.Schema.ObjectId, ref: 'Forms'},
    //rehabPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'},
    rehablink: {type: mongoose.Schema.ObjectId, ref: 'RehabClientLink'},
    questions:  [{type: mongoose.Schema.ObjectId, ref: 'Questions'}],
    answers:  [String],
    completed: Boolean,
    formName: String,

});
var AssessmentTestSchema = mongoose.model('assessmentTest', assessmentTestSchema);
exports.Model = AssessmentTestSchema;