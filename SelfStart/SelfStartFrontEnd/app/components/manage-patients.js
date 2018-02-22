import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  store: Ember.inject.service(),


  limit: 10,
  offset: 0,
  pageSize: 10,
  sort: 'firstName',
  dir:'',
  givenNameDir: '',
  familyNameDir: '',
  emailDir: '',
  phoneNumberDir: '',
  addressDir: '',
  query: null,
  flagDelete: false,
  modelAttributes: [{'key': 'givenName', 'name':'First Name'},
    {'key': 'familyName', 'name':'Last Name'},
    {'key': 'address', 'name':'Address'},
    {'key': 'email', 'name':'Email'},
    {'key': 'phoneNumber', 'name':'Phone Number'}],
  patientsModel: [],
  INDEX: null,
  queryPath: 'firstName',
  scrolledLines: 0,



  activeModel: Ember.observer('offset', 'limit', 'sort', 'dir','flagDelete', function () {
    var self = this;

    this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir'])).then(function (records) {
      self.set('patientsModel', records.toArray());

    });
  }),

  filterpateints: Ember.observer('query', function () {
    let text = this.get('query');
    let result = [];
    if (text !== '') {
      this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir'])).then((records) => {
        result = records.filter((m) => {
          return m.get(this.get('queryPath')).toLowerCase().includes(text.toLowerCase());
        });
        this.set('patientsModel', result);
      });
    } else {
      this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir'])).then((records) => {
        this.set('patientsModel', records);
      });
    }
  }),



  init() {
    this._super(...arguments);
    this.set('limit', 10);
    this.set('offset', 0);
    this.set('pageSize', 10);
    let self = this;
    //  this.set('modelAttributes', Object.keys(this.get('store').createRecord('patient').toJSON()));
    this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir'])).then(function (records) {
      self.set('patientsModel', records.toArray());

    });
  },

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
      let dir = `${columnName}Dir`;

      let sorted = this.get('patientsModel').sortBy(columnName);
      this.get('modelAttributes').forEach((d)=>{
        this.set(d.key+'Dir', '');
      });

      if (direction === 'asc') {
        this.set(dir, 'desc');
      } else {
        sorted =  sorted.reverse();
        this.set(dir, 'asc');
      }

      this.set('patientsModel', sorted);
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
