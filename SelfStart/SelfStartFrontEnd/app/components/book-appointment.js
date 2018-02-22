import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),

  tagName: '',

  actions: {



    assignDate (date){
      this.set('selectedDate', date);
    },


    cancel() {
      return true;
    },


  },

});


