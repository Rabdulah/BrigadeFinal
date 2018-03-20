var mongoose = require('mongoose');

var rehabClientLinkSchema = mongoose.Schema({
    
    RehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'},
    Patient: {type: mongoose.Schema.ObjectId, ref: 'PatientProfiles'},
    terminated : Boolean

});
var RehabClientLinkSchema = mongoose.model('rehabClientLink', rehabClientLinkSchema);
exports.Model = RehabClientLinkSchema;