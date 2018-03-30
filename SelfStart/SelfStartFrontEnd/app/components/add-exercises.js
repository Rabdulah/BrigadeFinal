import Component from '@ember/component';
import { inject } from '@ember/service';
import Ember from 'ember';
import fileObject from "../utils/file-object";
import moment from 'moment';

export default Component.extend({
    DS: inject('store'),
    cbState: false,
    temp: [],
    model: 'image',
    flag: null,
    accept: 'audio/*,video/*,image/*',
    multiple: true,
    queue: [],
    modelQueue: [],
    savingInProgress: false,
    isEditing: false,
    id: null,

    modalName: Ember.computed(function () {
        return 'add-exercise' + this.get('id');
    }),

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

        cancel() {  
            this.set('isEditing', false);
        },

        addExercise (){
            this.set('isEditing', true);
        },

        submit: function() {
            console.log(this.get("DurationMinute"))
            console.log(this.get("DurationSecond"))
            let dur = "" + this.get("DurationMinute") + ":" + this.get("DurationSecond")
            
            console.log(dur);
            let date = moment().format("MMM Do YY");
            let exercise = this.get('DS').createRecord('exercise', {
                name:this.get('Name'),
                description:this.get('Description'),
                authorName:this.get('AuthName'),
                actionSteps:this.get('actionStep'),
                sets:this.get('Sets'),
                reps:this.get("Reps"),
                durationMinute:this.get("DurationMinute"),
                durationSecond:this.get("DurationSecond"),
                multimediaURL:this.get('MMURL'),
                images: [],
                notes: this.get("Notes"),
                dateCreated: date
            });

            console.log(this.queue);
            let self = this;
            let secQueue = [];
            let secQueue2 = [];

            this.queue.forEach(file => {
                secQueue.pushObject(file);
            });
            
            this.get('temp').forEach(function(obj) {
                secQueue2.push(obj);
            })

            this.get('temp').clear();

            exercise.save().then((exer)=>{
                var saveImage = [];
                console.log(exer.id);
                console.log(this.queue);
                console.log(secQueue);
                secQueue.forEach(file => {
                    console.log("akjdajsdkasjd");
                      var newFile = this.get('DS').createRecord(this.get('model'), {
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        rawSize: file.rawSize,
                        imageData: file.base64Image,
                        exercise: []
                      });

                    newFile.get('exercise').pushObject(exercise);
                    newFile.save();

                    exercise.get('images').pushObject(newFile);
                    this.get('DS').findRecord('exercise', exer.id).then((rec)=>{
                       rec.save();
                    });

                });

                secQueue2.forEach(file => {
                    this.get('DS').findRecord(this.get('model'), file.get('id')).then((obj) =>{
                        obj.get('exercise').pushObject(exercise); 
                        obj.save();
                        exercise.get('images').pushObject(obj);
                    })
                });
            });

            this.get('queue').clear();

            this.set('Name', "");
            this.set('Description', "");
            this.set('AuthName', "");
            this.set('ActionStep', "");
            this.set('Reps', "");
            this.set('Sets', "");
            this.set('DurationMinute', "");
            this.set('DurationSecond', "");
            this.set('MMURL', "");
            this.set("actionStep", []);
            this.set('isEditing', false);

            // window.location.reload();
        },

        addTempImage: function(image) {
            console.log(image);
            this.temp.push(image);
            console.log(image.name);
        },

        openModal: function ()  {
            $('.ui.newExercise.modal').modal({
              closable: false,
      
              onDeny: () => {
                return true;
              },
      
            }).modal('show')
          },
        
    }
});
