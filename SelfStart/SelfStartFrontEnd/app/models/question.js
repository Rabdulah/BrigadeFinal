import DS from 'ember-data';

export default DS.Model.extend({
  questionText: DS.attr(),
  helpDescription: DS.attr(),
  Order: DS.attr('number'),
  type: DS.attr(),
  optionNumber: DS.attr('number'),
  optionString: DS.attr(),
  mc:DS.attr('boolean'),
  sa:DS.attr('boolean'),
  tf:DS.attr('boolean'),
  ra:DS.attr('boolean'),
  answers:DS.hasMany('answer'),
  forms: DS.hasMany('form')
});
