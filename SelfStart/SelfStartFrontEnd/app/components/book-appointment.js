import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';
import moment from 'moment';


export default Component.extend({
  occurrences: Ember.A(),
  availableSpot: Ember.A(),
  removedSpot: Ember.A(),

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


  getphysio: computed(function(){
    return this.get('DS').findAll('physiotherapest');
  }),


  init() {
    this._super(...arguments);
  },

  actions: {
    calendarAddOccurrence: function(occurrence) {
      // this.get('occurrences').pushObject(Ember.Object.create({
      //   title: occurrence.get('title'),
      //   startsAt: occurrence.get('startsAt'),
      //   endsAt: occurrence.get('endsAt')
      // }));
      //
      // console.log(JSON.stringify(this.get('occurrences')));
    },

    calendarUpdateOccurrence: function(occurrence, properties, isPreview) {
      // occurrence.setProperties(properties);
      //
      // if (!isPreview) {
      //   console.log(JSON.stringify(properties));
      // }
      console.log(JSON.stringify(occurrence));
    },

    calendarRemoveOccurrence: function(occurrence) {
      // this.get('occurrences').removeObject(occurrence);
      // console.log(JSON.stringify(occurrence));
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
      this.set('occurrences', Ember.A());
      this.set('removedSpot', Ember.A());

      let home= this;
      //save physioid
      this.set('selectedPhysioId', physio);
      //get record of selected physiotherapist
      this.get('DS').findRecord('physiotherapest', physio).then(function (phy){
        //might not need this
        home.set('selectedphysio', phy);
        //get each appointment by  physiotherapist appointment
        phy.get('appointments').forEach( function(obj){
          let curid = obj.get('id');
          home.get('DS').findRecord('appointment',curid).then(function (app) {
            let scheduledDate = moment(app.get('date'));
            let endDate = moment(app.get('endDate'));
            //filter out any appointments that is previous to current date
            if (scheduledDate > moment()) {
              console.log(app.get('reason'));
              if (app.get('reason')==null) {
                home.get('occurrences').pushObject(Ember.Object.create({
                  title: "Book Appointment",
                  startsAt: scheduledDate.toISOString(),
                  endsAt: endDate.toISOString(),
                  tempid : app.get('id')
                }));
              }
            }
          });
        });
      });
    },
    assignDate (date){
      this.set('selectedDate', date);
    },

    cancel() {
      return true;
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

    },
  }
});
