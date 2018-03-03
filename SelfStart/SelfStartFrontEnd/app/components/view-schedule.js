import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  routing: inject('-routing'),
  selectedphysio : null,
  appointments_filter: null,
  isEditing: false,


  getphysio: computed(function(){
    return this.get('DS').findAll('physiotherapist');
  }),

  // selectedphysio: computed(function () {
  //   return this.get('selectedphysio').then(function (physio){
  //     physio.get('appointments').filter(function(item){
  //       let schedule  = item.get('date');
  //       let cur_time = new Date();
  //       console.log(cur_time);
  //       return schedule > cur_time;
  //     });
  //   });
  //
  // }),



  actions: {
    viewschedule(){
      this.set('isEditing', true);
    },

    updateValue(physio){
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
  },

});


