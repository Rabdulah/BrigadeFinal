import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('patients');
  this.route('province');
  this.route('manage-selections');
  this.route('city');
  this.route('update-patient', { path: 'patient/:patient_id'});
  this.route('new-patient');
  this.route('appointment');
  this.route('patient-file');
  this.route('admin', function() {});
});

export default Router;
