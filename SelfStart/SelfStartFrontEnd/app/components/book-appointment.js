import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';


export default Component.extend({
  occurrences: Ember.A(),
  DS: inject('store'),
  routing: inject('-routing'),
  isEditing: false,

  modalName: Ember.computed(function(){
    return 'Manage-form' + this.get('ID');
  }),
  phyidget: null,
  selectedappointment: null,

  physioPicked : false,
  appointmentsN: [],
  weekdate: [],
  block: {
    fulldate: null,
    date: null,
    datastart: null,
    dataend: null,
    dataevent: "event-3",
    appointmentid: null,
  },
  blocks: [],

  dragFinishText: false,
  dragStartedText: false,
  dragEndedText: false,
  myObject:{id:1, name:'objectName'},


  init: function() {
    this._super();
    let d = new Date();
    for (let i =0; i < d.getDay(); i++){
      let result = new Date();
      result.setDate(result.getDate() + -d.getDay());
      this.get('weekdate')[i] = result.toDateString();
    }
    this.get('weekdate')[d.getDay()] = d.toDateString();
    for (let i =d.getDay(); i < 6; i++){
      let result = new Date();
      result.setDate(d.getDate()+i);
      this.get('weekdate')[i+1] = result.toDateString();
    }

  },

  getphysio: computed(function(){
    return this.get('DS').findAll('physiotherapest');
  }),


  init() {
    this._super(...arguments);

    //random data to see if it works
    this.get('occurrences').pushObject(Ember.Object.create({
      title: "Ouda",
      startsAt: "2018-03-12T17:00:00.000Z",
      endsAt: "2018-03-12T18:00:00.000Z"
    }));

    this.get('occurrences').pushObject(Ember.Object.create({
      title: "Yousef",
      startsAt: "2018-03-14T17:00:00.000Z",
      endsAt: "2018-03-14T18:00:00.000Z"
    }));

    this.get('occurrences').pushObject(Ember.Object.create({
      title: "Yousef Ouda",
      startsAt: "2018-03-13T17:00:00.000Z",
      endsAt: "2018-03-13T18:00:00.000Z"
    }));
  },

  actions: {
    calendarAddOccurrence: function(occurrence) {
      this.get('occurrences').pushObject(Ember.Object.create({
        title: occurrence.get('title'),
        startsAt: occurrence.get('startsAt'),
        endsAt: occurrence.get('endsAt')
      }));

      console.log(JSON.stringify(this.get('occurrences')));
    },

    calendarUpdateOccurrence: function(occurrence, properties, isPreview) {
      occurrence.setProperties(properties);

      if (!isPreview) {
        console.log(JSON.stringify(properties));
      }
    },

    calendarRemoveOccurrence: function(occurrence) {
      this.get('occurrences').removeObject(occurrence);
      console.log(JSON.stringify(occurrence));
    },
    saveappointment(){
      console.log("saving form");
      let self = this;
      //temp client until we get token
      let client = '5a80e1663ddc7324643209cd';
      //let client = '5a88738e1f0fdc2b94498e81';
      let physio = self.get('selectphysio');
      console.log(physio);
      // let booking = this.get('DS').findRecord('appointment',this.get('appointmentid').
      self.set('isEditing', false);
    },
    openModal: function (obj) {
      this.set('selectedappointment',obj);
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closeable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          return true;
        }
      })
        .modal('show');

    },

    bookAppointment(){
      this.set('isEditing', true);
    },

    cancelbookingappointment(){
      this.set('Reason', '');
      this.set('Other', '');
      this.set('selectedDate', '');
      this.set('isEditing', false);
    },


    updateValue(physio){

      let self = this;
      this.set('selectphysio', physio);

      this.get('DS').findRecord('physiotherapest',physio).then(function (phy) {
        self.set('phyidget', phy);
        phy.get('appointments').forEach(function (e) {
          self.get('appointmentsN').pushObject(e);
        });

        self.get('appointmentsN').forEach(function (e) {
          let containeddate = e.get('date');
          let container = new self.get('block');
          let min90 = new Date(containeddate);
          container.fulldate = min90;
          container.date= min90.toDateString();
          container.datastart = min90.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          min90.setMinutes(min90.getMinutes() + 90);
          container.dataend=  min90.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          if (!(e.get('patient').get('id') == null)){
            container.dataevent = "event-1";
          }
          else {
            container.dataevent = "event-3";
          }
          container.appointmentid =  e.get('id');
          self.get('blocks').pushObject(container);
        });
      });




      this.set('physioPicked', true);

    },
    assignDate (date){
      this.set('selectedDate', date);
    },

    cancel() {
      return true;
    },
    prev() {
      let newcont =[];
      let counter =0;
      this.get('weekdate').forEach(function (e) {
        let result = new Date(e);
        result.setDate(result.getDate() - 7);
        newcont[counter++] = result.toDateString();
      });
      this.get('weekdate').replace(0,7,newcont);
    },
    next() {
      let newcont =[];
      let counter =0;
      this.get('weekdate').forEach(function (e) {
        let result = new Date(e);
        result.setDate(result.getDate() + 7);
        newcont[counter++] = result.toDateString();
      });
      this.get('weekdate').replace(0,7,newcont);
    },


    save: function () {
      let self = this;
      //temp client until we get token
      let client = '5a80e1663ddc7324643209cd';
      //let client = '5a88738e1f0fdc2b94498e81';
      let physio = self.get('selectphysio');
      console.log(physio);
      let booking = this.get('DS').createRecord('appointment', {
        reason: self.get('Reason'),
        other: self.get('Other'),
        date: self.get('selectedDate'),
      });

      this.get('DS').findRecord('patient', client).then(function (src) {
        booking.set('patient', src);
        src.get('appointments').pushObject(booking);
        booking.save().then(function (){
          console.log(booking);
          src.save().then(()=>{
            self.get('DS').findRecord('physiotherapest',physio).then(function (a) {
              a.get('appointments').pushObject(booking);
              a.save().then(()=>{
                self.set('Reason', '');
                self.set('Other', '');
                self.set('selectedDate', '');
                self.set('isEditing', false);
              });
            });
          });
        });


      });
      // this.get('DS').findRecord('patient', client).then(function (src) {
      //   booking.set('patient', src);
      // });
      // booking.save().then(() =>{
      //   console.log(booking);
      //   this.get('DS').findRecord('patient', client). then(function (a) {
      //     a.get('appointments').pushObject(booking);
      //     a.save().then(()=>{
      //     });
      //   });
      //
      //   this.get('DS').findRecord('physiotherapist', self.get('selectphysio')). then(function (a) {
      //     a.get('appointments').pushObject(booking);
      //     a.save().then(()=>{
      //     });
      //   });
      //
      //
      //   this.set('Reason', '');
      //   this.set('Other', '');
      //   this.set('selectedDate', '');
      //   //this.get('routing').transitionTo('patients');
      // });
    },

    dragResult: function(obj,ops) {
      this.set('dragFinishText', ops.target.resultText);
      console.log('Content of draggable-object :',obj);
    },
    dragStart: function() {
      this.set('dragEndedText', false);
      this.set('dragStartedText','Drag Has Started');
    },
    dragEnd: function() {
      this.set('dragStartedText', false);
      this.set('dragEndedText','Drag Has Ended');
    },
    draggingOverTarget: function() {
      console.log('Over target');
    },
    leftDragTarget: function() {
      console.log('Off target');
    }
  }
});
