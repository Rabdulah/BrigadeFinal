import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      appointments: this.store.findAll('appointment'),
      physiotherapist : this.store.findAll('physiotherapist'),
    });
  },

  // afterModel(){
  //   return this.store.findAll('physiotherapist');
  // }
});
