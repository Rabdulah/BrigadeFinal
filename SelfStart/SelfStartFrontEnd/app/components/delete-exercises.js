import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  DS: Ember.inject.service('store'),

  modalName: Ember.computed(function(){
    return 'Delete-exercise' + this.get('ID');
  }),

  actions: {
    openModal: function () {
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closeable: false,
        detachable: false,
        transition: 'fly down',
        onDeny: () => {
          return true;
        },
        onApprove: () => {
          this.get('DS').find('exercise', this.get('ID')).then((exercise) => {
            exercise.destroyRecord().then(() => {
              return true;
            });
          })
        }
      })
        .modal('show');
    },
  }
});
