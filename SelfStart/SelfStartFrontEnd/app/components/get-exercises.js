import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
export default Component.extend({

  init: function() {
    this._super();
    let a = this.get('DS').find('rehabilitationplan', this.get('ID'));
    console.log(a);
  },

  DS: inject('store'),


  modalName : computed(function() {
    return 'get-exercises' + this.get('ID');
  }),
  exerciseModel: computed(function(){
    return this.get('DS').findAll('exercise');
  }),

  edit : false,


  actions: {

    addExercise(oneExercise){
      let rehabilitationplan = this.get('DS').find('rehabilitationplan',this.get('ID'));
      let exerciseid = this.get('DS').findRecord('exercise', oneExercise.get('id')).then((rec) => {
        rec.set('rehabilitationplan', rehabilitationplan)
        rec.save().then(()=>{
          return true;
        });
      });
    },

    manageExercise() {
      this.set('edit',true);
    },
    done(){
      this.set('edit',false);
    },

    openModal: function () {
      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closeable: false,
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
  }

});
