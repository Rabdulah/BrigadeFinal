import Component from '@ember/component';
// import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Ember from 'ember';
import fileObject from "../utils/file-object";

export default Component.extend({
    DS: inject('store'),

    // ImageName: null,
    model: 'image',
    flag: null,
    accept: 'audio/*,video/*,image/*',
    multiple: true,
    queue: [],
    savingInProgress: false,
    isEditing: false,
    id: null,
    
    labelArray: [
        'height: 6.25em',
        'line-height: 5.25em',
        'text-align: center',
    ],
    
    inputStyle: Ember.computed(function () {
        let style_array = [
          'opacity: 0',
          'width:100% !important',
          'overflow:hidden',
          'position:relative',
          'left:-100%',
          'display:block',
        ];
        return Ember.String.htmlSafe(style_array.join(';'));
    }),
    
    labelStyle: Ember.computed('labelArray', function () {
        return Ember.String.htmlSafe(this.get('labelArray').join(';'));
    }),
    
    dragLeave: function (event) {
        event.preventDefault();
        this.set('labelArray', [
          'height: 6.25em',
          'line-height: 5.25em',
          'text-align: center',
        ]);
        return this.set('dragClass', 'deactivated');
    },
    
    dragOver: function () {
        this.set('labelArray', [
          'height: 6.25em',
          'line-height: 5.25em',
          'text-align: center',
          'background: green',
        ]);
    },
    
    drop: function () {
        this.set('labelArray', [
          'height: 6.25em',
          'line-height: 5.25em',
          'text-align: center',
        ]);
    },

    obj: [],

    actionStep: [],

    actions: {
        selectFile: function (data) {
            if (!Ember.isEmpty(data.target.files)) {
                for (let i = data.target.files.length - 1; i >= 0; i--) {
                    let file = fileObject.create({
                    fileToUpload: data.target.files[i],
                    maximumFileSize: 6
                    });
                this.get('queue').pushObject(file);
              }
            }
        },
        
        deleteFile: function (file) {
            this.get('queue').removeObject(file);
            if (Ember.isEmpty(this.get('queue'))) {
              this.set('flag', false);
            }
        },

        done: function () {
            this.get('queue').clear();
            this.set('flag', false);
        },

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
            // this.exerciseData = this.get('DS').createRecord('exercise', {
            //     name:this.get('Name'),
            //     description:this.get('Description'),
            //     objectives:this.get('obj'),
            //     authorName:this.get('AuthName'),
            //     actionSteps:this.get('actionStep'),
            //     location:this.get('Location'),
            //     frequency:this.get('Frequency'),
            //     duration:this.get('Duration'),
            //     multimediaURL:this.get('MMURL'),
            //     targetDate:this.get('TargetDate')
            // });

            // this.exerciseData.save().then(function(){
                // id = tempExer._internalModel.id;
            // });
            // console.log(this.tempExercise._internalModel);
            // console.log(this.id);
            // console.log(this.id);
            // this.tempExercise.save();
          },

        submit: function() {
            // this.get('DS').findRecord('exercise', this.exerciseData).then((rec)=>{
            //     rec.set('name', this.get('Name'));
            //     rec.set('description', this.get('Description'));
            //     rec.set('authorName', this.get('AuthName'));
            //     rec.set('objective', this.get('Objective'));
            //     rec.set('actionStep', this.get('ActionSteps'));
            //     rec.set('location', this.get('Location'));
            //     rec.set('frequency', this.get('Frequency'));
            //     rec.set('duration', this.get('Duration'));
            //     rec.set('targetDate', this.get('TargetDate'));
            //     rec.set('MMURL', this.get('MMURL'));
            //     // rec.set('exercises', this.get('exercises'));
            //     // rec.set('assessmentTests', this.get('assessmentTests'));
            //     rec.save().then(()=>{
            //       return true;
            //     });
            // });

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
                targetDate:this.get('TargetDate'),
                image: this.get('queue')
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
