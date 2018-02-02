import DS from 'ember-data';

export default DS.Model.extend({
  ID: DS.attr(),
  questionText: DS.attr(),
  helpDescription: DS.attr(),
  Order: DS.attr(),
});
