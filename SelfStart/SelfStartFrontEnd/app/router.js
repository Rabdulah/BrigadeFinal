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
  this.route('rehabplans');
=======
  this.route('admin');
>>>>>>> master
});

export default Router;
