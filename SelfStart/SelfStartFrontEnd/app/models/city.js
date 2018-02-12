import DS from 'ember-data';

export default DS.Model.extend({
  // city
  name: DS.attr(),
  provinces: DS.belongsTo('province',{ async: true }), //1 to 1
});
