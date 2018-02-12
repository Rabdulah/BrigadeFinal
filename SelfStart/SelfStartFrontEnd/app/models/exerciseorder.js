import DS from 'ember-data';

export default DS.Model.extend({
  exercise : DS.belongsTo('exercise'),
  rehabilitation : DS.belongsTo ('assesmentTest'),
  order : DS.attr()
});
