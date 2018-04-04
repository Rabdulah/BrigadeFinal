import Component from '@ember/component';
import Ember from "ember";
import { computed } from '@ember/object';

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
  listModel: [],
  plan: null,
  isPlanSelected: false,
  model: null,

  modalName: computed(function () {
    return 'editAssign' + this.get('plan');
  }),

  rehabModel: computed(function(){
    return this.get('store').findAll('rehabilitationplan' );
  }),

  exerciseModel: Ember.observer('plan', function(){
    this.get('store').query('exercise-list', {filter: {'rehabilitationPlan': this.get('plan')}}).then((exercises) => {

      this.get('listModel').clear();

      exercises.forEach((exe)=>{
        // this.get('listModel').removeObject(exe.get('exercise'));
        this.get('listModel').pushObject(exe.get('exercise'));
      });

    });
  }),

  modelAttributes:

    [{'key': 'sets', 'name': 'Sets', 'dir': 'asc', 'class': 'left aligned two wide column'},
      {'key': 'reps', 'name': 'Reps', 'dir': '', 'class': 'left aligned two wide column'},
      {'key': 'duration', 'name': 'Duration', 'dir': '', 'class': 'left aligned three wide column'},
      {'key': 'name', 'name': 'Exercise', 'dir': '', 'class': 'left aligned five wide column'}],

  plansModel: [],
  INDEX: null,
  queryPath: 'planName',
  scrolledLines: 0,
  disabled: "",


  activeModel: Ember.observer('offset', 'limit', 'sort', 'dir','flagDelete','flagAdd', function () {
    var self = this;
    console.log(this.plansModel);
    this.get('store').query('rehabilitationplan', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
      self.set('plansModel', records.toArray());

    });


  }),

  isSelected: Ember.observer('plan', function () {
    this.set('isPlanSelected', true);

    let client = this.get('model').id;
    let plan = this.get('plan');

    this.get('store').query('rehab-client-link', {filter: {'RehabilitationPlan': plan, 'Patient': client}}).then((update) => {
      console.log(plan);
      console.log(update.content.length);
      if (update.content.length !== 0) {
        this.set('disabled', "disabled");
      } else {
        this.set('disabled', "");
      }
    })
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



    // this.set('listModel', this.get('store').findAll('exercise-list', this.get('planId')));

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

  menusState: "active",


  menus: true,


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
    menusView(){
      this.set('menus', true);
      this.set('menusState', "active");
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
    openModal: function () {
      $('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,

        transition: 'fly down',

        onDeny: () => {
          return true;
        },
        onApprove: () => {
          let plan = this.get('plan');


          var planRecord = this.get('store').peekRecord('rehabilitationplan', plan);
      
          var self = this;

         // var assess = this.get('store').peekRecord('assessment-test', '5ab92c228a4acc04487b157a');
         let test = this.get('store').createRecord('assessment-test', {});
         test.save().then((rec)=> {
         

         let link = this.get('store').createRecord('rehab-client-link', {
          terminated: this.get('plan.terminated'),
          RehabilitationPlan: planRecord,
          Patient: this.get('model'),
          assigned: true,
          assessmentTest: rec,
          //In memory of Ouda
        });

         var peekTest = this.get('store').peekRecord('assessment-test', test.get("id"));
         console.log(peekTest);
         peekTest.set('rehabLink', link)
           link.save().then(()=> {
            peekTest.save();
              this.set('assessmentTest', test)
              $('.ui.' + this.get('modalName') + '.modal').modal('hide');
              this.set('disabled', "disabled");
              
            });
          });
         
        }
      })
        .modal('show');
    },
  }
});
