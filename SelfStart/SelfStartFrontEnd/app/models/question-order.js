import DS from 'ember-data';

export default DS.Model.extend({
    question: DS.belongsTo('question'),
    form: DS.belongsTo('form'),
    order: DS.attr()
});
