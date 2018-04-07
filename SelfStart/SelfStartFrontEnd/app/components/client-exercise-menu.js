import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import moment from 'moment';
export default Component.extend({
  auth: inject('auth'),
  DS: inject('store'),
  routing: inject('-routing'),

  clientData: null,
  exerciseList : Ember.A(),
  init(){
    this._super(...arguments);
    let self = this;
    let eemail = localStorage.getItem('sas-session-id');
    eemail = this.get('auth').decrypt(eemail);
    console.log(eemail);

    self.get('DS').queryRecord('patient', {filter: {'email' : eemail}}).then(function (temp) {

      self.set('clientData', temp);

      temp.get('rehablink').forEach(function (rehab) {
        self.get()
      });
      let dateString = moment(self.get('clientData').get('dateOfBirth'),'DD-MM-YYYY').toISOString().substring(0, 10);
      self.set('selectedDate', dateString);

      let client = self.get('clientData');
      self.get('DS').query('appointment', {filter: {'id' : client.get('id')}}).then(function (obj) {
        obj.forEach(function (temp){
          temp.set('date', moment(temp.get('date')).format('YYYY-MM-DD hh:mm A'));
          self.get('appointmentHistory').pushObject(temp);
        });
      });
    });
  },
});
