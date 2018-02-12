import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        console.log("dfa");
        return this.store.findAll('question');
       
      }
});
