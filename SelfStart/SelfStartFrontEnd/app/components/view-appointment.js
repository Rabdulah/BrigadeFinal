import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),
  isEditing: false,
  selectedclient: null,
  getclient: computed(function(){
    return this.get('DS').findAll('patient');
  }),



  actions: {

    bookAppointment(){
      this.set('isEditing', true);
    },

    cancelbookingappointment(){
      this.set('isEditing', false);
    },
    updateValue(client){
      this.set('selectedclient', client);
    },

  },

});


