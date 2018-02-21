import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    DS: Ember.inject.service('store'),
     // ImageName: null,
     model: 'image',
     flag: null,
     accept: 'audio/*,video/*,image/*',
     multiple: true,
     queue: [],
     modelQueue: [],
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
    Images: Ember.computed.oneWay('exerciseData.images'),

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

      openModal: function () {
        this.set('exerciseData', this.get('DS').peekRecord('exercise', this.get('ID')))

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          detachable: false,
          onDeny: () => {
            return true;
            },
           
          onApprove: () => {
            this.get('DS').findRecord('exercise' , this.get('ID')).then((rec)=>{
              rec.set('name', this.get('Name'));
              rec.set('description', this.get('Description'));
              rec.set('authorName', this.get('AuthName'));
              rec.set('objective', this.get('Objective'));
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
    }
});
