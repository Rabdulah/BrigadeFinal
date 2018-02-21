import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
export default Component.extend({

  init: function() {
    this._super();
    // let a = this.get('DS').find('rehabilitationplan', this.get('ID'));
    // console.log(a);
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

    addExercise(oneExercise, eid){
      console.log(oneExercise);

      this.get('DS').find('rehabilitationplan', this.get('ID')). then(function (a) {
        a.get('exercises').pushObject(oneExercise);
        oneExercise.get('rehabilitationplan').pushObject(a);
      });


      this.get('DS').findRecord('rehabilitationplan', this.get('ID')).then((rec) => {
        rec.save().then(()=>{
        });
      });

      this.get('DS').findRecord('exercises', this.get('eid')).then((rec) => {
        rec.save().then(()=>{
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
