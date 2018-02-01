import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  DS: inject('store'),

  isEditing: false,

  actions: {
    addPatient (){
      this.set('isEditing', true);
    },

    cancel: function () {
      this.set('isEditing', false);
    },

    submit: function () {

      let self = this;

      let patient = this.get('DS').createRecord('patient', {
        familyName: self.get('familyName'),
        givenName: self.get('givenName'),
        email: self.get('email'),
      });

        patient.save().then(function() {
          this.set('isEditing', false);
      });
      this.set('familyName', '');
      this.set('givenName', '');
      this.set('email', '');
    }
  },

});
