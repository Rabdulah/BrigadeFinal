import DS from 'ember-data';
// import ActiveModelAdapter from 'active-model-adapter';  
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend({
  // namespace: 'api/v1',
  host: 'http://localhost:8082'
});
