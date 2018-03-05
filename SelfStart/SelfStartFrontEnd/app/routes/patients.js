import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({


  model() {
    return this.store.findAll('patient');
  },
  // model() {
  //   return RSVP.hash({
  //     appointments: this.store.findAll('appointment'),
  //     patient : this.store.findAll('patient'),
  //   });
  // },
});
