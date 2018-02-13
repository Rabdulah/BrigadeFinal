import DS from 'ember-data';

export default DS.Model.extend({
  questionText: DS.attr(),
  helpDescription: DS.attr(),
  Order: DS.attr('number'),
  type: DS.attr(),
  optionNumber: DS.attr('number'),
  optionString: DS.attr(),
  questionOrder: DS.hasMany('question-order')
});
