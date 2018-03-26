import Component from '@ember/component';
import Ember from "ember";
import { inject } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  store: Ember.inject.service(),
  router: inject('-routing'),

  limit: 200,
  offset: 0,
  pageSize: 200,
  sort: 'name',
  dir:'',
  query: null,

  exerciseAttributes:
    [{'key': 'name', 'name':'Name', 'dir' : 'asc', 'class' :'left aligned eleven wide column'}],



  menuAttributes:

    [
      {'key': 'sets', 'name':'Sets', 'dir' : 'asc', 'class' :'left aligned two wide column'},
      {'key': 'reps', 'name':'Reps', 'dir' : '','class' :'left aligned two wide column'},
      {'key': 'duration', 'name':'Duration', 'dir' : '','class' :'left aligned three wide column'},
      {'key': 'name', 'name':'Exercise', 'dir' : '','class' :'left aligned five wide column'}],

  exercisesModel: [],
  sortBy: ['name'],
  sortedNames: Ember.computed.sort('exercisesModel','sortBy'),

  currentExercises: Ember.observer('exercisesModel','listModel', function(){
//    return Ember.computed.sort('exercisesModel','sortBy');
  }),

  listModel: [],
  INDEX: null,
  queryPath: 'name',
  scrolledLines: 0,
  flagAdd: false,
  flagDelete: false,



  activeModel: Ember.observer('offset', 'limit', 'sort', 'dir', function () {
    var self = this;
    var a = [], diff = [];

    this.get('store').query('exercise', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {

    //  self.set('exercisesModel', records.toArray());

      function arr_diff (a1, a2) {

        for (var i = 0; i < a1.length; i++) {
          a[a1[i]] = true;
        }

        for (var j = 0; j < a2.length; j++) {
          if (a[a2[j]]) {
            delete a[a2[j]];
          } else {
            a[a2[j]] = true;
          }
        }

        for (var k in a) {
          diff.push(k);
        }

        return diff;
      }

      arr_diff(records.toArray(), self.get('listModel'));

    });

  }),

  // activeAdd: Ember.observer('flagAdd', function () {
  //   this.get('listModel').forEach((rec) => {
  //     rec.set('selectedList', false);
  //   });
  // }),
  //
  // activeRemove: Ember.observer('flagDelete', function () {
  //   this.get('exercisesModel').forEach((rec) => {
  //     rec.set('selected', false);
  //   });
  // }),

  filterexercises: Ember.observer('query', 'queryPath', function () {
    let queryText = this.get('query');
    if (queryText !== null && queryText.length > 0) {
      this.set('regex', "^"+queryText);
    } else {
      this.set('regex', '');
    }

    // this.get('store').query('exercise', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then((records) => {
    //   this.set('exercisesModel', records.toArray());
    // });

    var self = this;
    var a = [];

    this.get('store').query('exercise', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {

      //  self.set('exercisesModel', records.toArray());

      function arr_diff(a1, a2) {
        for (var i = 0; i < a1.length; i++) {
          a[a1[i]] = true;
        }
        for (var j = 0; j < a2.length; j++) {
          if (a[a2[j]]) {
            delete a[a2[j]];
          } else {
            a[a2[j]] = true;
          }
        }
        for (var k in a) {
          self.get('exercisesModel').pushObject(k);
        }

        console.log(self.get('exercisesModel'));
        return self.get('exercisesModel');
      }

      arr_diff(records.toArray(), self.get('listModel'));
    });
  }),

  didRender() {
    this._super(...arguments);

    $(document).ready(function ($) {
      if ($('.floating-labels').length > 0) floatLabels();

      function floatLabels() {
        var inputFields = $('.floating-labels .cd-label').next();
        inputFields.each(function () {
          var singleInput = $(this);
          //check if  is filling one of the form fields
          checkVal(singleInput);
          singleInput.on('change keyup', function () {
            checkVal(singleInput);
          });
        });
      }

      function checkVal(inputField) {
        ( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
      }

    });
  },

  init() {
    this._super(...arguments);
    this.set('limit', 200);
    this.set('offset', 0);
    this.set('pageSize', 200);
    let self = this;

    this.get('store').query('exercise', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
      self.set('exercisesModel', records.toArray());


    //console.log(self.get('exercisesModel'));

      self.get('exercisesModel').forEach((rec)=>{
        rec['selected']  = false;
      })
    });

  },

  didInsertElement: function() {
    this._super(...arguments);
    this.bindScrolling();
    this.bindScrolling2();
  },
  willRemoveElement: function() {
    this._super(...arguments);
    this.unbindScrolling();
    this.unbindScrolling2();
  },
  scrolled: function() {
    if (this.get('scrolledLines') < Ember.$("#exerciseWin").scrollTop()) {
      this.set('scrolledLines', Ember.$("#exerciseWin").scrollTop());
      this.set('limit', this.get('limit') + 10);
    }
  },
  scrolled2: function() {
    if (this.get('scrolledLines') < Ember.$("#listWin").scrollTop()) {
      this.set('scrolledLines', Ember.$("#listWin").scrollTop());
      this.set('limit', this.get('limit') + 10);
    }
  },

  bindScrolling: function() {
    var self = this;
    var onScroll = function() {
      Ember.run.debounce(self, self.scrolled, 500);
    };
    Ember.$("#exerciseWin").bind('touchmove', onScroll);
    Ember.$("#exerciseWin").bind('scroll', onScroll);
  },

  bindScrolling2: function() {
    var self = this;
    var onScroll2 = function() {
      Ember.run.debounce(self, self.scrolled2, 500);
    };
    Ember.$("#listWin").bind('touchmove', onScroll2);
    Ember.$("#listWin").bind('scroll', onScroll2);
  },

  unbindScrolling: function() {
    Ember.$("#exerciseWin").unbind('scroll');
    Ember.$("#exerciseWin").unbind('touchmove');
  },

  unbindScrolling2: function() {
    Ember.$("#listWin").unbind('scroll');
    Ember.$("#listWin").unbind('touchmove');
  },

  actions:{
    sortColumn(columnName, direction) {

      this.get('exerciseAttributes').forEach((element)=>{
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
    add(){
      let self= this;
      let temp = [];
      let count = 0;

      this.get('exercisesModel').forEach((rec)=>{
        if (rec['selected']) {
          temp.pushObject(rec);
        }
        count ++;
      });
      if (count === this.get('exercisesModel').length) {
        temp.forEach((rec)=>{
            rec.set('selectedList', false);
            self.get('listModel').pushObject(rec);
            self.get('exercisesModel').removeObject(rec);
        });
      }


    },
    remove(){
      let self= this;
      let temp = [];
      let count = 0;

      this.get('listModel').forEach((rec)=>{
        if (rec['selectedList']) {
          temp.pushObject(rec);
        }
        count ++;
      });
      if (count === this.get('listModel').length) {
        temp.forEach((rec)=>{
          rec.set('selected', false);
          self.get('exercisesModel').pushObject(rec);
          self.get('listModel').removeObject(rec);
        });
      }
    },

    reorderItems(itemModels, draggedModel) {
      this.set('listModel', itemModels);
      this.set('listModel.justDragged', draggedModel);
    },


    submit(){
      let self = this;

      let rehabilitationplan = this.get('store').createRecord('rehabilitationplan', {
        planName: self.get('planName'),
        description: self.get('description'),
        date: new Date()
      });

     rehabilitationplan.save().then((plan) => {
        this.get('listModel').forEach((rec, i)=>{
          let list = this.get('store').createRecord('exercise-list', {
            order: i+1,
            exercise: rec,
            rehabilitationPlan: plan
          });
          console.log(i);
         list.save();
        });
        //route back
       this.get('router').transitionTo('practitioner.rehabplans');
     });
    },
  }
});
