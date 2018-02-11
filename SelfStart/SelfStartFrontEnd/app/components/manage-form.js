import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  DS: Ember.inject.service('store'),

  modalName: Ember.computed(function(){
  return 'Manage-form' + this.get('ID');
}),

actions: {
  openModal: function () {
    Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
      closeable: false,
      detachable: false,
      onDeny: () => {
        return true;
      },
      onApprove: () => {
        this.get('DS').find('form', this.get('ID')).then((form) => {
          form.destroyRecord().then(() => {
            return true;
          });
        })
      }
    })
      .modal('show');
  },
}
});
