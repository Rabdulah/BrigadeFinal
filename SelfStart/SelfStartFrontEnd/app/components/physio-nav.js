import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  tagName:'',

  init() {
    this._super(...arguments);

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
