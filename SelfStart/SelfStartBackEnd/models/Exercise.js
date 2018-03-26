var mongoose = require('mongoose');

var exercisesSchema = mongoose.Schema({
    name: String,
    description: String,
    objectives: [String],
    authorName: String,
    actionSteps: [String],
    location: String,
    frequency: Number,
    duration: Number,
    multimediaURL: String,
    targetDate: Date,
    images: [{type: mongoose.Schema.ObjectId, ref: 'Images'}],
    rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'},
    dateCreated: {
        type: String
    }
});
var ExercisesSchema = mongoose.model('exercise', exercisesSchema);
exports.Model = ExercisesSchema;