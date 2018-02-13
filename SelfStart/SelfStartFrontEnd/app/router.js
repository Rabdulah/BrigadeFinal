import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('patients');
  this.route('rehabplans');

  this.route('admin');

  this.route('questions');

  this.route('forms');

  this.route('country');
  this.route('province');
  this.route('manage-selections');
  this.route('gender');
  this.route('city');
  this.route('marital-status');

  this.route('update-patient',  { path: 'patient/:patient_id'});
  this.route('new-patient');
  this.route('new-rehabplans');
});

export default Router;
