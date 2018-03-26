import DS from 'ember-data';

export default DS.Model.extend({
  name:DS.attr(),
  description:DS.attr(),
  objectives:DS.attr(),
  authorName:DS.attr(),
  actionSteps:DS.attr(),
  location:DS.attr(),
  sets:DS.attr('Number'),
  reps:DS.attr('Number'),
  duration:DS.attr(),
  multimediaURL:DS.attr(),
  targetDate:DS.attr(),
  images:DS.hasMany('image'),
  exerciseList:DS.hasMany('exercise-list')
  // images:DS.attr()

});
