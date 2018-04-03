import Component from '@ember/component';
// import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Ember from 'ember';
import fileObject from "../utils/file-object";
import moment from 'moment';
import $ from 'jquery';

export default Component.extend({
  DS: inject('store'),
  cbState: false,
  temp: [],
  queue2:[],
  // ImageName: null,
  model: 'image',
  flag: null,
  accept: 'audio/*,video/*,image/*',
  multiple: true,
  queue: [],
  modelQueue: [],
  savingInProgress: false,
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

          console.log(file);

          // var newFile = this.get('DS').createRecord(this.get('model'), {
          //     name: this.ImageName,
          //     size: file.size,
          //     type: file.type,
          //     rawSize: file.rawSize,
          //     imageData: file.base64Image
          // });
          // newFile.save();
          this.get('queue').pushObject(file);
          // this.get('modelQueue').pushObject(newFile);
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


    submit: function() {
      let date = moment().format("MMM Do YY");
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
        images: [],
        dateCreated: date
      });

      console.log(this.queue);
      let self = this;
      let secQueue = [];
      let secQueue2 = [];

      this.queue.forEach(file => {
        secQueue.pushObject(file);
      });

      this.queue2.forEach(file => {
        secQueue2.push(file);
      });

      this.get('temp').forEach(function(obj) {
        secQueue2.push(obj);
      });

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
      this.get('queue2').clear();
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
      $('.ui.newExercise.modal').modal('hide');

      // window.location.reload();
      // windows.location.reload();
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
