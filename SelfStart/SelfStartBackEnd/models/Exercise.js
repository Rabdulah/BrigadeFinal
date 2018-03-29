var mongoose = require('mongoose');

var exercisesSchema = mongoose.Schema({
    name: String,
    description: String,
    authorName: String,
    actionSteps: [String],
    durationMinute: String,
    durationSecond: Number,
    multimediaURL: String,
    images: [{type: mongoose.Schema.ObjectId, ref: 'Images'}],
    rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'},
    dateCreated: {
        type: String
    },
    sets:Number,
    reps:Number,
    notes: String
});
var ExercisesSchema = mongoose.model('exercise', exercisesSchema);
exports.Model = ExercisesSchema;