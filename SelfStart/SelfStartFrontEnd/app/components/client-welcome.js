import Component from '@ember/component';

export default Component.extend({
  introValue: "active",
  appointmentValue: "disabled",
  photoValue: "disabled",
  confirmValue: "disabled",

  intro: true,
  appointment: false,
  photo: false,
  confirm: false,

actions: {
  goToPhoto() {
    this.set('introValue', "completed");
    this.set('photoValue', "active");
    this.set('photo', true);
    this.set('intro', false);
  },

  backToIntro() {
    this.set('introValue', "active");
    this.set('photoValue', "");
    this.set('photo', false);
    this.set('intro', true);
  },
  goToAppointment() {
    this.set('photoValue', "completed");
    this.set('appointmentValue', "active");
    this.set('appointment', true);
    this.set('photo', false);
  },
  backToPhoto() {
    this.set('photoValue', "active");
    this.set('appointmentValue', "");
    this.set('photo', true);
    this.set('appointment', false);
  },
  goToConfirm() {
    this.set('confirmValue', "active");
    this.set('appointmentValue', "completed");
    this.set('appointment', false);
    this.set('confirm', true);
  },
  backToAppointment() {
    this.set('appointmentValue', "active");
    this.set('confirmValue', "");
    this.set('confirm', false);
    this.set('appointment', true);
  },
  goToPaypal() {

  },
},

});
