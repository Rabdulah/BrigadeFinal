import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),
  selectedphysio : null,
  physios: null,
  appointments_filter: null,
  isEditing: false,
  event : "event-1",

  availablespot: [],



  dragFinishText: false,
  dragStartedText: false,
  dragEndedText: false,
  myObject:{id:1, name:'objectName'},


  weekdate: [],
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
    this.functionA();
  },

  getphysio: computed(function(){
    return this.get('DS').findAll('physiotherapist');
  }),
  didRender() {
    this.functionA();
  },
  functionA() {
      var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
      var transitionsSupported = ($('.csstransitions').length > 0);


      //if browser does not support transitions - use a different event to trigger them
      if (!transitionsSupported)
        transitionEnd = 'noTransition';

      //should add a loding while the events are organized

      function SchedulePlan(element) {
        this.element = element;
        this.timeline = this.element.find('.timeline');
        this.timelineItems = this.timeline.find('li');
        this.timelineItemsNumber = this.timelineItems.length;
        this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
        //need to store delta (in our case half hour) timestamp
        this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems.eq(1).text()) - getScheduleTimestamp(this.timelineItems.eq(0).text());

        this.eventsWrapper = this.element.find('.events');
        this.eventsGroup = this.eventsWrapper.find('.events-group');
        this.singleEvents = this.eventsGroup.find('.single-event');
        this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();

        this.animating = false;

        this.initSchedule();
      }

      SchedulePlan.prototype.initSchedule = function () {
        this.scheduleReset();
        //this.initEvents();
      };

      SchedulePlan.prototype.scheduleReset = function () {
        var mq = this.mq();
        if (mq == 'desktop' && !this.element.hasClass('js-full')) {
          //in this case you are on a desktop version (first load or resize from mobile)
          this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
          this.element.addClass('js-full');
          this.placeEvents();
          // this.element.hasClass('modal-is-open') && this.checkEventModal();
        }
        else if (mq == 'mobile' && this.element.hasClass('js-full')) {
          //in this case you are on a mobile version (first load or resize from desktop)
          this.element.removeClass('js-full loading');
          this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
          this.eventsWrapper.children('.grid-line').remove();
        }

        else {
          this.element.removeClass('loading');
        }
      };

      // SchedulePlan.prototype.initEvents = function () {
      //   var self = this;
      //     this.singleEvents.each(function () {
      //       var durationLabel = '<span class="event-date">' + $(this).data('start') + ' - ' + $(this).data('end') + '</span>';
      //       $(this).children('a').prepend($(durationLabel));
      //     });
      //
      //
      // };

      SchedulePlan.prototype.placeEvents = function () {
        var self = this;
        this.singleEvents.each(function () {
          //place each event in the grid -> need to set top position and height
          var start = getScheduleTimestamp($(this).attr('data-start')),
            duration = getScheduleTimestamp($(this).attr('data-end')) - start;

          var eventTop = self.eventSlotHeight * (start - self.timelineStart) / self.timelineUnitDuration,
            eventHeight = self.eventSlotHeight * duration / self.timelineUnitDuration;

          $(this).css({
            top: (eventTop - 1) + 'px',
            height: (eventHeight + 1) + 'px'
          });
        });

        this.element.removeClass('loading');
      };

      SchedulePlan.prototype.mq = function () {
        //get MQ value ('desktop' or 'mobile')
        var self = this;
        return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
      };

      var schedules = $('.cd-schedule');
      var objSchedulesPlan = [],
        windowResize = false;

      if (schedules.length > 0) {
        schedules.each(function () {
          //create SchedulePlan objects
          objSchedulesPlan.push(new SchedulePlan($(this)));
        });
      }

      $(window).on('resize', function () {
        if (!windowResize) {
          windowResize = true;
          (!window.requestAnimationFrame) ? setTimeout(checkResize) : window.requestAnimationFrame(checkResize);
        }
      });

      $(window).keyup(function (event) {
        if (event.keyCode == 27) {
          objSchedulesPlan.forEach(function (element) {
            element.closeModal(element.eventsGroup.find('.selected-event'));
          });
        }
      });

      function checkResize() {
        objSchedulesPlan.forEach(function (element) {
          element.scheduleReset();
        });
        windowResize = false;
      }

      function getScheduleTimestamp(time) {
        //accepts hh:mm format - convert hh:mm to timestamp
        time = time.replace(/ /g, '');
        var timeArray = time.split(':');
        var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
        return timeStamp;
      }

      function transformElement(element, value) {
        element.css({
          '-moz-transform': value,
          '-webkit-transform': value,
          '-ms-transform': value,
          '-o-transform': value,
          'transform': value
        });
      }
  },


  actions: {
    viewschedule(){
      this.set('isEditing', true);
    },

    updateValue(physio){
      this.set('physios', physio);
      this.set('selectedphysio', this.get('DS').peekRecord('physiotherapist', physio));
      //get associated physiotherapist schedule
      let container = this.get('selectedphysio').get('appointments').filter(function(item){
        let cur_time = new Date();
        cur_time=  cur_time.toISOString();
        return item.get('date') > cur_time;
      });
      //set appointment filter to the container
      this.set('appointments_filter',  container);

    },

    getclient(pid){
      console.log("getlient invoked");
      this.get('DS').findRecord('patient', pid).then(function (src){

        let a = src.get('familyName');
        let b = src.get('givenName');
        console.log(a.toString());
        console.log(b.toString());
        return '';
      });
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

    setslot(slot, date){
      let d = new Date(date);
      switch (slot){
        case 1:
          d.setHours(9,30);
          break;
        case 2:
          d.setHours(12,0);
          break;
        case 3:
          d.setHours(13,30);
          break;
        case 4:
          d.setHours(15,0);
          break;
      }
      let booking = this.get('DS').createRecord('appointment', {
        date: d.toISOString(),
      });
      this.set('event', "event-3");

      this.get('availablespot').push(booking);
    },

    save(){
      let self = this;
      let physio = self.get('physios');

      console.log(physio);
      this.get('DS').find('physiotherapist',physio).then(function (a) {
        self.get('availablespot').forEach(function (e) {
          e.save().then(()=>{
            a.get('appointments').pushObject(e);
            a.save();
          });

        });

      });

    },
  },

});


