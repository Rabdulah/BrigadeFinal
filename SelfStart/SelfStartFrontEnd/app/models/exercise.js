import DS from 'ember-data';

export default DS.Model.extend({
  name:DS.attr(),
  description:DS.attr(),
  objectives:DS.attr(),
  authorName:DS.attr(),
  actionSteps:DS.attr(),
  location:DS.attr(),
  frequency:DS.attr(),
  duration:DS.attr(),
  multimediaURL:DS.attr(),
  targetDate:DS.attr(),
  image:DS.hasMany('image', {async: true}),
  // rehabilitationPlan:DS.belongsTo('rehabilitationplan',{ async: true })
  rehabilitationplan:DS.hasMany ('rehabilitationplan')
});
