var mongoose = require('mongoose');

var appointmentsSchema = mongoose.Schema({
    date: Date,
    reason: String,
    other: String,
    patient: {type: mongoose.Schema.ObjectId, ref: 'Patients'}
});
var AppointmentsSchema = mongoose.model('appointment', appointmentsSchema);
exports.Model = AppointmentsSchema;