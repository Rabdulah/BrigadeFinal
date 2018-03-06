import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';
import Ember from "ember";

export default Component.extend({
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
    return this.get('DS').findAll('physiotherapist');
  }),


  didRender() {
    $(document).ready(function ($) {
      var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
      var transitionsSupported = ($('.csstransitions').length > 0);
      //if browser does not support transitions - use a different event to trigger them
      if (!transitionsSupported) transitionEnd = 'noTransition';

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

        this.modal = this.element.find('.event-modal');
        this.modalHeader = this.modal.find('.header');
        this.modalHeaderBg = this.modal.find('.header-bg');
        this.modalBody = this.modal.find('.body');
        this.modalBodyBg = this.modal.find('.body-bg');
        this.modalMaxWidth = 800;
        this.modalMaxHeight = 480;

        this.animating = false;

        this.initSchedule();
      }

      SchedulePlan.prototype.initSchedule = function () {
        this.scheduleReset();
        this.initEvents();
      };

      SchedulePlan.prototype.scheduleReset = function () {
        var mq = this.mq();
        if (mq == 'desktop' && !this.element.hasClass('js-full')) {
          //in this case you are on a desktop version (first load or resize from mobile)
          this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
          this.element.addClass('js-full');
          this.placeEvents();
          this.element.hasClass('modal-is-open') && this.checkEventModal();
        } else if (mq == 'mobile' && this.element.hasClass('js-full')) {
          //in this case you are on a mobile version (first load or resize from desktop)
          this.element.removeClass('js-full loading');
          this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
          this.eventsWrapper.children('.grid-line').remove();
          this.element.hasClass('modal-is-open') && this.checkEventModal();
        } else if (mq == 'desktop' && this.element.hasClass('modal-is-open')) {
          //on a mobile version with modal open - need to resize/move modal window
          this.checkEventModal('desktop');
          this.element.removeClass('loading');
        } else {
          this.element.removeClass('loading');
        }
      };

      SchedulePlan.prototype.initEvents = function () {
        var self = this;

        this.singleEvents.each(function () {
          //create the .event-date element for each event
          var durationLabel = '<span class="event-date">' + $(this).data('start') + ' - ' + $(this).data('end') + '</span>';
          $(this).children('a').prepend($(durationLabel));

          //detect click on the event and open the modal
          // $(this).on('click', 'a', function (event) {
          //   event.preventDefault();
          //   if (!self.animating) self.openModal($(this));
          // });
        });

        //close modal window
        // this.modal.on('click', '.close', function (event) {
        //   event.preventDefault();
        //   if (!self.animating) self.closeModal(self.eventsGroup.find('.selected-event'));
        // });
        // this.element.on('click', '.cover-layer', function (event) {
        //   if (!self.animating && self.element.hasClass('modal-is-open')) self.closeModal(self.eventsGroup.find('.selected-event'));
        // });
      };

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

      // SchedulePlan.prototype.openModal = function (event) {
      //   var self = this;
      //   var mq = self.mq();
      //   this.animating = true;
      //
      //   //update event name and time
      //   this.modalHeader.find('.event-name').text(event.find('.event-name').text());
      //   this.modalHeader.find('.event-date').text(event.find('.event-date').text());
      //   this.modal.attr('data-event', event.parent().attr('data-event'));
      //
      //   //update event content
      //   this.modalBody.find('.event-info').load(event.parent().attr('data-content') + '.html .event-info > *', function (data) {
      //     //once the event content has been loaded
      //     self.element.addClass('content-loaded');
      //   });
      //
      //   this.element.addClass('modal-is-open');
      //
      //   setTimeout(function () {
      //     //fixes a flash when an event is selected - desktop version only
      //     event.parent('li').addClass('selected-event');
      //   }, 10);
      //
      //   if (mq == 'mobile') {
      //     self.modal.one(transitionEnd, function () {
      //       self.modal.off(transitionEnd);
      //       self.animating = false;
      //     });
      //   } else {
      //     var eventTop = event.offset().top - $(window).scrollTop(),
      //       eventLeft = event.offset().left,
      //       eventHeight = event.innerHeight(),
      //       eventWidth = event.innerWidth();
      //
      //     var windowWidth = $(window).width(),
      //       windowHeight = $(window).height();
      //
      //     var modalWidth = (windowWidth * .8 > self.modalMaxWidth) ? self.modalMaxWidth : windowWidth * .8,
      //       modalHeight = (windowHeight * .8 > self.modalMaxHeight) ? self.modalMaxHeight : windowHeight * .8;
      //
      //     var modalTranslateX = parseInt((windowWidth - modalWidth) / 2 - eventLeft),
      //       modalTranslateY = parseInt((windowHeight - modalHeight) / 2 - eventTop);
      //
      //     var HeaderBgScaleY = modalHeight / eventHeight,
      //       BodyBgScaleX = (modalWidth - eventWidth);
      //
      //     //change modal height/width and translate it
      //     self.modal.css({
      //       top: eventTop + 'px',
      //       left: eventLeft + 'px',
      //       height: modalHeight + 'px',
      //       width: modalWidth + 'px',
      //     });
      //     transformElement(self.modal, 'translateY(' + modalTranslateY + 'px) translateX(' + modalTranslateX + 'px)');
      //
      //     //set modalHeader width
      //     self.modalHeader.css({
      //       width: eventWidth + 'px',
      //     });
      //     //set modalBody left margin
      //     self.modalBody.css({
      //       marginLeft: eventWidth + 'px',
      //     });
      //
      //     //change modalBodyBg height/width ans scale it
      //     self.modalBodyBg.css({
      //       height: eventHeight + 'px',
      //       width: '1px',
      //     });
      //     transformElement(self.modalBodyBg, 'scaleY(' + HeaderBgScaleY + ') scaleX(' + BodyBgScaleX + ')');
      //
      //     //change modal modalHeaderBg height/width and scale it
      //     self.modalHeaderBg.css({
      //       height: eventHeight + 'px',
      //       width: eventWidth + 'px',
      //     });
      //     transformElement(self.modalHeaderBg, 'scaleY(' + HeaderBgScaleY + ')');
      //
      //     self.modalHeaderBg.one(transitionEnd, function () {
      //       //wait for the  end of the modalHeaderBg transformation and show the modal content
      //       self.modalHeaderBg.off(transitionEnd);
      //       self.animating = false;
      //       self.element.addClass('animation-completed');
      //     });
      //   }
      //
      //   //if browser do not support transitions -> no need to wait for the end of it
      //   if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
      // };
      //
      // SchedulePlan.prototype.closeModal = function (event) {
      //   var self = this;
      //   var mq = self.mq();
      //
      //   this.animating = true;
      //
      //   if (mq == 'mobile') {
      //     this.element.removeClass('modal-is-open');
      //     this.modal.one(transitionEnd, function () {
      //       self.modal.off(transitionEnd);
      //       self.animating = false;
      //       self.element.removeClass('content-loaded');
      //       event.removeClass('selected-event');
      //     });
      //   } else {
      //     var eventTop = event.offset().top - $(window).scrollTop(),
      //       eventLeft = event.offset().left,
      //       eventHeight = event.innerHeight(),
      //       eventWidth = event.innerWidth();
      //
      //     var modalTop = Number(self.modal.css('top').replace('px', '')),
      //       modalLeft = Number(self.modal.css('left').replace('px', ''));
      //
      //     var modalTranslateX = eventLeft - modalLeft,
      //       modalTranslateY = eventTop - modalTop;
      //
      //     self.element.removeClass('animation-completed modal-is-open');
      //
      //     //change modal width/height and translate it
      //     this.modal.css({
      //       width: eventWidth + 'px',
      //       height: eventHeight + 'px'
      //     });
      //     transformElement(self.modal, 'translateX(' + modalTranslateX + 'px) translateY(' + modalTranslateY + 'px)');
      //
      //     //scale down modalBodyBg element
      //     transformElement(self.modalBodyBg, 'scaleX(0) scaleY(1)');
      //     //scale down modalHeaderBg element
      //     transformElement(self.modalHeaderBg, 'scaleY(1)');
      //
      //     this.modalHeaderBg.one(transitionEnd, function () {
      //       //wait for the  end of the modalHeaderBg transformation and reset modal style
      //       self.modalHeaderBg.off(transitionEnd);
      //       self.modal.addClass('no-transition');
      //       setTimeout(function () {
      //         self.modal.add(self.modalHeader).add(self.modalBody).add(self.modalHeaderBg).add(self.modalBodyBg).attr('style', '');
      //       }, 10);
      //       setTimeout(function () {
      //         self.modal.removeClass('no-transition');
      //       }, 20);
      //
      //       self.animating = false;
      //       self.element.removeClass('content-loaded');
      //       event.removeClass('selected-event');
      //     });
      //   }
      //
      //   //browser do not support transitions -> no need to wait for the end of it
      //   if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
      // }

      SchedulePlan.prototype.mq = function () {
        //get MQ value ('desktop' or 'mobile')
        var self = this;
        return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
      };
      //
      // SchedulePlan.prototype.checkEventModal = function (device) {
      //   this.animating = true;
      //   var self = this;
      //   var mq = this.mq();
      //
      //   if (mq == 'mobile') {
      //     //reset modal style on mobile
      //     self.modal.add(self.modalHeader).add(self.modalHeaderBg).add(self.modalBody).add(self.modalBodyBg).attr('style', '');
      //     self.modal.removeClass('no-transition');
      //     self.animating = false;
      //   } else if (mq == 'desktop' && self.element.hasClass('modal-is-open')) {
      //     self.modal.addClass('no-transition');
      //     self.element.addClass('animation-completed');
      //     var event = self.eventsGroup.find('.selected-event');
      //
      //     var eventTop = event.offset().top - $(window).scrollTop(),
      //       eventLeft = event.offset().left,
      //       eventHeight = event.innerHeight(),
      //       eventWidth = event.innerWidth();
      //
      //     var windowWidth = $(window).width(),
      //       windowHeight = $(window).height();
      //
      //     var modalWidth = (windowWidth * .8 > self.modalMaxWidth) ? self.modalMaxWidth : windowWidth * .8,
      //       modalHeight = (windowHeight * .8 > self.modalMaxHeight) ? self.modalMaxHeight : windowHeight * .8;
      //
      //     var HeaderBgScaleY = modalHeight / eventHeight,
      //       BodyBgScaleX = (modalWidth - eventWidth);
      //
      //     setTimeout(function () {
      //       self.modal.css({
      //         width: modalWidth + 'px',
      //         height: modalHeight + 'px',
      //         top: (windowHeight / 2 - modalHeight / 2) + 'px',
      //         left: (windowWidth / 2 - modalWidth / 2) + 'px',
      //       });
      //       transformElement(self.modal, 'translateY(0) translateX(0)');
      //       //change modal modalBodyBg height/width
      //       self.modalBodyBg.css({
      //         height: modalHeight + 'px',
      //         width: '1px',
      //       });
      //       transformElement(self.modalBodyBg, 'scaleX(' + BodyBgScaleX + ')');
      //       //set modalHeader width
      //       self.modalHeader.css({
      //         width: eventWidth + 'px',
      //       });
      //       //set modalBody left margin
      //       self.modalBody.css({
      //         marginLeft: eventWidth + 'px',
      //       });
      //       //change modal modalHeaderBg height/width and scale it
      //       self.modalHeaderBg.css({
      //         height: eventHeight + 'px',
      //         width: eventWidth + 'px',
      //       });
      //       transformElement(self.modalHeaderBg, 'scaleY(' + HeaderBgScaleY + ')');
      //     }, 10);
      //
      //     setTimeout(function () {
      //       self.modal.removeClass('no-transition');
      //       self.animating = false;
      //     }, 20);
      //   }
      // };

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

      // $(window).keyup(function (event) {
      //   if (event.keyCode == 27) {
      //     objSchedulesPlan.forEach(function (element) {
      //       element.closeModal(element.eventsGroup.find('.selected-event'));
      //     });
      //   }
      // });

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
    })
  },


  actions: {

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

      this.get('DS').findRecord('physiotherapist',physio).then(function (phy) {
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
            self.get('DS').findRecord('physiotherapist',physio).then(function (a) {
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

  },

});


