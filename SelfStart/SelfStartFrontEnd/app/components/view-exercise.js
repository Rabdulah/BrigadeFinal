import Component from '@ember/component';

export default Component.extend({
  DS: Ember.inject.service('store'),


  openModal: function () {
    Ember.$('.ui.viewExercise.modal').modal({
      closable: false,
      detachable: false,

      onDeny: () => {
        return true;
      },

      onApprove: () => {
        return true;
      }
    })
      .modal('show');
  },
});
