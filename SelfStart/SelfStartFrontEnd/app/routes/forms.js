import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        console.log("sa");
        return RSVP.hash({
            form: this.store.findAll('form'),
            question: this.store.findAll('question'),
          });
      }
});
