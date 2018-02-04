import DS from 'ember-data';

export default DS.Model.extend({

  name:DS.attr(),
  description: DS.attr(),
  authorName: DS.attr(),
  goal : DS.attr(),
  timeFrameToComplete: DS.attr(),
  exercises : DS.hasMany('exercise', { async: true }),
  assessmentTests : DS.hasMany ('assesmentTest', { async: true })
});
