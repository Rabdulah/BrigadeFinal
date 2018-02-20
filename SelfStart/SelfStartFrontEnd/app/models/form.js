import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    description: DS.attr(),
    author: DS.attr(),
    questions: DS.hasMany('question')
});