import DS from 'ember-data';

export default DS.Model.extend({
    question: DS.belongsTo('question',{ async: true }),
    patient: DS.belongsTo('patient',{ async: true }), 
    form: DS.belongsTo('form',{ async: true }), 
    answer: DS.attr(),
});
