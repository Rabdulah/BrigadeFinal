import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            form: this.store.findAll('form'),
            question: this.store.findAll('question'),
            questionOrder: this.store.findAll('question-order'),
          });
      },
    afterModel() {
        this.store.findAll('question')
    }
});
