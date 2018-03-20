var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var rehabilitationPlansSchema = mongoose.Schema({
    planName: String,
    description: String,
    physioID: {type: mongoose.Schema.ObjectId, ref: 'Physiotherapests'},
    goal: String,
    date: Date,
    timeToComplete: String,
    plan: [{type: mongoose.Schema.ObjectId, ref: 'Treatments'}],
    test: [{type: mongoose.Schema.ObjectId, ref: 'AssessmentTests'}],
    exercise: [{type: mongoose.Schema.ObjectId, ref: 'Exercises'}]

});

rehabilitationPlansSchema.plugin(mongoosePaginate);
var RehabilitationPlansSchema = mongoose.model('rehabilitationPlan', rehabilitationPlansSchema);
exports.Model = RehabilitationPlansSchema;