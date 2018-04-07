import Component from '@ember/component';
import Ember from "ember";
import moment from 'moment';

export default Component.extend({
  store: Ember.inject.service(),


  limit: 10,
  offset: 0,
  pageSize: 10,
  sort: 'givenName',
  dir:'',
  query: null,
  flagDelete: false,

  modelAttributes:
    [{'key': 'givenName', 'name':'First Name', 'dir' : 'asc', 'class' :'left aligned three wide column'},
      {'key': 'familyName', 'name':'Last Name', 'dir' : '','class' :'left aligned three wide column'},
      {'key': 'dateOfBirth', 'name':'Date of Birth', 'dir' : '','class' :'left aligned three wide column'},
      // {'key': 'address', 'name':'Address'},
      {'key': 'email', 'name':'Email', 'dir' : '','class' :'left aligned four wide column'}],
    // {'key': 'phoneNumber', 'name':'Phone Number'}],

  patientsModel: [],
  INDEX: null,
  queryPath: 'givenName',
  scrolledLines: 0,




  activeModel: Ember.observer('offset', 'limit', 'sort', 'dir','flagDelete', function () {
    var self = this;

    this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
      self.set('patientsModel', records.toArray());

    });
  }),

  filterpateints: Ember.observer('query', 'queryPath', function () {
    let queryText = this.get('query');
    if (queryText !== null && queryText.length > 0) {
      this.set('regex', "^"+queryText);
    } else {
      this.set('regex', '');
    }

    this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then((records) => {
      this.set('patientsModel', records.toArray());
    });
  }),

  init() {
    this._super(...arguments);
    this.set('limit', 10);
    this.set('offset', 0);
    this.set('pageSize', 10);
    let self = this;
    //  this.set('modelAttributes', Object.keys(this.get('store').createRecord('patient').toJSON()));
    this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
      records.forEach( function (patient){
        patient.set('dateOfBirth', moment(patient.get('dateOfBirth')).format('DD/MM/YYYY'));
      });
      self.set('patientsModel', records.toArray());

    });

  },


  // dateFormat: Ember.computed(function(date){
  //   console.log(date);
  //   var dateString = moment(date).toISOString();
  //   return dateString;
  // }),



  didInsertElement: function() {
    this._super(...arguments);
    this.bindScrolling();
  },
  willRemoveElement: function() {
    this._super(...arguments);
    this.unbindScrolling();
  },
  scrolled: function() {
    if (this.get('scrolledLines') < Ember.$("#myWindow").scrollTop()) {
      this.set('scrolledLines', Ember.$("#myWindow").scrollTop());
      this.set('limit', this.get('limit') + 10);
    }
  },

  bindScrolling: function() {
    var self = this;
    var onScroll = function() {
      Ember.run.debounce(self, self.scrolled, 500);
    };
    Ember.$("#myWindow").bind('touchmove', onScroll);
    Ember.$("#myWindow").bind('scroll', onScroll);
  },

  unbindScrolling: function() {
    Ember.$("#myWindow").unbind('scroll');
    Ember.$("#myWindow").unbind('touchmove');
  },

  actions: {
    toggleDetail(ID) {

      if (this.get('isShowing') === ID)
        this.set('isShowing', null);
      else
        this.set('isShowing', ID);
    },

    editpatient(ID) {
      if (this.get('isEditing') === ID)
        this.set('isEditing', null);
      else
        this.set('isEditing', ID);
    },

    sortColumn(columnName, direction) {

      this.get('modelAttributes').forEach((element)=>{
        if (element.key === columnName) {
          if (direction === 'asc') {
            Ember.set(element, 'dir', 'desc');
            this.set('dir', 'desc');

          }
          else if (direction === 'desc') {
            Ember.set(element, 'dir', 'asc');
            this.set('dir', 'asc');

          } else {
            Ember.set(element, 'dir', 'asc');
            this.set('dir', 'asc');

          }
        }
        else
          Ember.set(element, 'dir', '');
      });
      this.set('sort', columnName);
    },

    loadNext: function () {
      this.set('offset', this.get('offset') + this.get('pageSize'));
    },

    loadPrevious: function () {
      if (this.get('offset') >= this.get('pageSize')) {

        this.set('offset', this.get('offset') - this.get('pageSize'));

      }
    },
  }
});
