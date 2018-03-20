import Component from '@ember/component';

export default Component.extend({
    DS: Ember.inject.service('store'),
    formData: null,
    fName: Ember.computed.oneWay('formData.name'),
    fDescription: Ember.computed.oneWay('formData.description'),

    modalName: Ember.computed(function() {
        return 'formData' + this.get('ID');
      }),

      actions: {
        openModal: function () {
        this.set('formData', this.get('DS').peekRecord('form', this.get('ID')));

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
            closeable: false,
            transaction: 'horizontal flip',
            onDeny: () => {
                return true;
            },

            onApprove: () => {
                this.get('DS').findRecord('form', this.get('ID')).then((rec) => {
                    rec.set('name', this.get('fName')),
                    rec.set('description', this.get('fDescription')),
                    rec.save().then(()=>{
                        return true;
            });
          })
        }
      })
        .modal('show');
    },
  }
});
