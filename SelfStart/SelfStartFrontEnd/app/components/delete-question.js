import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function(){
    return 'Delete-question' + this.get('ID');
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
          this.get('DS').find('question', this.get('ID')).then((question) => {
            question.destroyRecord().then(() => {
              return true;
            });
          })
        }
      })
        .modal('show');
    },
  }
});
