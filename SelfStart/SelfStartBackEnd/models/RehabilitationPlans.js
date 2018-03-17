var mongoose = require('mongoose');

var rehabilitationPlansSchema = mongoose.Schema({
    planName: String,
    description: String,
    physioID: String,
    goal: String,
    date: Date,
    timeToComplete: String,
    plan: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}],
    assessmentTests: [{type: mongoose.Schema.ObjectId, ref: 'AssessmentTests'}],
    exercise: [{type: mongoose.Schema.ObjectId, ref: 'Exercises'}]

});
var RehabilitationPlansSchema = mongoose.model('rehabilitationPlan', rehabilitationPlansSchema);
exports.Model = RehabilitationPlansSchema;