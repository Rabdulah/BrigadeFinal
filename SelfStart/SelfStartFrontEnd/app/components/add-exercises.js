import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
// import Ember from 'ember';

export default Component.extend({
    DS: inject('store'),

    // didRender() {

    //     this._super(...arguments);
    //     let newObj = this.get('Objective');
    //     this.get('obj').push(newObj);
    // },

    isEditing: false,

    obj: ["sldfskdf"],

    objModel: computed (function() {
        return this.get('obj');
    }),

    actions: {
        addObjective(){
            let newObj = this.get('Objective');
            console.log(this.get("obj"));
            this.get('obj').pushObject(newObj);
        },

        cancel() {
            this.set('isEditing', false);
        },

        addExercise (){
            this.set('isEditing', true);
          },

        submit: function() {
            let exercise = this.get('DS').createRecord('exercise', {
                name:this.get('Name'),
                description:this.get('Description'),
                objectives:this.get('obj'),
                authorName:this.get('AuthName'),
                actionSteps:this.get('ActionSteps'),
                location:this.get('Location'),
                frequency:this.get('Frequency'),
                duration:this.get('Duration'),
                multimediaURL:this.get('MMURL'),
                targetDate:this.get('TargetDate')
                //rehabilitationPlan:this.get('rehabPlan'),
            });

            exercise.save().then(function(){
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
            });
            
            this.set('isEditing', false);
        }   
    }
});
