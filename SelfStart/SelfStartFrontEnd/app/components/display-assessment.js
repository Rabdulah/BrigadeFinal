import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import Ember from "ember";
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),


  modalName: computed(function () {
    return 'viewAnswers' + this.get('model').id;
  }),


  orders:[],
  ans: [],

  questionModel: computed(function () {

  }),

  init() {
    this._super(...arguments);
    // this.get('DS').findAll('form');
    // this.get('DS').findAll('question-order');
    // this.get('DS').findAll('question');
    var self = this;

    this.get('DS').query('answer', {filter: {'test': this.get('assessment').get("id")}}).then((records) => {
      this.get('DS').query('question-order', {filter: {'form': this.get('model').id}}).then((records) => {
        self.set('orders', records.toArray());
      });
      records.forEach((rec) => {
          this.get("ans").push(rec.data);
      });
    });

  //  console.log(this.get('assessment').get("id"));
   
    //console.log(this.get('ans'));
    this.set('onChange', 0);
  },

  actions: {
    openModal: function () {

      $('.ui.' + this.get('modalName') + '.modal').modal({
        // transition: 'horizontal flip',

        // dimmerSettings: { opacity: 0.25 },


        onDeny: () => {
          return true;
        },
      })
        .modal('show');
    },

    // Submit(){
    //   this.get('DS').findRecord('assessment-test', this.get("id")).then((rec)=>{
    //     rec.set("completed", true);
    //     rec.save();
    //   });
    // },
  },
});
