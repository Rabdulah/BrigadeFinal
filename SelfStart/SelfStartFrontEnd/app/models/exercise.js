import DS from 'ember-data';

export default DS.Model.extend({
  name:DS.attr(),
  description:DS.attr(),
  objectives:DS.attr(), //dont need, instead notes
  authorName:DS.attr(),
  actionSteps:DS.attr(), //instructions
  location:DS.attr(), //dont need
  sets:DS.attr('Number'),
  reps:DS.attr('Number'),
  duration:DS.attr(),
  multimediaURL:DS.attr(),
  images:DS.hasMany('image'),
  exerciseList:DS.hasMany('exercise-list'),
  // images:DS.attr()



  frequency:DS.attr(), //dont need
  dateCreated:DS.attr(),
  play:DS.attr()
  // rehabilitationPlan:DS.belongsTo('rehabilitationplan',{ async: true })

});
