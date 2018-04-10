import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Component.extend({
  router: service(),
  DS: Ember.inject.service('store'),
  auth: inject('auth'),
  open:false,
  notOpen:true,
  linker: null,
  form: null,
  orders:[],
  ans:[],
  assessment: null,

  assessmentModel: Ember.computed(function(){
    let eemail = localStorage.getItem('sas-session-id');
    eemail = this.get('auth').decrypt(eemail);
    console.log(eemail);

    var self = this;
    self.get('DS').queryRecord('patient', {filter: {'email' : eemail}}).then(function (temp) {
      console.log(temp.id);
      self.get('DS').queryRecord('assessment-test', {filter: {'patient': temp.id}}).then(function (rec) {
        console.log(rec);
        return rec;
      })
    })
  }),

  init() {
    this._super(...arguments);
    let self = this;
    let eemail = localStorage.getItem('sas-session-id');
    eemail = this.get('auth').decrypt(eemail);
    console.log(eemail);

    self.get('DS').queryRecord('patient', {filter: {'email' : eemail}}).then(function (temp){
      console.log(temp.id);
      self.get('DS').queryRecord('assessment-test', {filter: {'patient' : temp.id}}).then(function (rec){
        self.set("assessment", rec);
        console.log(rec);
        console.log(rec.get("form").get("id"));
         self.get('DS').query('question-order', {filter: {'form':rec.get('form').get("id") }}).then((records) => {
           records.forEach((r) => {
             self.get('orders').pushObject(r);
           });
         });
        self.get('DS').query('answer', {filter: {'test':rec.get('id')}}).then((records) => {
          console.log(records);
          self.set('ans', records.toArray());
        });
      });
    });
  },

  actions:{
    Open(){
      this.set("open", true);
      this.set("notOpen",false);
    },
  }
});
