var mongoose = require('mongoose');

var RehabClientLink = mongoose.Schema({
    
    RehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'},
    Patient: {type: mongoose.Schema.ObjectId, ref: 'PatientProfiles'},
    terminated : Boolean

});
var RehabClientLinkSchema = mongoose.model('rehabClientLinks', RehabClientLink);
exports.Model = RehabClientLinkSchema;