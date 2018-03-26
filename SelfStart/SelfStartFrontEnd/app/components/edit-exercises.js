import Component from '@ember/component';
import Ember from 'ember';

import fileObject from "../utils/file-object";

export default Component.extend({
  DS: Ember.inject.service('store'),
  // ImageName: null,
  images: null,
  model: 'image',
  flag: null,
  accept: 'audio/*,video/*,image/*',
  multiple: true,
  queue: [],
  modelQueue: [],
  savingInProgress: false,
  isEditing: false,
  ID: null,
  exerID: null,
  secQueue: [],
  removeImages: [],

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
  exerciseData: null,

  Description: Ember.computed.oneWay('exerciseData.description'),
  Name: Ember.computed.oneWay('exerciseData.name'),
  AuthName: Ember.computed.oneWay('exerciseData.authorName'),
  obj: Ember.computed.oneWay('exerciseData.objectives'),
  actionStep: Ember.computed.oneWay('exerciseData.actionSteps'),
  Location: Ember.computed.oneWay('exerciseData.location'),
  Frequency: Ember.computed.oneWay('exerciseData.frequency'),
  Duration: Ember.computed.oneWay('exerciseData.duration'),
  TargetedDate: Ember.computed.oneWay('exerciseData.targetDate'),
  MMURL: Ember.computed.oneWay('exerciseData.multimediaURL'),
  tempObj: [],
  Imgs: Ember.computed.oneWay('exerciseData.images'),

  
  modalName: Ember.computed(function () {
    return 'editExercise' + this.get('ID');
  }),

  actions: {

    selectFile: function (data) {
      if (!Ember.isEmpty(data.target.files)) {
        for (let i = data.target.files.length - 1; i >= 0; i--) {
          let file = fileObject.create({
            fileToUpload: data.target.files[i],
            maximumFileSize: 6
          });

          console.log(file);

          this.get('queue').pushObject(file);
        }
      }
    },

    deleteFile: function (image) {
      console.log(image.id);
      console.log(this.images);
      console.log(this.exerID);

      this.secQueue.removeObject(image);
      this.removeImages.pushObject(image);

      // this.get('DS').findRecord('image' , image.id).then((im)=>{
      //   im.destroyRecord();//.then(() =>{
      //     // return true;
      //   // });
      //   this.secQueue.removeObject(image);
      //   this.get('DS').findRecord('image', image.id).then((rec) => {
      //     rec.save();
      //   });
      // this.set(this.images, null);
      // this.get('DS').findRecord('exercise' , this.exerID).then((im)=>{
      // this.set(this.images, im.images);
      // });

      // });
      // this.images.removeObject(image);
    },

    done: function () {
      this.get('queue').clear();
      this.set('flag', false);
    },

    openModal: function () {

      let self = this;
      self.set('tempObj',[]);
      this.set('exerciseData', this.get('DS').peekRecord('exercise', this.get('ID')));
      this.get('obj').forEach(function(o) {
          self.get('tempObj').pushObject(Ember.Object.create({
          obj: o,
          }));
      })
      // window.location.reload();
      this.secQueue.clear();
      console.log(this.images);
      this.images.forEach(file => {
        this.secQueue.pushObject(file);
      });

      


      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        transition: 'horizontal flip',
        detachable: false,
        onDeny: () => {

          this.secQueue.clear();
          this.removeImages.clear();
          this.queue.clear();
          return true;
        },

        onApprove: () => {


          this.removeImages.forEach(file => {
            console.log(file);
            this.get('DS').findRecord('image', file.id).then((rec) => {
              rec.destroyRecord();
              rec.save();
            });
          });

          this.queue.forEach(file => {

            console.log(file);

            this.get('DS').findRecord('exercise', this.get('ID')).then((rec)=>{

              // console.log("sasdasd", exe);
              var newFile = this.get('DS').createRecord('image', {
                name: file.name,
                size: file.size,
                type: file.type,
                rawSize: file.rawSize,
                imageData: file.base64Image,
                exercise: []
              });

              // var exe = this.get('DS').findRecord('exercise', this.get('ID'));
              // newFile.save();

              newFile.get('exercise').pushObject(rec);
              newFile.save();

              rec.get('images').pushObject(newFile);
              this.get('DS').findRecord('exercise', this.get('ID')).then((rec)=>{
                rec.save();
              });
            });
          });

          // this.get('DS').findRecord('image', this.get('ID')).then((rec) => {
          //   rec.save();
          // });
          let temp = [];
          this.get('tempObj').forEach(function(o) {
            temp.pushObject(o.obj);
          })

          this.get('DS').findRecord('exercise' , this.get('ID')).then((rec)=>{
            console.log(temp);
            rec.set('name', this.get('Name'));
            rec.set('description', this.get('Description'));
            rec.set('authorName', this.get('AuthName'));
            rec.set('objectives', temp);
            rec.set('actionStep', this.get('ActionSteps'));
            rec.set('location', this.get('Location'));
            rec.set('frequency', this.get('Frequency'));
            rec.set('duration', this.get('Duration'));
            rec.set('targetDate', this.get('TargetDate'));
            rec.set('MMURL', this.get('MMURL'));
            // rec.set('exercises', this.get('exercises'));
            // rec.set('assessmentTests', this.get('assessmentTests'));
            rec.save().then(()=>{
              return true;
            });
          });


          // window.location.reload();

          this.secQueue.clear();
          this.removeImages.clear();
          this.queue.clear();

        }
      })
        .modal('show');
    },


    addObjective: function(index){
      let newObj = Ember.Object.create({
        obj: this.get('Objective'),
      })
      this.get('tempObj').pushObject(newObj);
      this.set('Objective', "");
    },

    addActionStep(){
      let newActStep = this.get('ActionSteps');
      this.get('actionStep').pushObject(newActStep);
      this.set('ActionSteps', "");
    },

    editObjective(name){
      // let tracklistTable = document.getElementById(name);
      // tracklistTable.innerHTML +=  '<div class="ui input"> <input type="text" value=' + name+'></div>';

    },

    deleteNewFile(file){
      this.get('queue').removeObject(file);
      if (Ember.isEmpty(this.get('queue'))) {
        this.set('flag', false);
      }
    },

    deleteObjective(o) {
      this.get('tempObj').removeObject(o);
    },
    
    deleteActionStep(aS) {
      this.get('actionStep').removeObject(aS);
    },
  }
});
