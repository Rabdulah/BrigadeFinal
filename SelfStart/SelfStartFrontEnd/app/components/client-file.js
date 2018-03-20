import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  store: Ember.inject.service(),

  limit: 10,
  offset: 0,
  pageSize: 10,
  sort: 'planName',
  dir:'',
  query: null,
  flagDelete: false,
  flagAdd: false,

  modelAttributes:

    [{'key': 'planName', 'name':'Plan Name', 'dir' : 'asc', 'class' :'left aligned five wide column'},
     {'key': 'physioID.givenName', 'name':'Author Name', 'dir' : '','class' :'left aligned six wide column'}],

  plansModel: [],
  INDEX: null,
  queryPath: 'planName',
  scrolledLines: 0,



  activeModel: Ember.observer('offset', 'limit', 'sort', 'dir','flagDelete','flagAdd', function () {
    var self = this;
    console.log(this.plansModel);
    this.get('store').query('rehabilitationplan', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
      self.set('plansModel', records.toArray());

    });


  }),

  filterplans: Ember.observer('query', 'queryPath', function () {
    let queryText = this.get('query');
    if (queryText !== null && queryText.length > 0) {
      this.set('regex', "^"+queryText);
    } else {
      this.set('regex', '');
    }

    this.get('store').query('rehabilitationplan', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then((records) => {
      self.set('plansModel', records.toArray());
    });

  }),

  init() {
    this._super(...arguments);
    this.set('limit', 10);
    this.set('offset', 0);
    this.set('pageSize', 10);
    let self = this;

    this.get('store').query('rehabilitationplan', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
      self.set('plansModel', records.toArray());
    });

    // this.get('plansModel').forEach(function (gph) {
    //   self.get('store').findRecord('physiotherapest', gph.get('id')).then(()=>{
    //
    //   })
    // });

  },


  dateFormat: Ember.computed(function(date){
    console.log(date);
    var dateString = date.toISOString().substring(0, 10);
    return dateString;
  }),



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

  clientState: "active",
  practState: "",
  adminState: "",

  terminated: false,


  actions: {
    assign(){
      let assign = self.get('store').createRecord('rehab-client-link', {
        terminated: self.get('terminated'),
        RehabilitationPlan: self.get('RehabilitationPlan'),
        Patient: self.get('Patient'),
      });
      //when save is successfull close form
      rehabplan.save().then(function() {
        return true;
      });
    },
    client(){
      this.set('clientView', true);
      this.set('practView', false);
      this.set('adminView', false);
      this.set('clientState', "active");
      this.set('practState', "");
      this.set('adminState', "");
    },
    pract(){
      this.set('clientView', false);
      this.set('practView', true);
      this.set('adminView', false);
      this.set('clientState', "");
      this.set('practState', "active");
      this.set('adminState', "");
    },
    admin(){
      this.set('clientView', false);
      this.set('practView', false);
      this.set('adminView', true);
      this.set('clientState', "");
      this.set('practState', "");
      this.set('adminState', "active");
    },
    toggleDetail(ID) {

      if (this.get('isShowing') === ID)
        this.set('isShowing', null);
      else
        this.set('isShowing', ID);
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