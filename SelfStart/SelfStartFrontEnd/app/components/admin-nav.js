import Component from '@ember/component';
import $ from 'jquery';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName:'',
  auth: inject('auth'),
  show: false,
  DS: inject('store'),

  init() {
    this._super(...arguments);
    if(localStorage.getItem('sas-session-id')) {
      var email = this.get('auth').decrypt(localStorage.getItem('sas-session-id'));
      console.log(email);
      var myStore = this.get('store');
      var self = this;
      this.get('DS').queryRecord('adminstrator', {filter: {"email": email}}).then(function (admin) {
        if (admin) {
          self.set('show', true);
        }
      });
    }
  },

  didInsertElement() {
    this._super(...arguments);

    $('body')
      .visibility({
        offset: -10,
        observeChanges: false,
        once: false,
        continuous: false,
        onTopPassed: function () {
          requestAnimationFrame(function () {
            $('.following.bar')
              .addClass('light fixed')
              .find('.menu')
              .removeClass('inverted');
            $('.following .additional.item')
              .transition('scale in', 750);
            $('.selfStart')
              .attr("src",'/assets/images/marcotte-self-start-bodysmartFINAL.png');
          });
        },
        onTopPassedReverse: function () {
          requestAnimationFrame(function () {
            $('.following.bar')
              .removeClass('light fixed')
              .find('.menu')
              .addClass('inverted')
              .find('.additional.item')
              .transition('hide');
            $('.selfStart')
              .attr("src",'/assets/images/home/Header.png');
          });
        }
      })
    ;
  },

  actions: {

  },
});
