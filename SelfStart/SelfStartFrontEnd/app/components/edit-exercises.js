import Component from '@ember/component';
import Ember from 'ember';
import fileObject from "../utils/file-object";

export default Component.extend({
  DS: Ember.inject.service('store'),
  cbState: false,
  newActionSteps: [],
  oldActionSteps: [],
  temp: [],
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
  numberOfActionSteps: -1,

  init: function() {
    this._super();
  },

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
  actionStep: Ember.computed.oneWay('exerciseData.actionSteps'),
  sets: Ember.computed.oneWay('exerciseData.sets'),
  reps: Ember.computed.oneWay('exerciseData.reps'),
  Duration: Ember.computed.oneWay('exerciseData.duration'),
  MMURL: Ember.computed.oneWay('exerciseData.multimediaURL'),
  Imgs: Ember.computed.oneWay('exerciseData.images'),

  modalName: Ember.computed(function () {
    return 'editExercise' + this.get('ID');
  }),

  actions: {
    addOption: function(){
      this.set('numberOfActionSteps', this.numberOfActionSteps + 1);
      console.log(this.numberOfActionSteps);
      let newObj = Ember.Object.create({
        name: "New Action Step",
        id: this.numberOfActionSteps,
        value: null,
      })
      this.newActionSteps.pushObject(newObj);
    },

    removeOption: function(index){
      var removeOld = this.oldActionSteps.filterBy('id', index);
      var removeNew = this.newActionSteps.filterBy('id', index);
      removeOld.forEach(o => {
        this.oldActionSteps.removeObject(o);
      });
      removeNew.forEach(o => {
        this.newActionSteps.removeObject(o);
      });

    },

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
    },

    done: function () {
      this.get('queue').clear();
      this.set('flag', false);
    },

    addTempImage: function(image) {
      console.log(image);
      this.temp.push(image);
      console.log(image.name);
    },

    openModal: function () {
      // window.location.reload();
      this.secQueue.clear();
      console.log(this.images);
      this.images.forEach(file => {
        this.secQueue.pushObject(file);
      });
      this.actionStep.forEach(o => {
        this.set('numberOfActionSteps', this.numberOfActionSteps + 1);
        console.log(this.numberOfActionSteps);
        let newObj = Ember.Object.create({
          name: "New Action Step",
          id: this.numberOfActionSteps,
          value: o,
        })
        this.oldActionSteps.pushObject(newObj);
      });

      this.set('exerciseData', this.get('DS').peekRecord('exercise', this.get('ID')));

      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        transition: 'horizontal flip',
        centered: false,
        // dimmerSettings: { opacity: 0.25 },
        onDeny: () => {
          this.newActionSteps.clear();
          this.oldActionSteps.clear();
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
          let secQueue2 = [];
          let self = this;
          this.get('temp').forEach(function(obj) {
            secQueue2.push(obj);
          })

          this.get('temp').clear();

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

          this.get('DS').findRecord('exercise', this.get('ID')).then((rec)=>{
            secQueue2.forEach(file => {
              this.get('DS').findRecord(this.get('model'), file.get('id')).then((obj) =>{
                obj.get('exercise').pushObject(rec);
                obj.save();
                rec.get('images').pushObject(obj);
              })
            });
          });

          let actionS = [];
          this.get(this.oldActionSteps).forEach(o => {
            actionS.push(o.value);
          })
          this.get(this.newActionSteps).forEach(o => {
            actionS.push(o.value);
          })

          this.get('DS').findRecord('exercise' , this.get('ID')).then((rec)=>{
            rec.set('name', this.get('Name'));
            rec.set('description', this.get('Description'));
            rec.set('authorName', this.get('AuthName'));
            rec.set('sets', this.get('sets'));
            rec.set('reps', this.get('reps'));
            rec.set('actionStep', this.get('ActionSteps'));
            rec.set('duration', this.get('Duration'));
            rec.set('MMURL', this.get('MMURL'));
            // rec.set('exercises', this.get('exercises'));
            // rec.set('assessmentTests', this.get('assessmentTests'));
            rec.save().then(()=>{
              return true;
            });
          });

          //window.location.reload();
          this.newActionSteps.clear();
          this.oldActionSteps.clear();
          this.secQueue.clear();
          this.removeImages.clear();
          this.queue.clear();

        }
      })
        .modal('show');
    },


    addObjective: function(){
      let newObj = this.get('Objective');
      this.get('obj').pushObject(newObj);
      this.set('Objective', "");
    },

    addActionStep(){
      let newActStep = this.get('ActionSteps');
      this.get('actionStep').pushObject(newActStep);
      this.set('ActionSteps', "");
    },

    deleteNewFile(file){
      this.get('queue').removeObject(file);
      if (Ember.isEmpty(this.get('queue'))) {
        this.set('flag', false);
      }
    }
  }
});
