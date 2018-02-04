import Component from '@ember/component';

export default Component.extend({

  DS: Ember.inject.service('store'),
  modalName : Ember.computed(function() {
    return 'Delete-rehabplan' + this.get('ID');
  }),

  actions: {
    openModal: function () {
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        detachable: false,
        onDeny: () => {
          return true;
        },

        onApprove: () => {
          this.get('DS').find('rehabilitationplan' , this.get('ID')).then((rehabilitationplan)=>{
            rehabilitationplan.destroyRecord().then(() =>{
              return true;
            });
          })
        }
      })
        .modal('show');
    },
  }
});
