import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      assessmentTest: this.store.findAll('assessment-test'),
      question: this.store.findAll('question'),
    });
  },
});
