import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),

  qNum:0,

  modalName: computed(function () {
    return 'viewAnswers' + this.get('model').id;
  }),



  orders:[],

   questionModel: computed(function () {

   }),

  init(){
    this._super(...arguments);
    this.get('DS').findAll('form');
    this.get('DS').findAll('question-order');
    this.get('DS').findAll('question');
    var self = this;

    this.get('DS').query('question-order', {filter: {'form': this.get('model').id}}).then((records) => {
      self.set('orders', records.toArray());
    });

    // console.log(this.get('model').get('questionOrder'));
    //
    // this.get('model').get('questionOrder').then((rec)=>{
    //   console.log(rec.canonicalState);
    //   var array = rec.canonicalState;
    //   console.log(array);
    //   array.forEach((r)=>{
    //     this.get('questions').pushObject(r);
    //     console.log(r);
    //   })

    //})
    // this.get('DS').query('question-order', {filter: {'form': this.get('model').id}}).then((questions) => {
    //
    //   this.get('formModel').clear();
    //
    //   questions.forEach((q)=>{
    //     // console.log(q.get('question'));
    //     this.get('formModel').pushObject(q.get('question'));
    //   });
    //
    // });
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
