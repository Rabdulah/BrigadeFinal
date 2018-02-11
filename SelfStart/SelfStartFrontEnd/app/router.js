import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('patients');
<<<<<<< HEAD
  this.route('country');
  this.route('province');
  this.route('manage-selections');
  this.route('gender');
  this.route('city');
  this.route('marital-status');
=======
  this.route('admin');
>>>>>>> 37c94cd557b77f422290d0b7444ba4cb8f48a89e
});

export default Router;
