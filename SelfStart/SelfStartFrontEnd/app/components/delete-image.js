import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  DS: Ember.inject.service('store'),

  modalName : Ember.computed(function() {
    return 'delete-image' + this.get('ID');
  }),

  actions: {
    openModal: function () {
      // console.log(this.get('modalName'));
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        onDeny: () => {
          return true;
        },

        onApprove: () => {
          this.get('DS').find('image' , this.get('ID')).then((image)=>{
            image.destroyRecord().then(() =>{
              return true;
            });
          })
        }
      }).modal('show');
    },
  }

});
