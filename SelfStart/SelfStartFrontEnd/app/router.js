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
  this.route('rehab-form');
=======
  this.route('rehabplans');
<<<<<<< HEAD
>>>>>>> jk
=======
  this.route('admin');
  this.route('questions');
  this.route('forms');
>>>>>>> jk
});

export default Router;
