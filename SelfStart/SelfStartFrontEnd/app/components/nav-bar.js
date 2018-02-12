import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  tagName:'',

  init() {
    this._super(...arguments);
    $('.ui.sidebar').sidebar('attach events', '#mobile_item');
  },

  actions: {
    toggle: function () {
      $('.ui.sidebar').sidebar( 'toggle');
    }
  }
});
