var mongoose = require('mongoose');

var exercisesOrderSchema = mongoose.Schema({
    exerciseOrder: Number
});
var exercisesOrderSchema = mongoose.model('ExercisesList', exercisesOrderSchema);
exports.Model = exercisesOrderSchema;