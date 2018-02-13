import Component from '@ember/component';
// import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Ember from 'ember';

export default Component.extend({
    DS: inject('store'),

    isEditing: false,

    id: null,

    obj: [],

    tempExercise: null,

    actionStep: [],

    actions: {
       
        addActionStep(){
            let newActStep = this.get('ActionSteps');
            this.get('actionStep').pushObject(newActStep);
            this.set('ActionSteps', "");
        },

        addObjective(){
            let newObj = this.get('Objective');
            this.get('obj').pushObject(newObj);
            this.set('Objective', "");
        },

        cancel() {  
            this.set('isEditing', false);
            // this.get('DS').find('exercise' , this.tempExercise.get("ID")).then((exercise)=>{
            //     exercise.destroyRecord().then(() =>{
            //     return true;
            // });
            // this.tempExercise.destroyRecord();
            // this.get('DS').destroyRecord('exercise', this.tempExercise.get('id'));
        },

        addExercise (){
            this.set('isEditing', true);
            this.tempExercise = this.get('DS').createRecord('exercise');
            this.id = this.tempExercise;
          },

        submit: function() {
            let exercise = this.get('DS').createRecord('exercise', {
                name:this.get('Name'),
                description:this.get('Description'),
                objectives:this.get('obj'),
                authorName:this.get('AuthName'),
                actionSteps:this.get('actionStep'),
                location:this.get('Location'),
                frequency:this.get('Frequency'),
                duration:this.get('Duration'),
                multimediaURL:this.get('MMURL'),
                targetDate:this.get('TargetDate')
                //rehabilitationPlan:this.get('rehabPlan'),
            });

            exercise.save().then(function(){
            });
            this.set('Name', "");
            this.set('Description', "");
            this.set('Objective', "");
            this.set('AuthName', "");
            this.set('ActionStep', "");
            this.set('Location', "");
            this.set('Frequency', "");
            this.set('Duration', "");
            this.set('MMURL', "");
            this.set('TargetDate', "");
            this.set("actionStep", []);
            this.set("obj", []);
            this.set('isEditing', false);
        },
        
    }
});
