import DS from 'ember-data';

export default DS.Model.extend({
    assessTest: DS.belongsTo("assessment-test"),
    answer: DS.attr()
});
