var mongoose = require('mongoose');

var rehabilitationPlansSchema = mongoose.Schema({
    planName: String,
    description: String,
    physioID: String,
    goal: String,
    date: Date,
    timeToComplete: String,
    plan: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}],
    exercise: [{type: mongoose.Schema.ObjectId, ref: 'Exercises'}],
    rehabLink: {type: mongoose.Schema.ObjectId, ref: 'RehabClientLink'}

});
var RehabilitationPlansSchema = mongoose.model('rehabilitationPlan', rehabilitationPlansSchema);
exports.Model = RehabilitationPlansSchema;