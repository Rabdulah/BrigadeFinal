import Component from '@ember/component';

export default Component.extend({
  occurrences: Ember.A(),


  init() {
    this._super(...arguments);
    
    //random data to see if it works
    this.get('occurrences').pushObject(Ember.Object.create({
      title: "Ouda",
      startsAt: "2018-03-12T17:00:00.000Z",
      endsAt: "2018-03-12T18:00:00.000Z"
    }));

    this.get('occurrences').pushObject(Ember.Object.create({
      title: "Yousef",
      startsAt: "2018-03-14T17:00:00.000Z",
      endsAt: "2018-03-14T18:00:00.000Z"
    }));

    this.get('occurrences').pushObject(Ember.Object.create({
      title: "Yousef Ouda",
      startsAt: "2018-03-13T17:00:00.000Z",
      endsAt: "2018-03-13T18:00:00.000Z"
    }));
  },

  actions: {
    calendarAddOccurrence: function(occurrence) {
      this.get('occurrences').pushObject(Ember.Object.create({
        title: occurrence.get('title'),
        startsAt: occurrence.get('startsAt'),
        endsAt: occurrence.get('endsAt')
      }));

      console.log(JSON.stringify(this.get('occurrences')));
    },

    calendarUpdateOccurrence: function(occurrence, properties, isPreview) {
      occurrence.setProperties(properties);

      if (!isPreview) {
        console.log(JSON.stringify(properties));
      }
    },

    calendarRemoveOccurrence: function(occurrence) {
      this.get('occurrences').removeObject(occurrence);
      console.log(JSON.stringify(occurrence));
    },
  }
});
