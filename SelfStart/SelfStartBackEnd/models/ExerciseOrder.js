var mongoose = require('mongoose');

var ExerciseOrderSchema = mongoose.Schema({
    exercise: {type: mongoose.Schema.ObjectId, ref: 'Exercise'},
    rehabilitation: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'},
    order: Number
});

var exerciseorder = mongoose.model('ExerciseOrder', ExerciseOrderSchema);
exports.Model = exerciseorder;