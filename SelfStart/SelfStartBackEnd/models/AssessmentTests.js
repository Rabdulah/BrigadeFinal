var mongoose = require('mongoose');

var assessmentTestSchema = mongoose.Schema({
    name: String,
    description: String,
    authorName: String,
    testResult: {
                    question: String,
                    answer: String
                },
    rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'},
    assessmentTool: {type: mongoose.Schema.ObjectId, ref: 'Forms'},
    recommendation: [{type: mongoose.Schema.ObjectId, ref: 'Recommendations'}]

});
var AssessmentTestSchema = mongoose.model('assesmentTest', assessmentTestSchema);
exports.Model = AssessmentTestSchema;
