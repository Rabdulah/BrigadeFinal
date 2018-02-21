import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  DS: inject('store'),
  actions:{
    removeExercise(exercise, rehabplan , eid, rid){

      console.log(exercise.id);
      console.log(rehabplan.id);

      rehabplan.get('exercises').removeObject(exercise);
      exercise.get('rehabilitationplan').removeObject(rehabplan);


      this.get('DS').findRecord('rehabilitationplan', rid).then((rec) => {

        rec.save().then(()=>{
        });
      });

      this.get('DS').findRecord('exercise',eid).then((rec) => {
        rec.save().then(()=>{
        });
      });
    }




  },
});
