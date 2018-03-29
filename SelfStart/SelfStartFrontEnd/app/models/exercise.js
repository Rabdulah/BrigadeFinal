import DS from 'ember-data';

export default DS.Model.extend({
    name:DS.attr(),
    description:DS.attr(),
    objectives:DS.attr(),
    authorName:DS.attr(),
    actionSteps:DS.attr(),
    location:DS.attr(),
    durationMinute:DS.attr(),
    durationSecond:DS.attr(),
    multimediaURL:DS.attr(),
    targetDate:DS.attr(),
    images:DS.hasMany('image'),
    dateCreated:DS.attr(),
    sets:DS.attr(),
    reps:DS.attr(),
    notes:DS.attr()
    // rehabilitationPlan:DS.belongsTo('rehabilitationplan',{ async: true })
    // images:DS.attr()
});
