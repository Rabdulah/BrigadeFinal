"use strict";



define('self-start-front-end/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.RESTAdapter.extend({
    host: 'http://localhost:8082'
  });
});
define('self-start-front-end/app', ['exports', 'self-start-front-end/resolver', 'ember-load-initializers', 'self-start-front-end/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('self-start-front-end/breakpoints', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 991px)',
    desktop: '(min-width: 992px) and (max-width: 1200px)'
  };
});
define("self-start-front-end/components/-lf-get-outlet-state", ["exports", "liquid-fire/components/-lf-get-outlet-state"], function (exports, _lfGetOutletState) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _lfGetOutletState.default;
    }
  });
});
define('self-start-front-end/components/add-country', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    actions: {

      openModal: function openModal() {
        var _this = this;

        this.set('name', null);

        Ember.$('.ui.small.newCountry.modal').modal({
          closable: false,

          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
            var newCountry = _this.get('DS').createRecord('country', {
              name: _this.get('name')
            });
            newCountry.save().then(function () {
              return true;
            });
          }

        }).modal('show');
      }
    }

  });
});
define('self-start-front-end/components/add-exercises', ['exports', 'self-start-front-end/utils/file-object'], function (exports, _fileObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
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

    labelArray: ['height: 6.25em', 'line-height: 5.25em', 'text-align: center'],

    inputStyle: Ember.computed(function () {
      var style_array = ['opacity: 0', 'width:100% !important', 'overflow:hidden', 'position:relative', 'left:-100%', 'display:block'];
      return Ember.String.htmlSafe(style_array.join(';'));
    }),

    labelStyle: Ember.computed('labelArray', function () {
      return Ember.String.htmlSafe(this.get('labelArray').join(';'));
    }),

    dragLeave: function dragLeave(event) {
      event.preventDefault();
      this.set('labelArray', ['height: 6.25em', 'line-height: 5.25em', 'text-align: center']);
      return this.set('dragClass', 'deactivated');
    },

    dragOver: function dragOver() {
      this.set('labelArray', ['height: 6.25em', 'line-height: 5.25em', 'text-align: center', 'background: green']);
    },

    drop: function drop() {
      this.set('labelArray', ['height: 6.25em', 'line-height: 5.25em', 'text-align: center']);
    },

    obj: [],

    actionStep: [],

    actions: {
      selectFile: function selectFile(data) {
        if (!Ember.isEmpty(data.target.files)) {
          for (var i = data.target.files.length - 1; i >= 0; i--) {
            var file = _fileObject.default.create({
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

      deleteFile: function deleteFile(file) {
        this.get('queue').removeObject(file);
        if (Ember.isEmpty(this.get('queue'))) {
          this.set('flag', false);
        }
      },

      done: function done() {
        this.get('queue').clear();
        this.set('flag', false);
      },

      addActionStep: function addActionStep() {
        var newActStep = this.get('ActionSteps');
        this.get('actionStep').pushObject(newActStep);
        this.set('ActionSteps', "");
      },
      addObjective: function addObjective() {
        var newObj = this.get('Objective');
        this.get('obj').pushObject(newObj);
        this.set('Objective', "");
      },
      cancel: function cancel() {

        this.set('isEditing', false);
        // this.get('DS').find('exercise' , this.tempExercise.get("ID")).then((exercise)=>{
        //     exercise.destroyRecord().then(() =>{
        //     return true;
        // });
        // this.tempExercise.destroyRecord();
        // this.get('DS').destroyRecord('exercise', this.tempExercise.get('id'));
      },
      addExercise: function addExercise() {
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


      submit: function submit() {
        var _this = this;

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

        // let saveImage = [];
        // this.get('queue').forEach(file => {
        //     // if (file.isDisplayableImage) {
        //       var newFile = this.get('DS').createRecord(this.get('model'), {
        //         name: file.name,
        //         size: file.size,
        //         type: file.type,
        //         rawSize: file.rawSize,
        //         imageData: file.base64Image,
        //         exercise: null
        //       });
        //       console.log(newFile);
        //       newFile.save();//.then(() => {
        //         // // counter++;
        //         // if (this.get('queue').length == counter) {
        //         //   this.get('queue').clear();
        //         //   this.set('flag', false);
        //         //   this.set('savingInProgress', false);
        //         // }
        //     //   });
        //       saveImage.pushObject(newFile);
        //     // } else{
        //     //   counter++;
        //     // }
        //   });

        // console.log("This is save image");
        // console.log(saveImage);

        var exercise = this.get('DS').createRecord('exercise', {
          name: this.get('Name'),
          description: this.get('Description'),
          objectives: this.get('obj'),
          authorName: this.get('AuthName'),
          actionSteps: this.get('actionStep'),
          location: this.get('Location'),
          frequency: this.get('Frequency'),
          duration: this.get('Duration'),
          multimediaURL: this.get('MMURL'),

          targetDate: this.get('TargetDate'),
          images: []
        });

        console.log(this.queue);

        var secQueue = [];

        this.queue.forEach(function (file) {
          secQueue.pushObject(file);
        });

        exercise.save().then(function (exer) {
          var saveImage = [];
          console.log(exer.id);
          console.log(_this.queue);
          console.log(secQueue);
          secQueue.forEach(function (file) {
            console.log("akjdajsdkasjd");
            var newFile = _this.get('DS').createRecord(_this.get('model'), {
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
            _this.get('DS').findRecord('exercise', exer.id).then(function (rec) {
              rec.save();
            });
          });
        });

        this.get('queue').clear();
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

        window.location.reload();
        // windows.location.reload();
      }

    }
  });
});
define('self-start-front-end/components/add-form-question', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        DS: Ember.inject.service('store'),

        isEditing: false,
        count: 0,

        actions: {
            addFQ: function addFQ() {
                this.set('isEditing', true);
            },


            cancel: function cancel() {
                this.set('isEditing', false);
            },

            submit: function submit() {

                // let self = this;

                var form = this.get('DS').createRecord('form', {
                    // question: self.get.objectAt('newQuestion'),
                    // )
                });

                form.save().then(function () {
                    this.set('isEditing', false);
                    return true;
                });
            }
        }
    });
});
define('self-start-front-end/components/add-form', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        DS: Ember.inject.service('store'),

        isEditing: false,

        actions: {
            addForm: function addForm() {
                this.set('isEditing', true);
            },


            cancel: function cancel() {
                this.set('isEditing', false);
            },

            submit: function submit() {

                var self = this;

                var form = this.get('DS').createRecord('form', {
                    name: self.get('fName'),
                    description: self.get('fDescription')
                });

                console.log(this.get('fName'));

                // let tName = this.get('fName');
                // let tDescription = this.get('fDescription');

                var newForm = this.get('DS').createRecord('form', {
                    name: this.get('fName'),
                    description: this.get('fDescription')
                });
                console.log(this.get('fDescription'));

                newForm.save().then(function () {
                    return true;
                });
                this.set('isEditing', false);
                window.location.reload();
            }
        }
    });
});
define('self-start-front-end/components/add-gender', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    actions: {
      openModal: function openModal() {
        var _this = this;

        this.set('name', null);

        Ember.$('.ui.small.newGender.modal').modal({
          closable: false,

          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {

            var newGender = _this.get('DS').createRecord('gender', {
              name: _this.get('name')
            });
            newGender.save().then(function () {
              return true;
            });
          }
        }).modal('show');
      }
    }

  });
});
define('self-start-front-end/components/add-patient', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),

    tagName: '',

    init: function init() {
      this._super.apply(this, arguments);

      this.set('familyName', '');
      this.set('givenName', '');
      this.set('email', '');
      this.set('streetName', '');
      this.set('streetNumber', '');
      this.set('apartment', '');
      this.set('selectedCountry', '');
      this.set('province', '');
      this.set('city', '');
      this.set('healthCardNumber', '');
      this.set('selectedGender', '');
      this.set('dateOfBirth', '');
      this.set('phoneNumber', '');
      this.set('postalCode', '');
      this.set('userAccountName', '');
      this.set('encryptedPassword', '');

      // this.set('selectedGender', this.get('selectedGender'));
      // this.set('selectedCountry', this.get('selectedCountry'));
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);

      Ember.$(document).ready(function ($) {
        if ($('.floating-labels').length > 0) floatLabels();

        function floatLabels() {
          var inputFields = $('.floating-labels .cd-label').next();
          inputFields.each(function () {
            var singleInput = $(this);
            //check if  is filling one of the form fields
            checkVal(singleInput);
            singleInput.on('change keyup', function () {
              checkVal(singleInput);
            });
          });
        }

        function checkVal(inputField) {
          inputField.val() == '' ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
        }
      });
    },


    conutryModel: Ember.computed(function () {
      return this.get('DS').findAll('country');
    }),

    genderModel: Ember.computed(function () {
      return this.get('DS').findAll('gender');
    }),

    actions: {
      assignDate: function assignDate(date) {
        this.set('selectedDate', date);
      },
      selectCountry: function selectCountry(country) {
        this.set('selectedCountry', country);
      },
      selectGender: function selectGender(gender) {
        this.set('selectedGender', gender);
      },
      cancel: function cancel() {
        return true;
      },


      save: function save() {
        var _this = this;

        var self = this;

        var patientAccount = {};
        patientAccount['userAccountName'] = self.get('userAccountName');
        patientAccount['encryptedPassword'] = self.get('encryptedPassword');

        var patient = this.get('DS').createRecord('patient', {
          familyName: self.get('familyName'),
          givenName: self.get('givenName'),
          email: self.get('email'),
          streetName: self.get('streetName'),
          streetNumber: self.get('streetNumber'),
          apartment: self.get('apartment'),
          country: self.get('selectedCountry'),
          province: self.get('province'),
          city: self.get('city'),
          dateOfBirth: new Date(this.get('selectedDate')),
          healthCardNumber: self.get('healthCardNumber'),
          gender: self.get('selectedGender'),
          phoneNumber: self.get('phoneNumber'),
          postalCode: self.get('postalCode'),
          account: patientAccount
        });

        patient.save().then(function () {
          _this.get('routing').transitionTo('patients');
        });
      }
    }

  });
});
define('self-start-front-end/components/add-physiotherapist', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),

    tagName: '',

    didRender: function didRender() {
      this._super.apply(this, arguments);

      Ember.$(document).ready(function ($) {
        if ($('.floating-labels').length > 0) floatLabels();

        function floatLabels() {
          var inputFields = $('.floating-labels .cd-label').next();
          inputFields.each(function () {
            var singleInput = $(this);
            //check if user is filling one of the form fields
            checkVal(singleInput);
            singleInput.on('change keyup', function () {
              checkVal(singleInput);
            });
          });
        }

        function checkVal(inputField) {
          inputField.val() == '' ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
        }
      });
    },


    conutryModel: Ember.computed(function () {
      return this.get('DS').findAll('country');
    }),

    genderModel: Ember.computed(function () {
      return this.get('DS').findAll('gender');
    }),

    maritalStatusModel: Ember.computed(function () {
      return this.get('DS').findAll('maritalStatus');
    }),

    actions: {
      addPatient: function addPatient() {
        this.set('isEditing', true);
      },
      assignDate: function assignDate(date) {
        this.set('selectedDate', date);
      },
      cancel: function cancel() {
        return true;
      },


      save: function save() {
        var _this = this;

        var self = this;

        var physiotherapist = this.get('DS').createRecord('physiotherapest', {
          familyName: self.get('familyName'),
          givenName: self.get('givenName'),
          email: self.get('email'),
          dateHired: self.get('dateHired'),
          dateFired: self.get('dateFired'),
          treatment: self.get('treatment'),
          account: self.get('account')

        });
        physiotherapist.save().then(function () {
          _this.get('routing').transitionTo('physiotherapists');
        });

        this.set('familyName', '');
        this.set('givenName', '');
        this.set('email', '');
        this.set('dateHired', '');
        this.set('dateFired', '');
        this.set('treatment', '');
        this.set('account', '');
      }
    }

  });
});
define('self-start-front-end/components/add-province', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    countryId: null,

    countries: function () {
      return this.get('DS').findAll('country');
    }.property(),

    actions: {

      setCountryId: function setCountryId(comp, id) {
        this.set('countryId', id);
      },

      openModal: function openModal() {
        var _this = this;

        this.set('name', '');
        this.set('countryId', null);
        this.set('city', []);

        Ember.$('.ui.small.newProvince.modal').modal({
          closable: false,

          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {

            var self = _this;

            var newProvince = _this.get('DS').createRecord('province', {
              name: self.get('name'),
              country: self.get('DS').peekRecord('country', self.get('countryId')),
              city: []
            });

            newProvince.save().then(function () {
              return true;
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/add-question', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    isEditing: false,
    shortAns: false,
    multipleChoice: false,
    rating: false,
    trueFalse: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
    oNumber: 1,
    removable: false,
    addable: true,

    actions: {
      multipleChoice: function multipleChoice() {
        this.set('multipleChoice', true);
        this.set('shortAns', false);
        this.set('trueFalse', false);
        this.set('rating', false);
      },
      addOption: function addOption() {
        if (this.option2 == false) {
          this.set('option2', true);
          this.set('removable', true);
          this.oNumber++;
          return;
        }
        if (this.option3 == false) {
          this.set('option3', true);
          this.oNumber++;
          return;
        }
        if (this.option4 == false) {
          this.set('option4', true);
          this.oNumber++;
          return;
        }
        if (this.option5 == false) {
          this.set('option5', true);
          this.oNumber++;
          return;
        }
        if (this.option6 == false) {
          this.set('option6', true);
          this.set('addable', false);
          this.oNumber++;
          return;
        }
      },
      removeOption: function removeOption() {
        if (this.option6 == true) {
          this.set('option6', false);
          this.set('addable', true);
          this.oNumber--;
          return;
        }
        if (this.option5 == true) {
          this.set('option5', false);
          this.oNumber--;
          return;
        }
        if (this.option4 == true) {
          this.set('option4', false);
          this.oNumber--;
          return;
        }
        if (this.option3 == true) {
          this.set('option3', false);
          this.oNumber--;
          return;
        }
        if (this.option2 == true) {
          this.set('option2', false);
          this.set('removable', false);
          this.oNumber--;
          return;
        }
      },
      shortAns: function shortAns() {
        this.set('shortAns', true);
        this.set('multipleChoice', false);
        this.set('trueFalse', false);
        this.set('rating', false);
      },
      trueFalse: function trueFalse() {
        this.set('trueFalse', true);
        this.set('shortAns', false);
        this.set('multipleChoice', false);
        this.set('rating', false);
      },
      rating: function rating() {
        this.set('trueFalse', false);
        this.set('shortAns', false);
        this.set('multipleChoice', false);
        this.set('rating', true);
      },
      addQuestion: function addQuestion() {
        this.set('isEditing', true);
      },


      cancel: function cancel() {
        this.set('isEditing', false);
      },

      submit: function submit() {

        var question,
            help,
            qtype,
            optStr = '';

        var self = this;

        if (this.shortAns) {
          help = self.get('sahelp');
          question = self.get('saquestion');
          qtype = "Short answer";
        }
        if (this.multipleChoice) {
          help = self.get('mchelp');
          question = self.get('mcquestion');
          qtype = "Multiple choice";

          for (var i = 1; i <= this.oNumber; i++) {
            optStr += self.get('mcop' + i);
            optStr += "+++";
          }
        }
        if (this.trueFalse) {
          help = self.get('tfhelp');
          question = self.get('tfquestion');
          qtype = "True/False";
        }

        if (this.rating) {
          help = self.get('rhelp');
          question = self.get('rquestion');
          qtype = "Rating";
        }

        var newQuestion = this.get('DS').createRecord('question', {

          helpDescription: help,
          questionText: question,
          type: qtype,
          optionNumber: this.oNumber,
          optionString: optStr,
          mc: this.multipleChoice,
          tf: this.trueFalse,
          ra: this.rating,
          sa: this.shortAns
        });

        newQuestion.save().then(function () {
          this.set('isEditing', false);
          return true;
        });

        this.set('isEditing', false);
      }
    }
  });
});
define('self-start-front-end/components/add-rehabplan', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),

    exerciseModel: Ember.computed(function () {
      return this.get('DS').findAll('exercise');
    }),

    isEditing: false,

    actions: {
      addRehabPlan: function addRehabPlan() {
        this.set('isEditing', true);
      },


      cancel: function cancel() {
        this.set('isEditing', false);
      },

      decreaseTime: function decreaseTime() {},

      increaseTime: function increaseTime() {},

      save: function save() {

        var self = this;
        //connect to rehabilitationplans
        var rehabplan = this.get('DS').createRecord('rehabilitationplan', {
          planName: self.get('Name'),
          physioID: self.get('authorName'),
          description: self.get('description'),
          goal: self.get('goal'),
          timeToComplete: self.get('timeToComplete')
          //exercises: self.get('exercises'),
          // assessmentTests: self.get('assessmentTests'),
        });
        //when save is successfull close form
        rehabplan.save().then(function () {
          self.get('routing').transitionTo('rehabplans');
        });
        //CHANGE THIS WHEN ITS DONE
        this.set('isEditing', false);
        this.set('Name', '');
        this.set('description', '');
        this.set('goal', '');
        this.set('timeToComplete', '');
        this.set('exercises', '');
        this.set('assessmentTests', '');
        this.set('authorName', '');
      }
    }

  });
});
define('self-start-front-end/components/admin-nav', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: '',

    init: function init() {
      this._super.apply(this, arguments);
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);

      if (Ember.$(window).width() > 600) {
        Ember.$('body').visibility({
          offset: -10,
          observeChanges: false,
          once: false,
          continuous: false,
          onTopPassed: function onTopPassed() {
            requestAnimationFrame(function () {
              Ember.$('.following.bar').addClass('light fixed').find('.menu').removeClass('inverted');
              Ember.$('.following .additional.item').transition('scale in', 750);
            });
          },
          onTopPassedReverse: function onTopPassedReverse() {
            requestAnimationFrame(function () {
              Ember.$('.following.bar').removeClass('light fixed').find('.menu').addClass('inverted').find('.additional.item').transition('hide');
            });
          }
        });
      }
      Ember.$('.additional.item').popup({
        delay: {
          show: 200,
          hide: 50
        },
        position: 'bottom center'
      });

      var $menu = Ember.$('#toc'),
          $tocSticky = Ember.$('.toc .ui.sticky'),
          $fullHeightContainer = Ember.$('.pusher > .full.height');

      // create sidebar sticky
      requestAnimationFrame(function () {
        $tocSticky.sticky({
          silent: true,
          container: Ember.$('html'),
          context: $fullHeightContainer
        });
      });

      // main sidebar
      $menu.sidebar({
        dimPage: true,
        transition: 'overlay',
        mobileTransition: 'uncover'
      });

      // launch buttons
      $menu.sidebar('attach events', '.launch.button, .view-ui, .launch.item');
    },


    actions: {}
  });
});
define('self-start-front-end/components/admin-welcome', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('self-start-front-end/components/as-scrollable', ['exports', 'ember-scrollable/components/ember-scrollable'], function (exports, _emberScrollable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberScrollable.default.extend({
    classNames: 'as-scrollable'
  });
});
define('self-start-front-end/components/back-to-top', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: '',

    didRender: function didRender() {
      this._super.apply(this, arguments);

      // ===== Scroll to Top ====
      Ember.$(window).scroll(function () {
        if (Ember.$(this).scrollTop() >= 300) {
          // If page is scrolled more than 50px
          Ember.$('#return-to-top').fadeIn(200); // Fade in the arrow
        } else {
          Ember.$('#return-to-top').fadeOut(200); // Else fade out the arrow
        }
      });
      Ember.$('#return-to-top').click(function () {
        // When arrow is clicked
        Ember.$('body,html').animate({
          scrollTop: 0 // Scroll to top of body
        }, 500);
      });
    }
  });
});
define('self-start-front-end/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _basicDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
});
define('self-start-front-end/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _contentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentElement.default;
    }
  });
});
define('self-start-front-end/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('self-start-front-end/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('self-start-front-end/components/book-appointment', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),
    isEditing: false,

    modalName: Ember.computed(function () {
      return 'Manage-form' + this.get('ID');
    }),
    phyidget: null,
    selectedappointment: null,

    physioPicked: false,
    appointmentsN: [],
    weekdate: [],
    block: {
      fulldate: null,
      date: null,
      datastart: null,
      dataend: null,
      dataevent: "event-3",
      appointmentid: null
    },
    blocks: [],

    dragFinishText: false,
    dragStartedText: false,
    dragEndedText: false,
    myObject: { id: 1, name: 'objectName' },

    init: function init() {
      this._super();
      var d = new Date();
      for (var i = 0; i < d.getDay(); i++) {
        var result = new Date();
        result.setDate(result.getDate() + -d.getDay());
        this.get('weekdate')[i] = result.toDateString();
      }
      this.get('weekdate')[d.getDay()] = d.toDateString();
      for (var _i = d.getDay(); _i < 6; _i++) {
        var _result = new Date();
        _result.setDate(d.getDate() + _i);
        this.get('weekdate')[_i + 1] = _result.toDateString();
      }
    },

    getphysio: Ember.computed(function () {
      return this.get('DS').findAll('physiotherapest');
    }),

    didRender: function didRender() {
      Ember.$(document).ready(function ($) {
        var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
        var transitionsSupported = $('.csstransitions').length > 0;
        //if browser does not support transitions - use a different event to trigger them
        if (!transitionsSupported) transitionEnd = 'noTransition';

        //should add a loding while the events are organized

        function SchedulePlan(element) {
          this.element = element;
          this.timeline = this.element.find('.timeline');
          this.timelineItems = this.timeline.find('li');
          this.timelineItemsNumber = this.timelineItems.length;
          this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
          //need to store delta (in our case half hour) timestamp
          this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems.eq(1).text()) - getScheduleTimestamp(this.timelineItems.eq(0).text());

          this.eventsWrapper = this.element.find('.events');
          this.eventsGroup = this.eventsWrapper.find('.events-group');
          this.singleEvents = this.eventsGroup.find('.single-event');
          this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();

          this.modal = this.element.find('.event-modal');
          this.modalHeader = this.modal.find('.header');
          this.modalHeaderBg = this.modal.find('.header-bg');
          this.modalBody = this.modal.find('.body');
          this.modalBodyBg = this.modal.find('.body-bg');
          this.modalMaxWidth = 800;
          this.modalMaxHeight = 480;

          this.animating = false;

          this.initSchedule();
        }

        SchedulePlan.prototype.initSchedule = function () {
          this.scheduleReset();
          this.initEvents();
        };

        SchedulePlan.prototype.scheduleReset = function () {
          var mq = this.mq();
          if (mq == 'desktop' && !this.element.hasClass('js-full')) {
            //in this case you are on a desktop version (first load or resize from mobile)
            this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
            this.element.addClass('js-full');
            this.placeEvents();
            this.element.hasClass('modal-is-open') && this.checkEventModal();
          } else if (mq == 'mobile' && this.element.hasClass('js-full')) {
            //in this case you are on a mobile version (first load or resize from desktop)
            this.element.removeClass('js-full loading');
            this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
            this.eventsWrapper.children('.grid-line').remove();
            this.element.hasClass('modal-is-open') && this.checkEventModal();
          } else if (mq == 'desktop' && this.element.hasClass('modal-is-open')) {
            //on a mobile version with modal open - need to resize/move modal window
            this.checkEventModal('desktop');
            this.element.removeClass('loading');
          } else {
            this.element.removeClass('loading');
          }
        };

        SchedulePlan.prototype.initEvents = function () {
          var self = this;

          this.singleEvents.each(function () {
            //create the .event-date element for each event
            var durationLabel = '<span class="event-date">' + $(this).data('start') + ' - ' + $(this).data('end') + '</span>';
            $(this).children('a').prepend($(durationLabel));

            //detect click on the event and open the modal
            // $(this).on('click', 'a', function (event) {
            //   event.preventDefault();
            //   if (!self.animating) self.openModal($(this));
            // });
          });

          //close modal window
          // this.modal.on('click', '.close', function (event) {
          //   event.preventDefault();
          //   if (!self.animating) self.closeModal(self.eventsGroup.find('.selected-event'));
          // });
          // this.element.on('click', '.cover-layer', function (event) {
          //   if (!self.animating && self.element.hasClass('modal-is-open')) self.closeModal(self.eventsGroup.find('.selected-event'));
          // });
        };

        SchedulePlan.prototype.placeEvents = function () {
          var self = this;
          this.singleEvents.each(function () {
            //place each event in the grid -> need to set top position and height
            var start = getScheduleTimestamp($(this).attr('data-start')),
                duration = getScheduleTimestamp($(this).attr('data-end')) - start;

            var eventTop = self.eventSlotHeight * (start - self.timelineStart) / self.timelineUnitDuration,
                eventHeight = self.eventSlotHeight * duration / self.timelineUnitDuration;

            $(this).css({
              top: eventTop - 1 + 'px',
              height: eventHeight + 1 + 'px'
            });
          });

          this.element.removeClass('loading');
        };

        // SchedulePlan.prototype.openModal = function (event) {
        //   var self = this;
        //   var mq = self.mq();
        //   this.animating = true;
        //
        //   //update event name and time
        //   this.modalHeader.find('.event-name').text(event.find('.event-name').text());
        //   this.modalHeader.find('.event-date').text(event.find('.event-date').text());
        //   this.modal.attr('data-event', event.parent().attr('data-event'));
        //
        //   //update event content
        //   this.modalBody.find('.event-info').load(event.parent().attr('data-content') + '.html .event-info > *', function (data) {
        //     //once the event content has been loaded
        //     self.element.addClass('content-loaded');
        //   });
        //
        //   this.element.addClass('modal-is-open');
        //
        //   setTimeout(function () {
        //     //fixes a flash when an event is selected - desktop version only
        //     event.parent('li').addClass('selected-event');
        //   }, 10);
        //
        //   if (mq == 'mobile') {
        //     self.modal.one(transitionEnd, function () {
        //       self.modal.off(transitionEnd);
        //       self.animating = false;
        //     });
        //   } else {
        //     var eventTop = event.offset().top - $(window).scrollTop(),
        //       eventLeft = event.offset().left,
        //       eventHeight = event.innerHeight(),
        //       eventWidth = event.innerWidth();
        //
        //     var windowWidth = $(window).width(),
        //       windowHeight = $(window).height();
        //
        //     var modalWidth = (windowWidth * .8 > self.modalMaxWidth) ? self.modalMaxWidth : windowWidth * .8,
        //       modalHeight = (windowHeight * .8 > self.modalMaxHeight) ? self.modalMaxHeight : windowHeight * .8;
        //
        //     var modalTranslateX = parseInt((windowWidth - modalWidth) / 2 - eventLeft),
        //       modalTranslateY = parseInt((windowHeight - modalHeight) / 2 - eventTop);
        //
        //     var HeaderBgScaleY = modalHeight / eventHeight,
        //       BodyBgScaleX = (modalWidth - eventWidth);
        //
        //     //change modal height/width and translate it
        //     self.modal.css({
        //       top: eventTop + 'px',
        //       left: eventLeft + 'px',
        //       height: modalHeight + 'px',
        //       width: modalWidth + 'px',
        //     });
        //     transformElement(self.modal, 'translateY(' + modalTranslateY + 'px) translateX(' + modalTranslateX + 'px)');
        //
        //     //set modalHeader width
        //     self.modalHeader.css({
        //       width: eventWidth + 'px',
        //     });
        //     //set modalBody left margin
        //     self.modalBody.css({
        //       marginLeft: eventWidth + 'px',
        //     });
        //
        //     //change modalBodyBg height/width ans scale it
        //     self.modalBodyBg.css({
        //       height: eventHeight + 'px',
        //       width: '1px',
        //     });
        //     transformElement(self.modalBodyBg, 'scaleY(' + HeaderBgScaleY + ') scaleX(' + BodyBgScaleX + ')');
        //
        //     //change modal modalHeaderBg height/width and scale it
        //     self.modalHeaderBg.css({
        //       height: eventHeight + 'px',
        //       width: eventWidth + 'px',
        //     });
        //     transformElement(self.modalHeaderBg, 'scaleY(' + HeaderBgScaleY + ')');
        //
        //     self.modalHeaderBg.one(transitionEnd, function () {
        //       //wait for the  end of the modalHeaderBg transformation and show the modal content
        //       self.modalHeaderBg.off(transitionEnd);
        //       self.animating = false;
        //       self.element.addClass('animation-completed');
        //     });
        //   }
        //
        //   //if browser do not support transitions -> no need to wait for the end of it
        //   if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
        // };
        //
        // SchedulePlan.prototype.closeModal = function (event) {
        //   var self = this;
        //   var mq = self.mq();
        //
        //   this.animating = true;
        //
        //   if (mq == 'mobile') {
        //     this.element.removeClass('modal-is-open');
        //     this.modal.one(transitionEnd, function () {
        //       self.modal.off(transitionEnd);
        //       self.animating = false;
        //       self.element.removeClass('content-loaded');
        //       event.removeClass('selected-event');
        //     });
        //   } else {
        //     var eventTop = event.offset().top - $(window).scrollTop(),
        //       eventLeft = event.offset().left,
        //       eventHeight = event.innerHeight(),
        //       eventWidth = event.innerWidth();
        //
        //     var modalTop = Number(self.modal.css('top').replace('px', '')),
        //       modalLeft = Number(self.modal.css('left').replace('px', ''));
        //
        //     var modalTranslateX = eventLeft - modalLeft,
        //       modalTranslateY = eventTop - modalTop;
        //
        //     self.element.removeClass('animation-completed modal-is-open');
        //
        //     //change modal width/height and translate it
        //     this.modal.css({
        //       width: eventWidth + 'px',
        //       height: eventHeight + 'px'
        //     });
        //     transformElement(self.modal, 'translateX(' + modalTranslateX + 'px) translateY(' + modalTranslateY + 'px)');
        //
        //     //scale down modalBodyBg element
        //     transformElement(self.modalBodyBg, 'scaleX(0) scaleY(1)');
        //     //scale down modalHeaderBg element
        //     transformElement(self.modalHeaderBg, 'scaleY(1)');
        //
        //     this.modalHeaderBg.one(transitionEnd, function () {
        //       //wait for the  end of the modalHeaderBg transformation and reset modal style
        //       self.modalHeaderBg.off(transitionEnd);
        //       self.modal.addClass('no-transition');
        //       setTimeout(function () {
        //         self.modal.add(self.modalHeader).add(self.modalBody).add(self.modalHeaderBg).add(self.modalBodyBg).attr('style', '');
        //       }, 10);
        //       setTimeout(function () {
        //         self.modal.removeClass('no-transition');
        //       }, 20);
        //
        //       self.animating = false;
        //       self.element.removeClass('content-loaded');
        //       event.removeClass('selected-event');
        //     });
        //   }
        //
        //   //browser do not support transitions -> no need to wait for the end of it
        //   if (!transitionsSupported) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
        // }

        SchedulePlan.prototype.mq = function () {
          //get MQ value ('desktop' or 'mobile')
          var self = this;
          return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
        };
        //
        // SchedulePlan.prototype.checkEventModal = function (device) {
        //   this.animating = true;
        //   var self = this;
        //   var mq = this.mq();
        //
        //   if (mq == 'mobile') {
        //     //reset modal style on mobile
        //     self.modal.add(self.modalHeader).add(self.modalHeaderBg).add(self.modalBody).add(self.modalBodyBg).attr('style', '');
        //     self.modal.removeClass('no-transition');
        //     self.animating = false;
        //   } else if (mq == 'desktop' && self.element.hasClass('modal-is-open')) {
        //     self.modal.addClass('no-transition');
        //     self.element.addClass('animation-completed');
        //     var event = self.eventsGroup.find('.selected-event');
        //
        //     var eventTop = event.offset().top - $(window).scrollTop(),
        //       eventLeft = event.offset().left,
        //       eventHeight = event.innerHeight(),
        //       eventWidth = event.innerWidth();
        //
        //     var windowWidth = $(window).width(),
        //       windowHeight = $(window).height();
        //
        //     var modalWidth = (windowWidth * .8 > self.modalMaxWidth) ? self.modalMaxWidth : windowWidth * .8,
        //       modalHeight = (windowHeight * .8 > self.modalMaxHeight) ? self.modalMaxHeight : windowHeight * .8;
        //
        //     var HeaderBgScaleY = modalHeight / eventHeight,
        //       BodyBgScaleX = (modalWidth - eventWidth);
        //
        //     setTimeout(function () {
        //       self.modal.css({
        //         width: modalWidth + 'px',
        //         height: modalHeight + 'px',
        //         top: (windowHeight / 2 - modalHeight / 2) + 'px',
        //         left: (windowWidth / 2 - modalWidth / 2) + 'px',
        //       });
        //       transformElement(self.modal, 'translateY(0) translateX(0)');
        //       //change modal modalBodyBg height/width
        //       self.modalBodyBg.css({
        //         height: modalHeight + 'px',
        //         width: '1px',
        //       });
        //       transformElement(self.modalBodyBg, 'scaleX(' + BodyBgScaleX + ')');
        //       //set modalHeader width
        //       self.modalHeader.css({
        //         width: eventWidth + 'px',
        //       });
        //       //set modalBody left margin
        //       self.modalBody.css({
        //         marginLeft: eventWidth + 'px',
        //       });
        //       //change modal modalHeaderBg height/width and scale it
        //       self.modalHeaderBg.css({
        //         height: eventHeight + 'px',
        //         width: eventWidth + 'px',
        //       });
        //       transformElement(self.modalHeaderBg, 'scaleY(' + HeaderBgScaleY + ')');
        //     }, 10);
        //
        //     setTimeout(function () {
        //       self.modal.removeClass('no-transition');
        //       self.animating = false;
        //     }, 20);
        //   }
        // };

        var schedules = $('.cd-schedule');
        var objSchedulesPlan = [],
            windowResize = false;

        if (schedules.length > 0) {
          schedules.each(function () {
            //create SchedulePlan objects
            objSchedulesPlan.push(new SchedulePlan($(this)));
          });
        }

        $(window).on('resize', function () {
          if (!windowResize) {
            windowResize = true;
            !window.requestAnimationFrame ? setTimeout(checkResize) : window.requestAnimationFrame(checkResize);
          }
        });

        // $(window).keyup(function (event) {
        //   if (event.keyCode == 27) {
        //     objSchedulesPlan.forEach(function (element) {
        //       element.closeModal(element.eventsGroup.find('.selected-event'));
        //     });
        //   }
        // });

        function checkResize() {
          objSchedulesPlan.forEach(function (element) {
            element.scheduleReset();
          });
          windowResize = false;
        }

        function getScheduleTimestamp(time) {
          //accepts hh:mm format - convert hh:mm to timestamp
          time = time.replace(/ /g, '');
          var timeArray = time.split(':');
          var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
          return timeStamp;
        }

        function transformElement(element, value) {
          element.css({
            '-moz-transform': value,
            '-webkit-transform': value,
            '-ms-transform': value,
            '-o-transform': value,
            'transform': value
          });
        }
      });
    },


    actions: {
      saveappointment: function saveappointment() {
        console.log("saving form");
        var self = this;
        //temp client until we get token
        var client = '5a80e1663ddc7324643209cd';
        //let client = '5a88738e1f0fdc2b94498e81';
        var physio = self.get('selectphysio');
        console.log(physio);
        // let booking = this.get('DS').findRecord('appointment',this.get('appointmentid').
        self.set('isEditing', false);
      },

      openModal: function openModal(obj) {
        this.set('selectedappointment', obj);
        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closeable: false,
          detachable: false,
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {
            return true;
          }
        }).modal('show');
      },

      bookAppointment: function bookAppointment() {
        this.set('isEditing', true);
      },
      cancelbookingappointment: function cancelbookingappointment() {
        this.set('Reason', '');
        this.set('Other', '');
        this.set('selectedDate', '');
        this.set('isEditing', false);
      },
      updateValue: function updateValue(physio) {

        var self = this;
        this.set('selectphysio', physio);

        this.get('DS').findRecord('physiotherapest', physio).then(function (phy) {
          self.set('phyidget', phy);
          phy.get('appointments').forEach(function (e) {
            self.get('appointmentsN').pushObject(e);
          });

          self.get('appointmentsN').forEach(function (e) {
            var containeddate = e.get('date');
            var container = new self.get('block');
            var min90 = new Date(containeddate);
            container.fulldate = min90;
            container.date = min90.toDateString();
            container.datastart = min90.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            min90.setMinutes(min90.getMinutes() + 90);
            container.dataend = min90.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (!(e.get('patient').get('id') == null)) {
              container.dataevent = "event-1";
            } else {
              container.dataevent = "event-3";
            }
            container.appointmentid = e.get('id');
            self.get('blocks').pushObject(container);
          });
        });

        this.set('physioPicked', true);
      },
      assignDate: function assignDate(date) {
        this.set('selectedDate', date);
      },
      cancel: function cancel() {
        return true;
      },
      prev: function prev() {
        var newcont = [];
        var counter = 0;
        this.get('weekdate').forEach(function (e) {
          var result = new Date(e);
          result.setDate(result.getDate() - 7);
          newcont[counter++] = result.toDateString();
        });
        this.get('weekdate').replace(0, 7, newcont);
      },
      next: function next() {
        var newcont = [];
        var counter = 0;
        this.get('weekdate').forEach(function (e) {
          var result = new Date(e);
          result.setDate(result.getDate() + 7);
          newcont[counter++] = result.toDateString();
        });
        this.get('weekdate').replace(0, 7, newcont);
      },


      save: function save() {
        var self = this;
        //temp client until we get token
        var client = '5a80e1663ddc7324643209cd';
        //let client = '5a88738e1f0fdc2b94498e81';
        var physio = self.get('selectphysio');
        console.log(physio);
        var booking = this.get('DS').createRecord('appointment', {
          reason: self.get('Reason'),
          other: self.get('Other'),
          date: self.get('selectedDate')
        });

        this.get('DS').findRecord('patient', client).then(function (src) {
          booking.set('patient', src);
          src.get('appointments').pushObject(booking);
          booking.save().then(function () {
            console.log(booking);
            src.save().then(function () {
              self.get('DS').findRecord('physiotherapest', physio).then(function (a) {
                a.get('appointments').pushObject(booking);
                a.save().then(function () {
                  self.set('Reason', '');
                  self.set('Other', '');
                  self.set('selectedDate', '');
                  self.set('isEditing', false);
                });
              });
            });
          });
        });
        // this.get('DS').findRecord('patient', client).then(function (src) {
        //   booking.set('patient', src);
        // });
        // booking.save().then(() =>{
        //   console.log(booking);
        //   this.get('DS').findRecord('patient', client). then(function (a) {
        //     a.get('appointments').pushObject(booking);
        //     a.save().then(()=>{
        //     });
        //   });
        //
        //   this.get('DS').findRecord('physiotherapist', self.get('selectphysio')). then(function (a) {
        //     a.get('appointments').pushObject(booking);
        //     a.save().then(()=>{
        //     });
        //   });
        //
        //
        //   this.set('Reason', '');
        //   this.set('Other', '');
        //   this.set('selectedDate', '');
        //   //this.get('routing').transitionTo('patients');
        // });
      },

      dragResult: function dragResult(obj, ops) {
        this.set('dragFinishText', ops.target.resultText);
        console.log('Content of draggable-object :', obj);
      },
      dragStart: function dragStart() {
        this.set('dragEndedText', false);
        this.set('dragStartedText', 'Drag Has Started');
      },
      dragEnd: function dragEnd() {
        this.set('dragStartedText', false);
        this.set('dragEndedText', 'Drag Has Ended');
      },
      draggingOverTarget: function draggingOverTarget() {
        console.log('Over target');
      },
      leftDragTarget: function leftDragTarget() {
        console.log('Off target');
      }

    }

  });
});
define('self-start-front-end/components/config-selection', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    genderSelected: false,
    countrySelected: false,
    provinceSelected: false,
    model: null,

    actions: {
      genderSelect: function genderSelect() {
        this.set('genderSelected', true);
        this.set('countrySelected', false);
        this.set('provinceSelected', false);
      },
      countrySelect: function countrySelect() {
        this.set('countrySelected', true);
        this.set('genderSelected', false);
        this.set('provinceSelected', false);
      },
      provinceSelect: function provinceSelect() {
        this.set('provinceSelected', true);
        this.set('genderSelected', false);
        this.set('countrySelected', false);
      }
    }
  });
});
define('self-start-front-end/components/confirm-booking', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    init: function init() {
      this._super();
      //let a = this.get('DS').find('form', this.get('ID'));
      //console.log(a.get('name'));
    },

    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'confirm-booking' + this.get('ID');
    }),

    edit: false,

    questionsModel: Ember.computed(function () {
      return this.get('DS').findAll('question');
    }),

    actions: {
      addQuestion: function addQuestion(thisQuestion, thisForm, qid) {
        thisForm.get('questions').pushObject(thisQuestion);
        thisQuestion.get('forms').pushObject(thisForm);

        this.get('DS').findRecord('form', this.get('ID')).then(function (rec) {
          rec.save().then(function () {});
        });

        this.get('DS').findRecord('question', this.get('qid')).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      manageForm: function manageForm() {
        this.set('edit', true);
      },
      done: function done() {
        this.set('edit', false);
      },


      openModal: function openModal() {
        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closeable: false,
          detachable: false,
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {
            return true;
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/delete-country', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'Delete-Country' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'fly down',
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {

            _this.get('DS').find('country', _this.get('ID')).then(function (country) {
              country.set('name', '');
              country.save().then(function () {
                country.destroyRecord();
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/delete-exercises', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'delete-exercises' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        // console.log(this.get('modalName'));
        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          detachable: false,
          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
            _this.get('DS').find('exercise', _this.get('ID')).then(function (exercise) {
              exercise.destroyRecord().then(function () {

                return true;
              });
            });
          }

        }).modal('show');
      }
    }

  });
});
define('self-start-front-end/components/delete-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'Delete-form' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closeable: false,
          detachable: false,
          transition: 'fly down',
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {
            _this.get('DS').find('form', _this.get('ID')).then(function (form) {
              form.destroyRecord().then(function () {
                return true;
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/delete-gender', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'Delete-gender' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'fly down',
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {

            _this.get('DS').find('gender', _this.get('ID')).then(function (gender) {
              gender.set('name', '');
              gender.save().then(function () {
                gender.destroyRecord();
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/delete-patient', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    flagDelete: null,

    modalName: Ember.computed(function () {
      return 'Delete-patient' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,

          transition: 'fly down',

          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {

            var patient = _this.get('DS').peekRecord('patient', _this.get('ID'));

            patient.destroyRecord().then(function () {
              if (_this.get('flagDelete') === true) _this.set('flagDelete', false);else _this.set('flagDelete', true);
              return true;
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/delete-physiotherapist', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'Delete-physiotherapest' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'fly down',

          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {

            _this.get('DS').find('physiotherapest', _this.get('ID')).then(function (physiotherapest) {

              physiotherapest.set('name', '');
              physiotherapest.save().then(function () {
                physiotherapest.destroyRecord();
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/delete-question', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'Delete-question' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closeable: false,
          detachable: false,
          transition: 'fly down',
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {
            _this.get('DS').find('question', _this.get('ID')).then(function (question) {
              question.destroyRecord().then(function () {
                return true;
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/delete-rehabplan', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    DS: Ember.inject.service('store'),
    modalName: Ember.computed(function () {
      return 'Delete-rehabplan' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          detachable: false,
          transition: 'fly down',
          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
            _this.get('DS').find('rehabilitationplan', _this.get('ID')).then(function (rehabilitationplan) {
              rehabilitationplan.destroyRecord().then(function () {
                return true;
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/delete-status', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'Delete-maritalStatus' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          detachable: false,
          transition: 'fly down',
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {

            _this.get('DS').find('maritalStatus', _this.get('ID')).then(function (maritalStatus) {

              maritalStatus.set('name', '');
              maritalStatus.save().then(function () {
                maritalStatus.destroyRecord();
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/display-questions', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        DS: Ember.inject.service('store'),
        questionNumber: 54,

        formModel: Ember.computed(function () {
            return this.get('DS').find('form', this.get('id'));
        }),

        actions: {
            Submit: function Submit() {

                var question = this.get('aa');
                console.log(question);

                // let arr = [];
                // let form = this.get('DS').find('form', this.get('id')).then((frm) =>{
                //     frm.get('questions').forEach(function(element) {
                //         arr.pushObject(element.get('questionText'));
                //     });
                // });
                // console.log(arr);
                // arr.forEach(function(q) {
                //     console.log("dvsd");
                // });
                //  console.log(arr.objectAt(1));

                // let answer = this.get('DS').createRecord('answer', {
                //      answer: "d",
                // patient:this.get(''),
                // question: element,
                //  form: frm,
                //    });

                //  answer.save().then(() =>{});
            }
        }

    });
});
define('self-start-front-end/components/edit-country', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    countryData: null,
    name: Ember.computed.oneWay('countryData.name'),

    modalName: Ember.computed(function () {
      return 'editCountry' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        this.set('countryData', this.get('DS').peekRecord('country', this.get('ID')));

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',

          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
            _this.get('DS').findRecord('country', _this.get('ID')).then(function (rec) {
              rec.set('name', _this.get('name'));
              rec.save().then(function () {
                return true;
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/edit-exercises', ['exports', 'self-start-front-end/utils/file-object'], function (exports, _fileObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
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
    init: function init() {
      this._super();

      // console.log(this.images)
      // // var secQ = []
      // this.images.forEach(file => {
      //   this.secQueue.pushObject(file);
      // });
    },

    labelArray: ['height: 6.25em', 'line-height: 5.25em', 'text-align: center'],

    inputStyle: Ember.computed(function () {
      var style_array = ['opacity: 0', 'width:100% !important', 'overflow:hidden', 'position:relative', 'left:-100%', 'display:block'];
      return Ember.String.htmlSafe(style_array.join(';'));
    }),

    labelStyle: Ember.computed('labelArray', function () {
      return Ember.String.htmlSafe(this.get('labelArray').join(';'));
    }),

    dragLeave: function dragLeave(event) {
      event.preventDefault();
      this.set('labelArray', ['height: 6.25em', 'line-height: 5.25em', 'text-align: center']);
      return this.set('dragClass', 'deactivated');
    },

    dragOver: function dragOver() {
      this.set('labelArray', ['height: 6.25em', 'line-height: 5.25em', 'text-align: center', 'background: green']);
    },

    drop: function drop() {
      this.set('labelArray', ['height: 6.25em', 'line-height: 5.25em', 'text-align: center']);
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

    Imgs: Ember.computed.oneWay('exerciseData.images'),

    modalName: Ember.computed(function () {
      return 'editExercise' + this.get('ID');
    }),

    actions: {

      selectFile: function selectFile(data) {
        if (!Ember.isEmpty(data.target.files)) {
          for (var i = data.target.files.length - 1; i >= 0; i--) {
            var file = _fileObject.default.create({
              fileToUpload: data.target.files[i],
              maximumFileSize: 6
            });

            console.log(file);

            this.get('queue').pushObject(file);
          }
        }
      },

      deleteFile: function deleteFile(image) {
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

      done: function done() {
        this.get('queue').clear();
        this.set('flag', false);
      },

      openModal: function openModal() {
        var _this = this;

        // window.location.reload();
        this.secQueue.clear();
        console.log(this.images);
        this.images.forEach(function (file) {
          _this.secQueue.pushObject(file);
        });

        this.set('exerciseData', this.get('DS').peekRecord('exercise', this.get('ID')));

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          detachable: false,
          onDeny: function onDeny() {

            _this.secQueue.clear();
            _this.removeImages.clear();
            _this.queue.clear();
            return true;
          },

          onApprove: function onApprove() {

            _this.removeImages.forEach(function (file) {
              console.log(file);
              _this.get('DS').findRecord('image', file.id).then(function (rec) {
                rec.destroyRecord();
                rec.save();
              });
            });

            _this.queue.forEach(function (file) {

              console.log(file);

              _this.get('DS').findRecord('exercise', _this.get('ID')).then(function (rec) {

                // console.log("sasdasd", exe);
                var newFile = _this.get('DS').createRecord('image', {
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
                _this.get('DS').findRecord('exercise', _this.get('ID')).then(function (rec) {
                  rec.save();
                });
              });
            });

            // this.get('DS').findRecord('image', this.get('ID')).then((rec) => {
            //   rec.save();
            // });

            _this.get('DS').findRecord('exercise', _this.get('ID')).then(function (rec) {
              rec.set('name', _this.get('Name'));
              rec.set('description', _this.get('Description'));
              rec.set('authorName', _this.get('AuthName'));
              rec.set('objective', _this.get('Objective'));
              rec.set('actionStep', _this.get('ActionSteps'));
              rec.set('location', _this.get('Location'));
              rec.set('frequency', _this.get('Frequency'));
              rec.set('duration', _this.get('Duration'));
              rec.set('targetDate', _this.get('TargetDate'));
              rec.set('MMURL', _this.get('MMURL'));
              // rec.set('exercises', this.get('exercises'));
              // rec.set('assessmentTests', this.get('assessmentTests'));
              rec.save().then(function () {
                return true;
              });
            });

            window.location.reload();

            _this.secQueue.clear();
            _this.removeImages.clear();
            _this.queue.clear();
          }
        }).modal('show');
      },

      addObjective: function addObjective() {
        var newObj = this.get('Objective');
        this.get('obj').pushObject(newObj);
        this.set('Objective', "");
      },

      addActionStep: function addActionStep() {
        var newActStep = this.get('ActionSteps');
        this.get('actionStep').pushObject(newActStep);
        this.set('ActionSteps', "");
      },
      deleteNewFile: function deleteNewFile(file) {
        this.get('queue').removeObject(file);
        if (Ember.isEmpty(this.get('queue'))) {
          this.set('flag', false);
        }
      }
    }
  });
});
define('self-start-front-end/components/edit-form', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        DS: Ember.inject.service('store'),
        formData: null,
        fName: Ember.computed.oneWay('formData.name'),
        fDescription: Ember.computed.oneWay('formData.description'),

        modalName: Ember.computed(function () {
            return 'formData' + this.get('ID');
        }),

        actions: {
            openModal: function openModal() {
                var _this = this;

                this.set('formData', this.get('DS').peekRecord('form', this.get('ID')));

                Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
                    closeable: false,
                    transaction: 'horizontal flip',
                    detachable: false,
                    onDeny: function onDeny() {
                        return true;
                    },

                    onApprove: function onApprove() {
                        _this.get('DS').findRecord('form', _this.get('ID')).then(function (rec) {
                            rec.set('name', _this.get('fName')), rec.set('description', _this.get('fDescription')), rec.save().then(function () {
                                return true;
                            });
                        });
                    }
                }).modal('show');
            }
        }
    });
});
define('self-start-front-end/components/edit-gender', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    genderData: null,
    name: Ember.computed.oneWay('genderData.name'),

    modalName: Ember.computed(function () {
      return 'editGender' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        this.set('genderData', this.get('DS').peekRecord('gender', this.get('ID')));

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',

          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
            _this.get('DS').findRecord('gender', _this.get('ID')).then(function (rec) {
              rec.set('name', _this.get('name'));
              rec.save().then(function () {
                return true;
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/edit-patient', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),

    selectedGender: null,
    selectedCountry: null,

    pateintsData: null,

    // title: computed.oneWay('pateintsData.title'),
    // body: computed.oneWay('pateintsData.body'),

    tagName: '',

    init: function init() {
      this._super.apply(this, arguments);

      var date = this.get('pateintsData').get('dateOfBirth');
      var dateString = date.toISOString().substring(0, 10);
      this.set('selectedDate', dateString);

      this.set('selectedGender', this.get('pateintsData').get('gender'));
      this.set('selectedCountry', this.get('pateintsData').get('country'));
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);

      // let date = this.get('DOB');
      // this.set('selectedDate', date.toISOString().substring(0, 10));


      Ember.$(document).ready(function ($) {
        if ($('.floating-labels').length > 0) floatLabels();

        function floatLabels() {
          var inputFields = $('.floating-labels .cd-label').next();
          inputFields.each(function () {
            var singleInput = $(this);
            //check if  is filling one of the form fields
            checkVal(singleInput);
            singleInput.on('change keyup', function () {
              checkVal(singleInput);
            });
          });
        }

        function checkVal(inputField) {
          inputField.val() == '' ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
        }
      });
    },


    conutryModel: Ember.computed(function () {
      return this.get('DS').findAll('country');
    }),

    genderModel: Ember.computed(function () {
      return this.get('DS').findAll('gender');
    }),

    modalName: Ember.computed(function () {
      return 'editPatient' + this.get('pateintsData').id;
    }),

    actions: {
      assignDate: function assignDate(date) {
        this.set('selectedDate', date);
      },
      selectGender: function selectGender(gender) {
        this.set('selectedGender', gender);
      },
      selectCountry: function selectCountry(country) {
        this.set('selectedCountry', country);
      },


      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          centered: false,
          dimmerSettings: { opacity: 0.25 },
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {
            _this.get('DS').findRecord('patient', _this.get('pateintsData').id).then(function (rec) {
              rec.set('familyName', _this.get('pateintsData.familyName'));
              rec.set('givenName', _this.get('pateintsData.givenName'));
              rec.set('email', _this.get('pateintsData.email'));
              rec.set('streetName', _this.get('pateintsData.streetName'));
              rec.set('streetNumber', _this.get('pateintsData.streetNumber'));
              rec.set('apartment', _this.get('pateintsData.apartment'));
              rec.set('country', _this.get('selectedCountry'));
              // rec.set('province', this.get('province'));
              // rec.set('city', this.get('city'));
              rec.set('healthCardNumber', _this.get('pateintsData.healthCardNumber'));
              rec.set('gender', _this.get('selectedGender'));
              rec.set('dateOfBirth', new Date(_this.get('selectedDate')));
              rec.set('phoneNumber', _this.get('pateintsData.phoneNumber'));
              rec.set('postalCode', _this.get('pateintsData.postalCode'));

              rec.save().then(function () {
                return true;
              });
            });
          }
        }).modal('show');
      }
    }

  });
});
define('self-start-front-end/components/edit-physiotherapist', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    routing: Ember.inject.service('-routing'),
    physiotherapistData: null,

    tagName: '',

    didRender: function didRender() {
      this._super.apply(this, arguments);

      Ember.$(document).ready(function ($) {
        if ($('.floating-labels').length > 0) floatLabels();

        function floatLabels() {
          var inputFields = $('.floating-labels .cd-label').next();
          inputFields.each(function () {
            var singleInput = $(this);
            //check if user is filling one of the form fields
            checkVal(singleInput);
            singleInput.on('change keyup', function () {
              checkVal(singleInput);
            });
          });
        }

        function checkVal(inputField) {
          inputField.val() == '' ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
        }
      });
    },


    conutryModel: Ember.computed(function () {
      return this.get('DS').findAll('country');
    }),

    genderModel: Ember.computed(function () {
      return this.get('DS').findAll('gender');
    }),

    maritalStatusModel: Ember.computed(function () {
      return this.get('DS').findAll('maritalStatus');
    }),

    modalName: Ember.computed(function () {
      return 'edit-physiotherapist' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          detachable: false,
          transition: 'fly down',

          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {

            _this.get('DS').find('physiotherapest', _this.get('ID')).then(function (physiotherapest) {

              physiotherapest.destroyRecord();
            });
          }
        }).modal('show');
      },

      addPatient: function addPatient() {
        this.set('isEditing', true);
      },
      assignDate: function assignDate(date) {
        this.set('selectedDate', date);
      },
      cancel: function cancel() {
        return true;
      },


      save: function save() {
        var _this2 = this;

        this.get('DS').findRecord('physiotherapest', this.get('physiotherapistData').id).then(function (rec) {
          rec.set('familyName', _this2.get('physiotherapistData.familyName'));
          rec.set('givenName', _this2.get('physiotherapistData.givenName'));
          rec.set('email', _this2.get('physiotherapistData.email'));
          rec.set('dateHired', _this2.get('physiotherapistData.dateHired'));
          rec.set('datefired', _this2.get('physiotherapistData.dateFired'));
          rec.set('treatment', _this2.get('physiotherapistData.treatment'));
          rec.set('account', _this2.get('physiotherapistData.account'));
        });

        var self = this;

        var physiotherapist = this.get('DS').createRecord('physiotherapest', {
          familyName: self.get('familyName'),
          givenName: self.get('givenName'),
          email: self.get('email'),
          dateHired: self.get('dateHired'),
          dateFired: self.get('dateFired'),
          treatment: self.get('treatment'),
          account: self.get('account')

        });

        rec.save().then(function () {
          _this2.get('routing').transitionTo('physiotherapists');
        });
      }
    }

  });
});
define('self-start-front-end/components/edit-rehabplan', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    rehabilitationplansData: null,
    description: Ember.computed.oneWay('rehabilitationplansData.description'),
    physioID: Ember.computed.oneWay('rehabilitationplansData.physioID'),
    goal: Ember.computed.oneWay('rehabilitationplansData.goal'),
    timeToComplete: Ember.computed.oneWay('rehabilitationplansData.timeToComplete'),
    planName: Ember.computed.oneWay('rehabilitationplansData.planName'),
    exercises: Ember.computed.oneWay('rehabilitationplansData.exercises'),
    assessmentTests: Ember.computed.oneWay('rehabilitationplansData.assessmentTests'),

    modalName: Ember.computed(function () {
      return 'editRehabilitationplan' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        this.set('rehabilitationplansData', this.get('DS').peekRecord('rehabilitationplan', this.get('ID')));

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          detachable: false,
          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
            _this.get('DS').findRecord('rehabilitationplan', _this.get('ID')).then(function (rec) {
              rec.set('planName', _this.get('planName'));
              rec.set('description', _this.get('description'));
              rec.set('physioID', _this.get('physioID'));
              rec.set('goal', _this.get('goal'));
              rec.set('timeToComplete', _this.get('timeToComplete'));
              rec.set('exercises', _this.get('exercises'));
              // rec.set('assessmentTests', this.get('assessmentTests'));
              rec.save().then(function () {
                return true;
              });
            });
          }
        }).modal('show');
      }
    }

  });
});
define('self-start-front-end/components/edit-status', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    statusData: null,
    name: Ember.computed.oneWay('statusData.name'),

    modalName: Ember.computed(function () {
      return 'editStatus' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        this.set('statusData', this.get('DS').peekRecord('maritalStatus', this.get('ID')));

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          detachable: false,

          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
            _this.get('DS').findRecord('maritalStatus', _this.get('ID')).then(function (rec) {
              rec.set('name', _this.get('name'));
              rec.save().then(function () {
                return true;
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/ember-scrollable', ['exports', 'ember-scrollable/components/ember-scrollable'], function (exports, _emberScrollable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberScrollable.default;
    }
  });
});
define('self-start-front-end/components/ember-scrollbar', ['exports', 'ember-scrollable/components/ember-scrollbar'], function (exports, _emberScrollbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberScrollbar.default;
    }
  });
});
define('self-start-front-end/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define("self-start-front-end/components/illiquid-model", ["exports", "liquid-fire/components/illiquid-model"], function (exports, _illiquidModel) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _illiquidModel.default;
    }
  });
});
define('self-start-front-end/components/labeled-radio-button', ['exports', 'ember-radio-button/components/labeled-radio-button'], function (exports, _labeledRadioButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _labeledRadioButton.default;
    }
  });
});
define('self-start-front-end/components/light-table', ['exports', 'ember-light-table/components/light-table'], function (exports, _lightTable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lightTable.default;
    }
  });
});
define('self-start-front-end/components/light-table/cells/base', ['exports', 'ember-light-table/components/cells/base'], function (exports, _base) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _base.default;
    }
  });
});
define('self-start-front-end/components/light-table/columns/base', ['exports', 'ember-light-table/components/columns/base'], function (exports, _base) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _base.default;
    }
  });
});
define("self-start-front-end/components/liquid-bind", ["exports", "liquid-fire/components/liquid-bind"], function (exports, _liquidBind) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidBind.default;
    }
  });
});
define("self-start-front-end/components/liquid-child", ["exports", "liquid-fire/components/liquid-child"], function (exports, _liquidChild) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidChild.default;
    }
  });
});
define("self-start-front-end/components/liquid-container", ["exports", "liquid-fire/components/liquid-container"], function (exports, _liquidContainer) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidContainer.default;
    }
  });
});
define("self-start-front-end/components/liquid-if", ["exports", "liquid-fire/components/liquid-if"], function (exports, _liquidIf) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidIf.default;
    }
  });
});
define("self-start-front-end/components/liquid-measured", ["exports", "liquid-fire/components/liquid-measured"], function (exports, _liquidMeasured) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidMeasured.default;
    }
  });
  Object.defineProperty(exports, "measure", {
    enumerable: true,
    get: function () {
      return _liquidMeasured.measure;
    }
  });
});
define("self-start-front-end/components/liquid-outlet", ["exports", "liquid-fire/components/liquid-outlet"], function (exports, _liquidOutlet) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidOutlet.default;
    }
  });
});
define("self-start-front-end/components/liquid-spacer", ["exports", "liquid-fire/components/liquid-spacer"], function (exports, _liquidSpacer) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidSpacer.default;
    }
  });
});
define('self-start-front-end/components/liquid-sync', ['exports', 'liquid-fire/components/liquid-sync'], function (exports, _liquidSync) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _liquidSync.default;
    }
  });
});
define("self-start-front-end/components/liquid-unless", ["exports", "liquid-fire/components/liquid-unless"], function (exports, _liquidUnless) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidUnless.default;
    }
  });
});
define("self-start-front-end/components/liquid-versions", ["exports", "liquid-fire/components/liquid-versions"], function (exports, _liquidVersions) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidVersions.default;
    }
  });
});
define('self-start-front-end/components/lt-body', ['exports', 'ember-light-table/components/lt-body'], function (exports, _ltBody) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ltBody.default;
    }
  });
});
define('self-start-front-end/components/lt-column-resizer', ['exports', 'ember-light-table/components/lt-column-resizer'], function (exports, _ltColumnResizer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ltColumnResizer.default;
    }
  });
});
define('self-start-front-end/components/lt-foot', ['exports', 'ember-light-table/components/lt-foot'], function (exports, _ltFoot) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ltFoot.default;
    }
  });
});
define('self-start-front-end/components/lt-head', ['exports', 'ember-light-table/components/lt-head'], function (exports, _ltHead) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ltHead.default;
    }
  });
});
define('self-start-front-end/components/lt-infinity', ['exports', 'ember-light-table/components/lt-infinity'], function (exports, _ltInfinity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ltInfinity.default;
    }
  });
});
define('self-start-front-end/components/lt-row', ['exports', 'ember-light-table/components/lt-row'], function (exports, _ltRow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ltRow.default;
    }
  });
});
define('self-start-front-end/components/lt-scrollable', ['exports', 'ember-light-table/components/lt-scrollable'], function (exports, _ltScrollable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ltScrollable.default;
    }
  });
});
define('self-start-front-end/components/lt-spanned-row', ['exports', 'ember-light-table/components/lt-spanned-row'], function (exports, _ltSpannedRow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ltSpannedRow.default;
    }
  });
});
define('self-start-front-end/components/manage-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'Manage-form' + this.get('ID');
    }),

    edit: false,

    questionsModel: Ember.computed(function () {
      return this.get('DS').findAll('question');
    }),

    actions: {
      addQuestion: function addQuestion(thisQuestion, thisForm, qid) {
        thisForm.get('questions').pushObject(thisQuestion);
        thisQuestion.get('forms').pushObject(thisForm);

        this.get('DS').findRecord('form', this.get('ID')).then(function (rec) {
          rec.save().then(function () {});
        });

        this.get('DS').findRecord('question', qid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      manageForm: function manageForm() {
        this.set('edit', true);
      },
      done: function done() {
        this.set('edit', false);
      },


      openModal: function openModal() {
        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closeable: false,
          detachable: false,
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {
            return true;
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/manage-patients', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service(),

    limit: 10,
    offset: 0,
    pageSize: 10,
    sort: 'givenName',
    dir: '',
    // givenNameDir: '',
    // familyNameDir: '',
    // emailDir: '',
    // phoneNumberDir: '',
    // addressDir: '',
    query: null,
    flagDelete: false,
    modelAttributes: [{ 'key': 'givenName', 'name': 'First Name', 'dir': 'asc', 'class': 'left aligned two wide column' }, { 'key': 'familyName', 'name': 'Last Name', 'dir': '', 'class': 'left aligned two wide column' }, { 'key': 'dateOfBirth', 'name': 'Date of Birth', 'dir': '', 'class': 'left aligned five wide column' },
    // {'key': 'address', 'name':'Address'},
    { 'key': 'email', 'name': 'Email', 'dir': '', 'class': 'left aligned four wide column' }],
    // {'key': 'phoneNumber', 'name':'Phone Number'}],

    patientsModel: [],
    INDEX: null,
    queryPath: 'givenName',
    scrolledLines: 0,

    activeModel: Ember.observer('offset', 'limit', 'sort', 'dir', 'flagDelete', function () {
      var self = this;

      this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('patientsModel', records.toArray());
      });
    }),

    filterpateints: Ember.observer('query', 'queryPath', function () {
      var _this = this;

      var queryText = this.get('query');
      if (queryText !== null && queryText.length > 0) {
        this.set('regex', "^" + queryText);
      } else {
        this.set('regex', '');
      }

      this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        _this.set('patientsModel', records.toArray());
      });
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this.set('limit', 10);
      this.set('offset', 0);
      this.set('pageSize', 10);
      var self = this;
      //  this.set('modelAttributes', Object.keys(this.get('store').createRecord('patient').toJSON()));
      this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('patientsModel', records.toArray());
      });
    },


    dateFormat: Ember.computed(function (date) {
      console.log(date);
      var dateString = date.toISOString().substring(0, 10);
      return dateString;
    }),

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this.bindScrolling();
    },
    willRemoveElement: function willRemoveElement() {
      this._super.apply(this, arguments);
      this.unbindScrolling();
    },
    scrolled: function scrolled() {
      if (this.get('scrolledLines') < Ember.$("#myWindow").scrollTop()) {
        this.set('scrolledLines', Ember.$("#myWindow").scrollTop());
        this.set('limit', this.get('limit') + 10);
      }
    },

    bindScrolling: function bindScrolling() {
      var self = this;
      var onScroll = function onScroll() {
        Ember.run.debounce(self, self.scrolled, 500);
      };
      Ember.$("#myWindow").bind('touchmove', onScroll);
      Ember.$("#myWindow").bind('scroll', onScroll);
    },

    unbindScrolling: function unbindScrolling() {
      Ember.$("#myWindow").unbind('scroll');
      Ember.$("#myWindow").unbind('touchmove');
    },

    actions: {
      toggleDetail: function toggleDetail(ID) {

        if (this.get('isShowing') === ID) this.set('isShowing', null);else this.set('isShowing', ID);
      },
      editpatient: function editpatient(ID) {
        if (this.get('isEditing') === ID) this.set('isEditing', null);else this.set('isEditing', ID);
      },
      sortColumn: function sortColumn(columnName, direction) {
        var _this2 = this;

        this.get('modelAttributes').forEach(function (element) {
          if (element.key === columnName) {
            if (direction === 'asc') {
              Ember.set(element, 'dir', 'desc');
              _this2.set('dir', 'desc');
            } else if (direction === 'desc') {
              Ember.set(element, 'dir', 'asc');
              _this2.set('dir', 'asc');
            } else {
              Ember.set(element, 'dir', 'asc');
              _this2.set('dir', 'asc');
            }
          } else Ember.set(element, 'dir', '');
        });
        this.set('sort', columnName);
      },


      loadNext: function loadNext() {
        this.set('offset', this.get('offset') + this.get('pageSize'));
      },

      loadPrevious: function loadPrevious() {
        if (this.get('offset') >= this.get('pageSize')) {

          this.set('offset', this.get('offset') - this.get('pageSize'));
        }
      }
    }
  });
});
define('self-start-front-end/components/modify-question', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    questionData: null,
    questionText: Ember.computed.oneWay('questionData.questionText'),
    helpDescription: Ember.computed.oneWay('questionData.helpDescription'),
    questionType: Ember.computed.oneWay('questionData.type'),
    multipleChoice: false,
    opt2: false,
    opt3: false,
    opt4: false,
    opt5: false,
    opt6: false,
    opt1String: " ",
    opt2String: " ",
    opt3String: " ",
    opt4String: " ",
    opt5String: " ",
    opt6String: " ",
    optString: " ",

    modalName: Ember.computed(function () {
      return 'questionData' + this.get('ID');
    }),
    actions: {

      isMultipleChoice: function isMultipleChoice() {
        // console.log(this.get('questionData.type'));
        if (this.get('questionData.type') === "Multiple choice") {
          this.set('multipleChoice', true);
          var breakdown = this.get('questionData.optionString').split('+++');

          if (this.get('questionData.optionNumber') === 6) {
            this.set('opt2', true);
            this.set('opt3', true);
            this.set('opt4', true);
            this.set('opt5', true);
            this.set('opt6', true);
            for (var i = 0; i < 6; i++) {
              this.set('opt' + (i + 1) + 'String', breakdown[i]);
            }
          } else if (this.get('questionData.optionNumber') === 5) {
            this.set('opt2', true);
            this.set('opt3', true);
            this.set('opt4', true);
            this.set('opt5', true);
            for (var j = 0; j < 5; j++) {
              this.set('opt' + (j + 1) + 'String', breakdown[j]);
            }
          } else if (this.get('questionData.optionNumber') === 4) {
            this.set('opt2', true);
            this.set('opt3', true);
            this.set('opt4', true);
            for (var k = 0; k < 4; k++) {
              this.set('opt' + (k + 1) + 'String', breakdown[k]);
            }
          } else if (this.get('questionData.optionNumber') === 3) {
            this.set('opt2', true);
            this.set('opt3', true);
            for (var l = 0; l < 3; l++) {
              this.set('opt' + (l + 1) + 'String', breakdown[l]);
            }
          } else if (this.get('questionData.optionNumber') === 2) {
            this.set('opt2', true);
            for (var m = 0; m < 2; m++) {
              this.set('opt' + (m + 1) + 'String', breakdown[m]);
            }
          }
        } else this.set('multipleChoice', false);
      },

      openModal: function openModal() {
        var _this = this;

        this.set('questionData', this.get('DS').peekRecord('question', this.get('ID')));

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closeable: false,
          transaction: 'horizontal flip',
          detachable: false,
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {
            if (_this.get('questionData.type') === "Multiple choice") {
              _this.set('optString', "");
              for (var i = 0; i < _this.get('questionData.optionNumber'); i++) {
                _this.set('optString', _this.get('optString') + _this.get('opt' + (i + 1) + 'String'));
                _this.set('optString', _this.get('optString') + '+++');
              }
            }
            _this.get('DS').findRecord('question', _this.get('ID')).then(function (rec) {
              rec.set('questionText', _this.get('questionText'));
              rec.set('optionString', _this.get('optString'));
              rec.set('helpDescription', _this.get('helpDescription'));
              rec.save().then(function () {
                return true;
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/nav-bar', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    DS: Ember.inject.service('store'),

    model: null,
    loggedOut: !localStorage.getItem('loggedIn'),
    ajax: Ember.inject.service(),
    temp: false,

    authentication: function authentication() {
      if (localStorage.getItem('temp')) {
        return this.get('ajax').request('http://localhost:8082/Authenticate', {
          method: 'POST',
          data: {
            email: this.get('Email'),
            password: this.get('PWord')
          },
          success: function success(res) {
            localStorage.setItem('id_token', res.token);
            localStorage.setItem('user_level', res.user.account.accType);
            localStorage.setItem('_id', res.user._id);
            localStorage.setItem('loggedIn', true);
          }
        });
      } else {
        console.log("NOT AN ACC");
      }
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);
      // if(localStorage.getItem('loggedIn')){
      //   this.set('loggedOut', false);
      // }
    },
    init: function init() {
      this._super.apply(this, arguments);

      if (Ember.$(window).width() > 600) {
        Ember.$('body').visibility({
          offset: -10,
          observeChanges: false,
          once: false,
          continuous: false,
          onTopPassed: function onTopPassed() {
            requestAnimationFrame(function () {
              Ember.$('.following.bar').addClass('light fixed').find('.menu').removeClass('inverted');
              Ember.$('.following .additional.item').transition('scale in', 750);
            });
          },
          onTopPassedReverse: function onTopPassedReverse() {
            requestAnimationFrame(function () {
              Ember.$('.following.bar').removeClass('light fixed').find('.menu').addClass('inverted').find('.additional.item').transition('hide');
            });
          }
        });
      }
      Ember.$('.additional.item').popup({
        delay: {
          show: 200,
          hide: 50
        },
        position: 'bottom center'
      });

      var $menu = Ember.$('#toc'),
          $tocSticky = Ember.$('.toc .ui.sticky'),
          $fullHeightContainer = Ember.$('.pusher > .full.height');

      // create sidebar sticky
      requestAnimationFrame(function () {
        $tocSticky.sticky({
          silent: true,
          container: Ember.$('html'),
          context: $fullHeightContainer
        });
      });

      // main sidebar
      $menu.sidebar({
        dimPage: true,
        transition: 'overlay',
        mobileTransition: 'uncover'
      });

      // launch buttons
      $menu.sidebar('attach events', '.launch.button, .view-ui, .launch.item');
    },


    actions: {
      logout: function logout() {
        localStorage.clear();
        // localStorage.setItem('loggedIn', false);
        this.set('loggedOut', true);
        // console.log(this.loggedOut)
      },
      deny: function deny() {
        Ember.$('.ui.login.modal').modal('hide');
      },
      submit: function submit() {
        localStorage.setItem('temp', false);
        this.get('ajax').request('http://localhost:8082/patients/' + this.get('Email'), {
          method: 'GET',
          success: function success(res) {
            console.log(res);
            if (res.patient) {
              console.log("THIS IS A CLIENT");
              localStorage.setItem('temp', true);
            }
          }
        });
        this.get('ajax').request('http://localhost:8082/administrators/' + this.get('Email'), {
          method: 'GET',
          success: function success(res) {
            if (res.admin) {
              console.log("THIS IS A Admin");
              localStorage.setItem('temp', true);
            }
          }
        });

        this.get('ajax').request('http://localhost:8082/physiotherapests/' + this.get('Email'), {
          method: 'GET',
          success: function success(res) {
            if (res.physio) {
              console.log("THIS IS A Physio");
              localStorage.setItem('temp', true);
            }
          }
        });

        // if(localStorage.getItem('temp')) {
        this.authentication();
        this.set('loggedOut', false);
        Ember.$('.ui.login.modal').modal('hide');
        // } else {
        // console.log("NOT AN ACCOUNT");
        // }
      },


      openModal: function openModal() {

        Ember.$('.ui.login.modal').modal({
          // closable: false,

        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/parse-question', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        init: function init() {
            this._super();
            if (this.get('name.type') == "Multiple choice") {
                this.set('multiplechoice', true);
                var breakdown = this.get('name.questionText').split('+++');
                this.set("string", breakdown[0]);
            }
        },

        multiplechoice: false,
        string: ""
    });
});
define('self-start-front-end/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _powerSelectMultiple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectMultiple.default;
    }
  });
});
define('self-start-front-end/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('self-start-front-end/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _powerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelect.default;
    }
  });
});
define('self-start-front-end/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _beforeOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _beforeOptions.default;
    }
  });
});
define('self-start-front-end/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _options) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _options.default;
    }
  });
});
define('self-start-front-end/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _placeholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _placeholder.default;
    }
  });
});
define('self-start-front-end/components/power-select/power-select-group', ['exports', 'ember-power-select/components/power-select/power-select-group'], function (exports, _powerSelectGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectGroup.default;
    }
  });
});
define('self-start-front-end/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _searchMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _searchMessage.default;
    }
  });
});
define('self-start-front-end/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('self-start-front-end/components/radio-button-input', ['exports', 'ember-radio-button/components/radio-button-input'], function (exports, _radioButtonInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _radioButtonInput.default;
    }
  });
});
define('self-start-front-end/components/radio-button', ['exports', 'ember-radio-button/components/radio-button'], function (exports, _radioButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _radioButton.default;
    }
  });
});
define('self-start-front-end/components/range-slider', ['exports', 'ui-slider/components/range-slider'], function (exports, _rangeSlider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _rangeSlider.default;
    }
  });
});
define('self-start-front-end/components/register-user', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    router: Ember.inject.service('-routing'),

    model: null,
    AllPatients: null,
    UserName: null,
    Password: null,
    FamilyName: null,
    GivenName: null,
    IEmail: null,
    DateOfBirth: null,
    PhoneNumber: null,
    HealthCardNumber: null,
    Occupation: null,
    MaritalStatus: null,
    Gender: null,
    Country: null,
    ICity: null,
    Province: null,
    StreetNumber: null,
    StreetName: null,
    PostalCode: null,
    Appartment: null,

    actions: {
      deny: function deny() {
        Ember.$('.ui.register.modal').modal('hide');
      },
      submit: function submit() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.get('Email'))) {
          console.log("BAD EMAIL");
          return false;
        }

        this.set("UserName", this.get('UName'));
        this.set("Password", this.get('PWord'));
        // this.set("FamilyName", this.get('FName'));
        // this.set("GivenName", this.get('GName'));
        this.set("IEmail", this.get('Email'));
        // this.set("DateOfBirth", this.get('DOB'));
        // this.set("PhoneNumber", this.get('PNumber'));
        // this.set("HealthCardNumber", this.get('HCN'));
        // this.set("Occupation", this.get('Occ'));
        // this.set("MaritalStatus", this.get('MStatus'));
        // this.set('Gender', this.get('GDer'));
        // this.set("Country", this.get('Ctry'));
        // this.set("ICity", this.get('City'));
        // this.set("Province", this.get('Prov'));
        // this.set("Appartment", this.get('Apptmnt'));
        // this.set("StreetNumber", this.get('SNumber'));
        // this.set("StreetName", this.get('SName'));
        // this.set("PostalCode", this.get('PCode'));

        var acc = {};
        acc['userAccountName'] = this.UserName;
        acc['encryptedPassword'] = this.Password;
        console.log(this.Password);

        // let client = this.get('DS').createRecord('patient', {
        //   familyName: this.FamilyName,
        //   givenName: this.GivenName,
        //   email: this.IEmail,
        //   dateOfBirth: this.DateOfBirth,
        //   phoneNumber: this.PhoneNumber,
        //   healthCardNumber: this.HealthCardNumber,
        //   occupation: this.Occupation,
        //   maritalStatus: this.MaritalStatus,
        //   gender: this.Gender,
        //   country: this.Country,
        //   cities: this.ICity,
        //   provinces: this.Province,
        //   apartment: this.Appartment,
        //   streetNumber: this.StreetNumber,
        //   streetName: this.StreetName,
        //   postalCode: this.PostalCode,
        //   account: {
        //     userAccountName: this.UserName,
        //     encryptedPassword: this.Password
        //   }
        // });

        console.log("djkjkfd");
        //
        // this.get("ajax").request("http://localhost:8082/patients",{
        //   method: 'POST',
        //   data:{
        //     client: client
        //   }
        // })
        localStorage.setItem("UName", this.get('UName'));
        localStorage.setItem("Email", this.get('Email'));
        localStorage.setItem("Pass", this.get('PWord'));
        Ember.$('.ui.register.modal').modal('hide');
        this.get('router').transitionTo('register');

        // client.save().then((client) => {
        //   this.get('router').transitionTo('register');
        //   // $('.ui.register.modal').modal('hide');
        //
        // });
      },


      openModal: function openModal() {
        console.log("model", this.model);
        Ember.$('.ui.register.modal').modal({
          // closable: false,
          // detachable: false,

        }).modal('show');
      }
    }

  });
});
define('self-start-front-end/components/resize-detector', ['exports', 'ember-element-resize-detector/components/resize-detector'], function (exports, _resizeDetector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _resizeDetector.default;
    }
  });
});
define('self-start-front-end/components/scroll-content-element', ['exports', 'ember-scrollable/components/scroll-content-element'], function (exports, _scrollContentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _scrollContentElement.default;
    }
  });
});
define('self-start-front-end/components/show-form-questions', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        DS: Ember.inject.service('store'),
        initialized: false,
        order: [],
        arr: [],
        actions: {
            removeQuestion: function removeQuestion(q, f, qid, fid) {
                f.get('questions').removeObject(q);
                q.get('forms').removeObject(f);

                console.log(fid);
                this.get('DS').findRecord('form', fid).then(function (rec) {
                    rec.save().then(function () {});
                });

                this.get('DS').findRecord('question', qid).then(function (rec) {
                    rec.save().then(function () {});
                });
            },
            orderChange: function orderChange(q, f, fid) {
                var thisForm = this;
                if (!this.initialized) {
                    for (var x = 0; x < f.get('questions').get('length'); x++) {
                        this.order[x] = x + 1;
                    }
                    this.set('initialized', true);
                }
                console.log(this.order);
                var value = this.$('option:selected').val();
                var indexb = f.get('questions').indexOf(q);
                var option = this.$('option:selected');
                console.log(value);
                console.log(option);

                var temp = this.order[value];
                this.order[value] = this.order[indexb];
                this.order[indexb] = temp;

                console.log(this.order);

                // f.get('questions').forEach(function(q) {
                //     arr.pushObject(q);
                // });
                //     let tmp = arr.objectAt(indexb);
                //    // f.get('questions').removeAt(indexb);
                //    // f.get('questions').insertAt(value, tmp);  
                //     arr.replace(indexb, 1,arr.objectAt(value));  
                //     arr.replace(value, 1,tmp);  
                //     console.log(arr);
                // this.get('DS').findRecord('form', fid).then((rec) => {
                //     rec.save().then(()=>{
                //     });
                // });

                // window.location.reload();
            },
            save: function save(f, fid) {
                for (var x = 0; x < this.order.length; x++) {
                    this.arr[x] = f.get('questions').objectAt(this.order[x] - 1);
                }
                console.log(this.arr);

                f.get('questions').clear();
                for (var x = 0; x < this.order.length; x++) {
                    f.get('questions').pushObject(this.arr[x]);
                }
                this.get('DS').findRecord('form', fid).then(function (rec) {
                    rec.save().then(function () {});
                });
                window.location.reload();
            }
        }
    });
});
define('self-start-front-end/components/show-patient', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    dateFormat: Ember.computed(function () {
      var date = this.get('model').get('dateOfBirth');
      var dateString = date.toISOString().substring(0, 10);
      return dateString;
    })
  });
});
define('self-start-front-end/components/simple-example', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    ImageIsAdding: false,

    model: Ember.computed(function () {
      return this.get('DS').findAll('image');
    }),

    actions: {
      deleteImage: function deleteImage(file) {
        file.destroyRecord();
      },
      addNewImage: function addNewImage() {
        this.set('ImageIsAdding', true);
      }
    }
  });
});
define('self-start-front-end/components/stylish-button', ['exports', 'ember-stylish-buttons/components/stylish-button', 'self-start-front-end/config/environment'], function (exports, _stylishButton, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var config = _environment.default['ember-stylish-buttons'] || {};

  exports.default = _stylishButton.default.extend({
    type: config.defaultTheme || 'winona'
  });
});
define('self-start-front-end/components/ui-accordion', ['exports', 'semantic-ui-ember/components/ui-accordion'], function (exports, _uiAccordion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiAccordion.default;
    }
  });
});
define('self-start-front-end/components/ui-checkbox', ['exports', 'semantic-ui-ember/components/ui-checkbox'], function (exports, _uiCheckbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiCheckbox.default;
    }
  });
});
define('self-start-front-end/components/ui-dimmer', ['exports', 'semantic-ui-ember/components/ui-dimmer'], function (exports, _uiDimmer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiDimmer.default;
    }
  });
});
define('self-start-front-end/components/ui-dropdown', ['exports', 'semantic-ui-ember/components/ui-dropdown'], function (exports, _uiDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiDropdown.default;
    }
  });
});
define('self-start-front-end/components/ui-embed', ['exports', 'semantic-ui-ember/components/ui-embed'], function (exports, _uiEmbed) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiEmbed.default;
    }
  });
});
define('self-start-front-end/components/ui-modal', ['exports', 'semantic-ui-ember/components/ui-modal'], function (exports, _uiModal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiModal.default;
    }
  });
});
define('self-start-front-end/components/ui-nag', ['exports', 'semantic-ui-ember/components/ui-nag'], function (exports, _uiNag) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiNag.default;
    }
  });
});
define('self-start-front-end/components/ui-popup', ['exports', 'semantic-ui-ember/components/ui-popup'], function (exports, _uiPopup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiPopup.default;
    }
  });
});
define('self-start-front-end/components/ui-progress', ['exports', 'semantic-ui-ember/components/ui-progress'], function (exports, _uiProgress) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiProgress.default;
    }
  });
});
define('self-start-front-end/components/ui-radio', ['exports', 'semantic-ui-ember/components/ui-radio'], function (exports, _uiRadio) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiRadio.default;
    }
  });
});
define('self-start-front-end/components/ui-rating', ['exports', 'semantic-ui-ember/components/ui-rating'], function (exports, _uiRating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiRating.default;
    }
  });
});
define('self-start-front-end/components/ui-search', ['exports', 'semantic-ui-ember/components/ui-search'], function (exports, _uiSearch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiSearch.default;
    }
  });
});
define('self-start-front-end/components/ui-shape', ['exports', 'semantic-ui-ember/components/ui-shape'], function (exports, _uiShape) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiShape.default;
    }
  });
});
define('self-start-front-end/components/ui-sidebar', ['exports', 'semantic-ui-ember/components/ui-sidebar'], function (exports, _uiSidebar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiSidebar.default;
    }
  });
});
define('self-start-front-end/components/ui-slider', ['exports', 'ui-slider/components/ui-slider'], function (exports, _uiSlider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiSlider.default;
    }
  });
});
define('self-start-front-end/components/ui-sticky', ['exports', 'semantic-ui-ember/components/ui-sticky'], function (exports, _uiSticky) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uiSticky.default;
    }
  });
});
define("self-start-front-end/components/upload-file", ["exports", "self-start-front-end/utils/file-object"], function (exports, _fileObject) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    model: null,
    flag: null,
    accept: 'audio/*,video/*,image/*',
    multiple: true,
    queue: [],
    savingInProgress: false,

    labelArray: ['height: 6.25em', 'line-height: 5.25em', 'text-align: center'],

    inputStyle: Ember.computed(function () {
      var style_array = ['opacity: 0', 'width:100% !important', 'overflow:hidden', 'position:relative', 'left:-100%', 'display:block'];
      return Ember.String.htmlSafe(style_array.join(';'));
    }),

    labelStyle: Ember.computed('labelArray', function () {
      return Ember.String.htmlSafe(this.get('labelArray').join(';'));
    }),

    dragLeave: function dragLeave(event) {
      event.preventDefault();
      this.set('labelArray', ['height: 6.25em', 'line-height: 5.25em', 'text-align: center']);
      return this.set('dragClass', 'deactivated');
    },

    dragOver: function dragOver() {
      this.set('labelArray', ['height: 6.25em', 'line-height: 5.25em', 'text-align: center', 'background: green']);
    },

    drop: function drop() {
      this.set('labelArray', ['height: 6.25em', 'line-height: 5.25em', 'text-align: center']);
    },

    actions: {
      selectFile: function selectFile(data) {
        if (!Ember.isEmpty(data.target.files)) {
          for (var i = data.target.files.length - 1; i >= 0; i--) {
            var file = _fileObject.default.create({
              fileToUpload: data.target.files[i],
              maximumFileSize: this.get('maximumFileSize')
            });
            this.get('queue').pushObject(file);
          }
        }
      },

      deleteFile: function deleteFile(file) {
        this.get('queue').removeObject(file);
        if (Ember.isEmpty(this.get('queue'))) {
          this.set('flag', false);
        }
      },

      deleteAllFiles: function deleteAllFiles() {
        this.get('queue').clear();
        this.set('flag', false);
      },

      saveFile: function saveFile(file) {
        var _this = this;

        console.log(this.get('queue'));
        var newFile = this.get('DS').createRecord(this.get('model'), {
          name: file.name,
          size: file.size,
          type: file.type,
          rawSize: file.rawSize,
          imageData: file.base64Image
        });
        newFile.save().then(function () {
          _this.get('queue').removeObject(file);

          if (Ember.isEmpty(_this.get('queue'))) {
            _this.set('flag', false);
          }
        });
      },

      saveAllFiles: function saveAllFiles() {
        var _this2 = this;

        this.set('savingInProgress', true);
        var counter = 0;
        this.get('queue').forEach(function (file) {
          if (file.isDisplayableImage) {
            var newFile = _this2.get('DS').createRecord(_this2.get('model'), {
              name: file.name,
              size: file.size,
              type: file.type,
              rawSize: file.rawSize,
              imageData: file.base64Image
            });
            newFile.save().then(function () {
              counter++;
              if (_this2.get('queue').length == counter) {
                _this2.get('queue').clear();
                _this2.set('flag', false);
                _this2.set('savingInProgress', false);
              }
            });
          } else {
            counter++;
          }
        });
      },

      done: function done() {
        this.get('queue').clear();
        this.set('flag', false);
      }
    }
  });
});
define('self-start-front-end/components/user-info', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    router: Ember.inject.service('-routing'),
    loggedOut: false,
    tagName: '',

    init: function init() {
      this._super.apply(this, arguments);

      this.set('familyName', '');
      this.set('givenName', '');
      this.set('email', '');
      this.set('streetName', '');
      this.set('streetNumber', '');
      this.set('apartment', '');
      this.set('selectedCountry', '');
      this.set('province', '');
      this.set('city', '');
      this.set('healthCardNumber', '');
      this.set('selectedGender', '');
      this.set('dateOfBirth', '');
      this.set('phoneNumber', '');
      this.set('postalCode', '');
      // this.set('userAccountName', '');
      // this.set('encryptedPassword', '');

      // this.set('selectedGender', this.get('selectedGender'));
      // this.set('selectedCountry', this.get('selectedCountry'));
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);

      Ember.$(document).ready(function ($) {
        if ($('.floating-labels').length > 0) floatLabels();

        function floatLabels() {
          var inputFields = $('.floating-labels .cd-label').next();
          inputFields.each(function () {
            var singleInput = $(this);
            //check if  is filling one of the form fields
            checkVal(singleInput);
            singleInput.on('change keyup', function () {
              checkVal(singleInput);
            });
          });
        }

        function checkVal(inputField) {
          inputField.val() == '' ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
        }
      });
    },


    conutryModel: Ember.computed(function () {
      return this.get('DS').findAll('country');
    }),

    genderModel: Ember.computed(function () {
      return this.get('DS').findAll('gender');
    }),

    actions: {
      assignDate: function assignDate(date) {
        this.set('selectedDate', date);
      },
      selectCountry: function selectCountry(country) {
        this.set('selectedCountry', country);
      },
      selectGender: function selectGender(gender) {
        this.set('selectedGender', gender);
      },
      cancel: function cancel() {
        return true;
      },


      save: function save() {

        var self = this;

        var patientAccount = {};
        patientAccount['userAccountName'] = localStorage.getItem('UName');
        patientAccount['encryptedPassword'] = localStorage.getItem('Pass');

        var patient = this.get('DS').createRecord('patient', {
          familyName: self.get('familyName'),
          givenName: self.get('givenName'),
          email: localStorage.getItem('Email'),
          streetName: self.get('streetName'),
          streetNumber: self.get('streetNumber'),
          apartment: self.get('apartment'),
          country: self.get('selectedCountry'),
          province: self.get('province'),
          city: self.get('city'),
          dateOfBirth: new Date(this.get('selectedDate')),
          healthCardNumber: self.get('healthCardNumber'),
          gender: self.get('selectedGender'),
          phoneNumber: self.get('phoneNumber'),
          postalCode: self.get('postalCode'),
          account: patientAccount
        });

        patient.save().then(function (patient) {
          localStorage.clear();
          // localStorage.setItem('loggedIn', false);
        });
        Ember.$('.ui.register.modal').modal('hide');
        this.get('router').transitionTo('message');
      }
    }

  });
});
define('self-start-front-end/components/user-login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    router: Ember.inject.service('-routing'),
    model: null,
    ajax: Ember.inject.service(),
    temp: false,

    authentication: function authentication() {
      var self = this;
      if (localStorage.getItem('temp')) {
        return this.get('ajax').request('http://localhost:8082/Authenticate', {
          method: 'POST',
          data: {
            email: this.get('Email'),
            password: this.get('PWord')
          },
          success: function success(res) {
            localStorage.setItem('id_token', res.token);
            localStorage.setItem('user_level', res.user.account.accType);
            localStorage.setItem('_id', res.user._id);
            localStorage.setItem('loggedIn', true);
            Ember.$('.ui.login.modal').modal('hide');
            this.get('router').transitionTo('dashboard');
          }
        });
      } else {
        console.log("NOT AN ACC");
      }
    },


    actions: {
      deny: function deny() {
        Ember.$('.ui.login.modal').modal('hide');
      },
      submit: function submit() {

        localStorage.setItem('temp', false);
        this.get('ajax').request('http://localhost:8082/patients/' + this.get('Email'), {
          method: 'GET',
          success: function success(res) {
            console.log(res);
            if (res.patient) {
              console.log("THIS IS A CLIENT");
              localStorage.setItem('temp', true);
            }
          }
        });
        this.get('ajax').request('http://localhost:8082/administrators/' + this.get('Email'), {
          method: 'GET',
          success: function success(res) {
            if (res.admin) {
              console.log("THIS IS A Admin");
              localStorage.setItem('temp', true);
            }
          }
        });

        this.get('ajax').request('http://localhost:8082/physiotherapests/' + this.get('Email'), {
          method: 'GET',
          success: function success(res) {
            if (res.physio) {
              console.log("THIS IS A Physio");
              localStorage.setItem('temp', true);
            }
          }
        });

        // if(localStorage.getItem('temp')) {
        this.authentication();

        // } else {
        // console.log("NOT AN ACCOUNT");
        // }
      },

      logout: function logout() {
        localStorage.clear();
      },

      openModal: function openModal() {

        Ember.$('.ui.login.modal').modal({
          // closable: false,

        }).modal('show');
      }
    }

  });
});
define('self-start-front-end/components/vertical-collection', ['exports', '@html-next/vertical-collection/components/vertical-collection/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
define('self-start-front-end/components/view-appointment', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),
    isEditing: false,
    selectedclient: null,
    getclient: Ember.computed(function () {
      return this.get('DS').findAll('patient');
    }),

    appointmenthistory: null,

    actions: {
      bookAppointment: function bookAppointment() {
        this.set('isEditing', true);
      },
      cancelbookingappointment: function cancelbookingappointment() {
        this.set('isEditing', false);
      },
      updateValue: function updateValue(physio) {
        this.set('selectedphysio', this.get('DS').peekRecord('physiotherapest', physio));
        //get associated physiotherapist schedule
        var container = this.get('selectedphysio').get('appointments').filter(function (item) {
          var cur_time = new Date();
          cur_time = cur_time.toISOString();
          return item.get('date') > cur_time;
        });
        //set appointment filter to the container
        this.set('appointments_filter', container);
      }
    }

  });
});
define('self-start-front-end/components/view-schedule', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),
    selectedphysio: null,
    physios: null,
    appointments_filter: null,
    isEditing: false,
    event: "event-1",

    availablespot: [],

    dragFinishText: false,
    dragStartedText: false,
    dragEndedText: false,
    myObject: { id: 1, name: 'objectName' },

    weekdate: [],
    init: function init() {
      this._super();
      var d = new Date();
      for (var i = 0; i < d.getDay(); i++) {
        var result = new Date();
        result.setDate(result.getDate() + -d.getDay());
        this.get('weekdate')[i] = result.toDateString();
      }
      this.get('weekdate')[d.getDay()] = d.toDateString();
      for (var _i = d.getDay(); _i < 6; _i++) {
        var _result = new Date();
        _result.setDate(d.getDate() + _i);
        this.get('weekdate')[_i + 1] = _result.toDateString();
      }
      this.functionA();
    },

    getphysio: Ember.computed(function () {
      return this.get('DS').findAll('physiotherapest');
    }),
    didRender: function didRender() {
      this.functionA();
    },
    functionA: function functionA() {
      var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
      var transitionsSupported = Ember.$('.csstransitions').length > 0;

      //if browser does not support transitions - use a different event to trigger them
      if (!transitionsSupported) transitionEnd = 'noTransition';

      //should add a loding while the events are organized

      function SchedulePlan(element) {
        this.element = element;
        this.timeline = this.element.find('.timeline');
        this.timelineItems = this.timeline.find('li');
        this.timelineItemsNumber = this.timelineItems.length;
        this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
        //need to store delta (in our case half hour) timestamp
        this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems.eq(1).text()) - getScheduleTimestamp(this.timelineItems.eq(0).text());

        this.eventsWrapper = this.element.find('.events');
        this.eventsGroup = this.eventsWrapper.find('.events-group');
        this.singleEvents = this.eventsGroup.find('.single-event');
        this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();

        this.animating = false;

        this.initSchedule();
      }

      SchedulePlan.prototype.initSchedule = function () {
        this.scheduleReset();
        //this.initEvents();
      };

      SchedulePlan.prototype.scheduleReset = function () {
        var mq = this.mq();
        if (mq == 'desktop' && !this.element.hasClass('js-full')) {
          //in this case you are on a desktop version (first load or resize from mobile)
          this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
          this.element.addClass('js-full');
          this.placeEvents();
          // this.element.hasClass('modal-is-open') && this.checkEventModal();
        } else if (mq == 'mobile' && this.element.hasClass('js-full')) {
          //in this case you are on a mobile version (first load or resize from desktop)
          this.element.removeClass('js-full loading');
          this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
          this.eventsWrapper.children('.grid-line').remove();
        } else {
          this.element.removeClass('loading');
        }
      };

      // SchedulePlan.prototype.initEvents = function () {
      //   var self = this;
      //     this.singleEvents.each(function () {
      //       var durationLabel = '<span class="event-date">' + $(this).data('start') + ' - ' + $(this).data('end') + '</span>';
      //       $(this).children('a').prepend($(durationLabel));
      //     });
      //
      //
      // };

      SchedulePlan.prototype.placeEvents = function () {
        var self = this;
        this.singleEvents.each(function () {
          //place each event in the grid -> need to set top position and height
          var start = getScheduleTimestamp(Ember.$(this).attr('data-start')),
              duration = getScheduleTimestamp(Ember.$(this).attr('data-end')) - start;

          var eventTop = self.eventSlotHeight * (start - self.timelineStart) / self.timelineUnitDuration,
              eventHeight = self.eventSlotHeight * duration / self.timelineUnitDuration;

          Ember.$(this).css({
            top: eventTop - 1 + 'px',
            height: eventHeight + 1 + 'px'
          });
        });

        this.element.removeClass('loading');
      };

      SchedulePlan.prototype.mq = function () {
        //get MQ value ('desktop' or 'mobile')
        var self = this;
        return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
      };

      var schedules = Ember.$('.cd-schedule');
      var objSchedulesPlan = [],
          windowResize = false;

      if (schedules.length > 0) {
        schedules.each(function () {
          //create SchedulePlan objects
          objSchedulesPlan.push(new SchedulePlan(Ember.$(this)));
        });
      }

      Ember.$(window).on('resize', function () {
        if (!windowResize) {
          windowResize = true;
          !window.requestAnimationFrame ? setTimeout(checkResize) : window.requestAnimationFrame(checkResize);
        }
      });

      Ember.$(window).keyup(function (event) {
        if (event.keyCode == 27) {
          objSchedulesPlan.forEach(function (element) {
            element.closeModal(element.eventsGroup.find('.selected-event'));
          });
        }
      });

      function checkResize() {
        objSchedulesPlan.forEach(function (element) {
          element.scheduleReset();
        });
        windowResize = false;
      }

      function getScheduleTimestamp(time) {
        //accepts hh:mm format - convert hh:mm to timestamp
        time = time.replace(/ /g, '');
        var timeArray = time.split(':');
        var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
        return timeStamp;
      }

      function transformElement(element, value) {
        element.css({
          '-moz-transform': value,
          '-webkit-transform': value,
          '-ms-transform': value,
          '-o-transform': value,
          'transform': value
        });
      }
    },


    actions: {
      viewschedule: function viewschedule() {
        this.set('isEditing', true);
      },
      updateValue: function updateValue(physio) {
        this.set('physios', physio);
        this.set('selectedphysio', this.get('DS').peekRecord('physiotherapest', physio));
        //get associated physiotherapist schedule
        var container = this.get('selectedphysio').get('appointments').filter(function (item) {
          var cur_time = new Date();
          cur_time = cur_time.toISOString();
          return item.get('date') > cur_time;
        });
        //set appointment filter to the container
        this.set('appointments_filter', container);
      },
      getclient: function getclient(pid) {
        console.log("getlient invoked");
        this.get('DS').findRecord('patient', pid).then(function (src) {

          var a = src.get('familyName');
          var b = src.get('givenName');
          console.log(a.toString());
          console.log(b.toString());
          return '';
        });
      },
      cancel: function cancel() {
        return true;
      },
      prev: function prev() {
        var newcont = [];
        var counter = 0;
        this.get('weekdate').forEach(function (e) {
          var result = new Date(e);
          result.setDate(result.getDate() - 7);
          newcont[counter++] = result.toDateString();
        });
        this.get('weekdate').replace(0, 7, newcont);
      },
      next: function next() {
        var newcont = [];
        var counter = 0;
        this.get('weekdate').forEach(function (e) {
          var result = new Date(e);
          result.setDate(result.getDate() + 7);
          newcont[counter++] = result.toDateString();
        });
        this.get('weekdate').replace(0, 7, newcont);
      },
      setslot: function setslot(slot, date) {
        var d = new Date(date);
        switch (slot) {
          case 1:
            d.setHours(9, 30);
            break;
          case 2:
            d.setHours(12, 0);
            break;
          case 3:
            d.setHours(13, 30);
            break;
          case 4:
            d.setHours(15, 0);
            break;
        }
        var booking = this.get('DS').createRecord('appointment', {
          date: d.toISOString()
        });
        this.set('event', "event-3");

        this.get('availablespot').push(booking);
      },
      save: function save() {
        var self = this;
        var physio = self.get('physios');

        console.log(physio);
        this.get('DS').find('physiotherapest', physio).then(function (a) {
          self.get('availablespot').forEach(function (e) {
            e.save().then(function () {
              a.get('appointments').pushObject(e);
              a.save();
            });
          });
        });
      }
    }

  });
});
define('self-start-front-end/components/welcome-page', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: '',

    model: null,

    didRender: function didRender() {
      this._super.apply(this, arguments);

      Ember.$(function () {
        Ember.$('a[href*=\\#]:not([href=\\#])').on('click', function (e) {
          e.preventDefault();
          Ember.$('html, body').animate({ scrollTop: Ember.$(Ember.$(this).attr('href')).offset().top }, 500, 'linear');
        });
      });

      /*-----------------------------------------------------------------------------------*/
      /*	PRELOADER
      /*-----------------------------------------------------------------------------------*/

      window.onload = preloader;

      function preloader() {
        //Preloader
        setTimeout("$('#preloader').animate({'opacity' : '0'},300,function(){$('#preloader').hide()})", 800);
        setTimeout("$('.preloader_hide, .selector_open').animate({'opacity' : '1'},500)", 800);
      }

      Ember.$(function () {
        preloader();
      });
    }
  });
});
define('self-start-front-end/controllers/form-display', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        queryParams: ['id'],
        id: null
    });
});
define('self-start-front-end/controllers/new-patient', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    tagName: '',
    queryParams: ['account'],
    account: null
  });
});
define('self-start-front-end/controllers/questions', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({});
});
define('self-start-front-end/controllers/rehabplans', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    sortProperties: ['id'],
    theFilter: ""

  });
});
define('self-start-front-end/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
define('self-start-front-end/helpers/app-version', ['exports', 'self-start-front-end/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('self-start-front-end/helpers/append', ['exports', 'ember-composable-helpers/helpers/append'], function (exports, _append) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _append.default;
    }
  });
  Object.defineProperty(exports, 'append', {
    enumerable: true,
    get: function () {
      return _append.append;
    }
  });
});
define('self-start-front-end/helpers/array', ['exports', 'ember-composable-helpers/helpers/array'], function (exports, _array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _array.default;
    }
  });
  Object.defineProperty(exports, 'array', {
    enumerable: true,
    get: function () {
      return _array.array;
    }
  });
});
define('self-start-front-end/helpers/camelize', ['exports', 'ember-cli-string-helpers/helpers/camelize'], function (exports, _camelize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _camelize.default;
    }
  });
  Object.defineProperty(exports, 'camelize', {
    enumerable: true,
    get: function () {
      return _camelize.camelize;
    }
  });
});
define('self-start-front-end/helpers/cancel-all', ['exports', 'ember-concurrency/-helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cancelHelper = cancelHelper;


  var CANCEL_REASON = "the 'cancel-all' template helper was invoked";

  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      Ember.assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _helpers.taskHelperClosure)('cancel-all', 'cancelAll', [cancelable, CANCEL_REASON]);
  }

  exports.default = Ember.Helper.helper(cancelHelper);
});
define('self-start-front-end/helpers/capitalize', ['exports', 'ember-cli-string-helpers/helpers/capitalize'], function (exports, _capitalize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _capitalize.default;
    }
  });
  Object.defineProperty(exports, 'capitalize', {
    enumerable: true,
    get: function () {
      return _capitalize.capitalize;
    }
  });
});
define('self-start-front-end/helpers/chunk', ['exports', 'ember-composable-helpers/helpers/chunk'], function (exports, _chunk) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _chunk.default;
    }
  });
  Object.defineProperty(exports, 'chunk', {
    enumerable: true,
    get: function () {
      return _chunk.chunk;
    }
  });
});
define('self-start-front-end/helpers/classify', ['exports', 'ember-cli-string-helpers/helpers/classify'], function (exports, _classify) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _classify.default;
    }
  });
  Object.defineProperty(exports, 'classify', {
    enumerable: true,
    get: function () {
      return _classify.classify;
    }
  });
});
define('self-start-front-end/helpers/compact', ['exports', 'ember-composable-helpers/helpers/compact'], function (exports, _compact) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compact.default;
    }
  });
  Object.defineProperty(exports, 'compact', {
    enumerable: true,
    get: function () {
      return _compact.compact;
    }
  });
});
define('self-start-front-end/helpers/compare', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.compare = compare;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function compare(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return a === b;
  }

  exports.default = Ember.Helper.helper(compare);
});
define('self-start-front-end/helpers/compute', ['exports', 'ember-composable-helpers/helpers/compute'], function (exports, _compute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compute.default;
    }
  });
  Object.defineProperty(exports, 'compute', {
    enumerable: true,
    get: function () {
      return _compute.compute;
    }
  });
});
define('self-start-front-end/helpers/contains', ['exports', 'ember-composable-helpers/helpers/contains'], function (exports, _contains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contains.default;
    }
  });
  Object.defineProperty(exports, 'contains', {
    enumerable: true,
    get: function () {
      return _contains.contains;
    }
  });
});
define('self-start-front-end/helpers/dasherize', ['exports', 'ember-cli-string-helpers/helpers/dasherize'], function (exports, _dasherize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dasherize.default;
    }
  });
  Object.defineProperty(exports, 'dasherize', {
    enumerable: true,
    get: function () {
      return _dasherize.dasherize;
    }
  });
});
define('self-start-front-end/helpers/dec', ['exports', 'ember-composable-helpers/helpers/dec'], function (exports, _dec) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dec.default;
    }
  });
  Object.defineProperty(exports, 'dec', {
    enumerable: true,
    get: function () {
      return _dec.dec;
    }
  });
});
define('self-start-front-end/helpers/drop', ['exports', 'ember-composable-helpers/helpers/drop'], function (exports, _drop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _drop.default;
    }
  });
  Object.defineProperty(exports, 'drop', {
    enumerable: true,
    get: function () {
      return _drop.drop;
    }
  });
});
define('self-start-front-end/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectIsGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('self-start-front-end/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectIsSelected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('self-start-front-end/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectTrueStringIfPresent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('self-start-front-end/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(exports, 'equal', {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
define('self-start-front-end/helpers/filter-by', ['exports', 'ember-composable-helpers/helpers/filter-by'], function (exports, _filterBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _filterBy.default;
    }
  });
  Object.defineProperty(exports, 'filterBy', {
    enumerable: true,
    get: function () {
      return _filterBy.filterBy;
    }
  });
});
define('self-start-front-end/helpers/filter', ['exports', 'ember-composable-helpers/helpers/filter'], function (exports, _filter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _filter.default;
    }
  });
  Object.defineProperty(exports, 'filter', {
    enumerable: true,
    get: function () {
      return _filter.filter;
    }
  });
});
define('self-start-front-end/helpers/find-by', ['exports', 'ember-composable-helpers/helpers/find-by'], function (exports, _findBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _findBy.default;
    }
  });
  Object.defineProperty(exports, 'findBy', {
    enumerable: true,
    get: function () {
      return _findBy.findBy;
    }
  });
});
define('self-start-front-end/helpers/flatten', ['exports', 'ember-composable-helpers/helpers/flatten'], function (exports, _flatten) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flatten.default;
    }
  });
  Object.defineProperty(exports, 'flatten', {
    enumerable: true,
    get: function () {
      return _flatten.flatten;
    }
  });
});
define('self-start-front-end/helpers/group-by', ['exports', 'ember-composable-helpers/helpers/group-by'], function (exports, _groupBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _groupBy.default;
    }
  });
  Object.defineProperty(exports, 'groupBy', {
    enumerable: true,
    get: function () {
      return _groupBy.groupBy;
    }
  });
});
define('self-start-front-end/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(exports, 'gt', {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
define('self-start-front-end/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
define('self-start-front-end/helpers/has-next', ['exports', 'ember-composable-helpers/helpers/has-next'], function (exports, _hasNext) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasNext.default;
    }
  });
  Object.defineProperty(exports, 'hasNext', {
    enumerable: true,
    get: function () {
      return _hasNext.hasNext;
    }
  });
});
define('self-start-front-end/helpers/has-previous', ['exports', 'ember-composable-helpers/helpers/has-previous'], function (exports, _hasPrevious) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasPrevious.default;
    }
  });
  Object.defineProperty(exports, 'hasPrevious', {
    enumerable: true,
    get: function () {
      return _hasPrevious.hasPrevious;
    }
  });
});
define('self-start-front-end/helpers/html-safe', ['exports', 'ember-cli-string-helpers/helpers/html-safe'], function (exports, _htmlSafe) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _htmlSafe.default;
    }
  });
  Object.defineProperty(exports, 'htmlSafe', {
    enumerable: true,
    get: function () {
      return _htmlSafe.htmlSafe;
    }
  });
});
define('self-start-front-end/helpers/humanize', ['exports', 'ember-cli-string-helpers/helpers/humanize'], function (exports, _humanize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _humanize.default;
    }
  });
  Object.defineProperty(exports, 'humanize', {
    enumerable: true,
    get: function () {
      return _humanize.humanize;
    }
  });
});
define('self-start-front-end/helpers/inc', ['exports', 'ember-composable-helpers/helpers/inc'], function (exports, _inc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inc.default;
    }
  });
  Object.defineProperty(exports, 'inc', {
    enumerable: true,
    get: function () {
      return _inc.inc;
    }
  });
});
define('self-start-front-end/helpers/index-plus-one', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.indexPlusOne = indexPlusOne;
  function indexPlusOne(index) {
    return parseInt(index) + 1;
  }
  exports.default = Ember.Helper.helper(indexPlusOne);
});
define('self-start-front-end/helpers/indexpicker', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.indexpicker = indexpicker;
  function indexpicker(params /*, hash*/) {
    return parseInt(params) + 1;
  }

  exports.default = Ember.Helper.helper(indexpicker);
});
define("self-start-front-end/helpers/input-identification", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.inputIdentification = inputIdentification;
  function inputIdentification(questionNumber) {
    var str = "";
    for (var i = 0; i < questionNumber; i++) {
      str.concat("a");
    }
    console.log(str);
    return str;
  }

  exports.default = Ember.Helper.helper(inputIdentification);
});
define('self-start-front-end/helpers/intersect', ['exports', 'ember-composable-helpers/helpers/intersect'], function (exports, _intersect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _intersect.default;
    }
  });
  Object.defineProperty(exports, 'intersect', {
    enumerable: true,
    get: function () {
      return _intersect.intersect;
    }
  });
});
define('self-start-front-end/helpers/invoke', ['exports', 'ember-composable-helpers/helpers/invoke'], function (exports, _invoke) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _invoke.default;
    }
  });
  Object.defineProperty(exports, 'invoke', {
    enumerable: true,
    get: function () {
      return _invoke.invoke;
    }
  });
});
define('self-start-front-end/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
define('self-start-front-end/helpers/is-equal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isEqual = isEqual;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function isEqual(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        q1 = _ref2[0],
        q2 = _ref2[1];

    return q1 === q2;
  }
  exports.default = Ember.Helper.helper(isEqual);
});
define('self-start-front-end/helpers/join', ['exports', 'ember-composable-helpers/helpers/join'], function (exports, _join) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _join.default;
    }
  });
  Object.defineProperty(exports, 'join', {
    enumerable: true,
    get: function () {
      return _join.join;
    }
  });
});
define('self-start-front-end/helpers/lf-lock-model', ['exports', 'liquid-fire/helpers/lf-lock-model'], function (exports, _lfLockModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lfLockModel.default;
    }
  });
  Object.defineProperty(exports, 'lfLockModel', {
    enumerable: true,
    get: function () {
      return _lfLockModel.lfLockModel;
    }
  });
});
define('self-start-front-end/helpers/lf-or', ['exports', 'liquid-fire/helpers/lf-or'], function (exports, _lfOr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lfOr.default;
    }
  });
  Object.defineProperty(exports, 'lfOr', {
    enumerable: true,
    get: function () {
      return _lfOr.lfOr;
    }
  });
});
define('self-start-front-end/helpers/lowercase', ['exports', 'ember-cli-string-helpers/helpers/lowercase'], function (exports, _lowercase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lowercase.default;
    }
  });
  Object.defineProperty(exports, 'lowercase', {
    enumerable: true,
    get: function () {
      return _lowercase.lowercase;
    }
  });
});
define('self-start-front-end/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
define('self-start-front-end/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
define('self-start-front-end/helpers/map-by', ['exports', 'ember-composable-helpers/helpers/map-by'], function (exports, _mapBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapBy.default;
    }
  });
  Object.defineProperty(exports, 'mapBy', {
    enumerable: true,
    get: function () {
      return _mapBy.mapBy;
    }
  });
});
define('self-start-front-end/helpers/map-value', ['exports', 'semantic-ui-ember/helpers/map-value'], function (exports, _mapValue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapValue.default;
    }
  });
  Object.defineProperty(exports, 'mapValue', {
    enumerable: true,
    get: function () {
      return _mapValue.mapValue;
    }
  });
});
define('self-start-front-end/helpers/map', ['exports', 'ember-composable-helpers/helpers/map'], function (exports, _map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _map.default;
    }
  });
  Object.defineProperty(exports, 'map', {
    enumerable: true,
    get: function () {
      return _map.map;
    }
  });
});
define('self-start-front-end/helpers/mc-display', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mcDisplay = mcDisplay;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function mcDisplay(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        string = _ref2[0],
        num = _ref2[1];

    var breakdown = string.split('+++');
    var length = breakdown.length;
    if (num < length - 1) return breakdown[num];
    return false;
  }

  exports.default = Ember.Helper.helper(mcDisplay);
});
define('self-start-front-end/helpers/next', ['exports', 'ember-composable-helpers/helpers/next'], function (exports, _next) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _next.default;
    }
  });
  Object.defineProperty(exports, 'next', {
    enumerable: true,
    get: function () {
      return _next.next;
    }
  });
});
define('self-start-front-end/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
define('self-start-front-end/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
define('self-start-front-end/helpers/number-of-mc', ['exports'], function (exports) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.numberOfMC = numberOfMC;

   var _slicedToArray = function () {
      function sliceIterator(arr, i) {
         var _arr = [];
         var _n = true;
         var _d = false;
         var _e = undefined;

         try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
               _arr.push(_s.value);

               if (i && _arr.length === i) break;
            }
         } catch (err) {
            _d = true;
            _e = err;
         } finally {
            try {
               if (!_n && _i["return"]) _i["return"]();
            } finally {
               if (_d) throw _e;
            }
         }

         return _arr;
      }

      return function (arr, i) {
         if (Array.isArray(arr)) {
            return arr;
         } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
         } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
         }
      };
   }();

   function numberOfMC(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          numOps = _ref2[0],
          curNum = _ref2[1];

      return numOps > curNum;
   }

   exports.default = Ember.Helper.helper(numberOfMC);
});
define('self-start-front-end/helpers/object-at', ['exports', 'ember-composable-helpers/helpers/object-at'], function (exports, _objectAt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _objectAt.default;
    }
  });
  Object.defineProperty(exports, 'objectAt', {
    enumerable: true,
    get: function () {
      return _objectAt.objectAt;
    }
  });
});
define('self-start-front-end/helpers/optional', ['exports', 'ember-composable-helpers/helpers/optional'], function (exports, _optional) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _optional.default;
    }
  });
  Object.defineProperty(exports, 'optional', {
    enumerable: true,
    get: function () {
      return _optional.optional;
    }
  });
});
define('self-start-front-end/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
define('self-start-front-end/helpers/perform', ['exports', 'ember-concurrency/-helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.performHelper = performHelper;
  function performHelper(args, hash) {
    return (0, _helpers.taskHelperClosure)('perform', 'perform', args, hash);
  }

  exports.default = Ember.Helper.helper(performHelper);
});
define('self-start-front-end/helpers/pipe-action', ['exports', 'ember-composable-helpers/helpers/pipe-action'], function (exports, _pipeAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pipeAction.default;
    }
  });
});
define('self-start-front-end/helpers/pipe', ['exports', 'ember-composable-helpers/helpers/pipe'], function (exports, _pipe) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pipe.default;
    }
  });
  Object.defineProperty(exports, 'pipe', {
    enumerable: true,
    get: function () {
      return _pipe.pipe;
    }
  });
});
define('self-start-front-end/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('self-start-front-end/helpers/previous', ['exports', 'ember-composable-helpers/helpers/previous'], function (exports, _previous) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _previous.default;
    }
  });
  Object.defineProperty(exports, 'previous', {
    enumerable: true,
    get: function () {
      return _previous.previous;
    }
  });
});
define('self-start-front-end/helpers/queue', ['exports', 'ember-composable-helpers/helpers/queue'], function (exports, _queue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _queue.default;
    }
  });
  Object.defineProperty(exports, 'queue', {
    enumerable: true,
    get: function () {
      return _queue.queue;
    }
  });
});
define('self-start-front-end/helpers/range', ['exports', 'ember-composable-helpers/helpers/range'], function (exports, _range) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _range.default;
    }
  });
  Object.defineProperty(exports, 'range', {
    enumerable: true,
    get: function () {
      return _range.range;
    }
  });
});
define('self-start-front-end/helpers/reduce', ['exports', 'ember-composable-helpers/helpers/reduce'], function (exports, _reduce) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _reduce.default;
    }
  });
  Object.defineProperty(exports, 'reduce', {
    enumerable: true,
    get: function () {
      return _reduce.reduce;
    }
  });
});
define('self-start-front-end/helpers/reject-by', ['exports', 'ember-composable-helpers/helpers/reject-by'], function (exports, _rejectBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _rejectBy.default;
    }
  });
  Object.defineProperty(exports, 'rejectBy', {
    enumerable: true,
    get: function () {
      return _rejectBy.rejectBy;
    }
  });
});
define('self-start-front-end/helpers/repeat', ['exports', 'ember-composable-helpers/helpers/repeat'], function (exports, _repeat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _repeat.default;
    }
  });
  Object.defineProperty(exports, 'repeat', {
    enumerable: true,
    get: function () {
      return _repeat.repeat;
    }
  });
});
define('self-start-front-end/helpers/reverse', ['exports', 'ember-composable-helpers/helpers/reverse'], function (exports, _reverse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _reverse.default;
    }
  });
  Object.defineProperty(exports, 'reverse', {
    enumerable: true,
    get: function () {
      return _reverse.reverse;
    }
  });
});
define('self-start-front-end/helpers/send', ['exports', 'ember-component-inbound-actions/helpers/send'], function (exports, _send) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _send.default;
    }
  });
});
define('self-start-front-end/helpers/shuffle', ['exports', 'ember-composable-helpers/helpers/shuffle'], function (exports, _shuffle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _shuffle.default;
    }
  });
  Object.defineProperty(exports, 'shuffle', {
    enumerable: true,
    get: function () {
      return _shuffle.shuffle;
    }
  });
});
define('self-start-front-end/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('self-start-front-end/helpers/slice', ['exports', 'ember-composable-helpers/helpers/slice'], function (exports, _slice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _slice.default;
    }
  });
  Object.defineProperty(exports, 'slice', {
    enumerable: true,
    get: function () {
      return _slice.slice;
    }
  });
});
define('self-start-front-end/helpers/sort-by', ['exports', 'ember-composable-helpers/helpers/sort-by'], function (exports, _sortBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sortBy.default;
    }
  });
  Object.defineProperty(exports, 'sortBy', {
    enumerable: true,
    get: function () {
      return _sortBy.sortBy;
    }
  });
});
define('self-start-front-end/helpers/take', ['exports', 'ember-composable-helpers/helpers/take'], function (exports, _take) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _take.default;
    }
  });
  Object.defineProperty(exports, 'take', {
    enumerable: true,
    get: function () {
      return _take.take;
    }
  });
});
define('self-start-front-end/helpers/task', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref),
        task = _ref2[0],
        args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports.default = Ember.Helper.helper(taskHelper);
});
define('self-start-front-end/helpers/titleize', ['exports', 'ember-cli-string-helpers/helpers/titleize'], function (exports, _titleize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _titleize.default;
    }
  });
  Object.defineProperty(exports, 'titleize', {
    enumerable: true,
    get: function () {
      return _titleize.titleize;
    }
  });
});
define('self-start-front-end/helpers/toggle-action', ['exports', 'ember-composable-helpers/helpers/toggle-action'], function (exports, _toggleAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggleAction.default;
    }
  });
});
define('self-start-front-end/helpers/toggle', ['exports', 'ember-composable-helpers/helpers/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  Object.defineProperty(exports, 'toggle', {
    enumerable: true,
    get: function () {
      return _toggle.toggle;
    }
  });
});
define('self-start-front-end/helpers/truncate', ['exports', 'ember-cli-string-helpers/helpers/truncate'], function (exports, _truncate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _truncate.default;
    }
  });
  Object.defineProperty(exports, 'truncate', {
    enumerable: true,
    get: function () {
      return _truncate.truncate;
    }
  });
});
define('self-start-front-end/helpers/underscore', ['exports', 'ember-cli-string-helpers/helpers/underscore'], function (exports, _underscore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _underscore.default;
    }
  });
  Object.defineProperty(exports, 'underscore', {
    enumerable: true,
    get: function () {
      return _underscore.underscore;
    }
  });
});
define('self-start-front-end/helpers/union', ['exports', 'ember-composable-helpers/helpers/union'], function (exports, _union) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _union.default;
    }
  });
  Object.defineProperty(exports, 'union', {
    enumerable: true,
    get: function () {
      return _union.union;
    }
  });
});
define('self-start-front-end/helpers/uppercase', ['exports', 'ember-cli-string-helpers/helpers/uppercase'], function (exports, _uppercase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uppercase.default;
    }
  });
  Object.defineProperty(exports, 'uppercase', {
    enumerable: true,
    get: function () {
      return _uppercase.uppercase;
    }
  });
});
define('self-start-front-end/helpers/w', ['exports', 'ember-cli-string-helpers/helpers/w'], function (exports, _w) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _w.default;
    }
  });
  Object.defineProperty(exports, 'w', {
    enumerable: true,
    get: function () {
      return _w.w;
    }
  });
});
define('self-start-front-end/helpers/without', ['exports', 'ember-composable-helpers/helpers/without'], function (exports, _without) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _without.default;
    }
  });
  Object.defineProperty(exports, 'without', {
    enumerable: true,
    get: function () {
      return _without.without;
    }
  });
});
define('self-start-front-end/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
define('self-start-front-end/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'self-start-front-end/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('self-start-front-end/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('self-start-front-end/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('self-start-front-end/initializers/debug', ['exports', '@html-next/vertical-collection/-debug'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'vertical-collection-debug',
    initialize: function initialize() {}
  };
});
define('self-start-front-end/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
define('self-start-front-end/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('self-start-front-end/initializers/export-application-global', ['exports', 'self-start-front-end/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('self-start-front-end/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("self-start-front-end/initializers/liquid-fire", ["exports", "liquid-fire/ember-internals", "liquid-fire/velocity-ext"], function (exports, _emberInternals) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  (0, _emberInternals.initialize)();

  exports.default = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };
});
define('self-start-front-end/initializers/responsive', ['exports', 'ember-responsive/initializers/responsive'], function (exports, _responsive) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'responsive',
    initialize: _responsive.initialize
  };
});
define('self-start-front-end/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('self-start-front-end/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('self-start-front-end/initializers/viewport-config', ['exports', 'self-start-front-end/config/environment', 'ember-in-viewport/utils/can-use-dom'], function (exports, _environment, _canUseDom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;


  var defaultConfig = {
    viewportEnabled: true,
    viewportSpy: false,
    viewportScrollSensitivity: 1,
    viewportRefreshRate: 100,
    viewportListeners: [{ context: window, event: 'scroll.scrollable' }, { context: window, event: 'resize.resizable' }],
    viewportTolerance: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  };

  if (_canUseDom.default) {
    defaultConfig.viewportListeners.push({
      context: document,
      event: 'touchmove.scrollable'
    });
  }

  var assign = Ember.assign || Ember.merge;

  function initialize() {
    var application = arguments[1] || arguments[0];
    var _config$viewportConfi = _environment.default.viewportConfig,
        viewportConfig = _config$viewportConfi === undefined ? {} : _config$viewportConfi;

    var mergedConfig = assign({}, defaultConfig, viewportConfig);

    application.register('config:in-viewport', mergedConfig, { instantiate: false });
  }

  exports.default = {
    name: 'viewport-config',
    initialize: initialize
  };
});
define("self-start-front-end/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('self-start-front-end/mixins/base', ['exports', 'semantic-ui-ember/mixins/base'], function (exports, _base) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _base.default;
    }
  });
});
define('self-start-front-end/mixins/promise-resolver', ['exports', 'ember-promise-tools/mixins/promise-resolver'], function (exports, _promiseResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseResolver.default;
    }
  });
});
define('self-start-front-end/models/answer', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        question: _emberData.default.belongsTo('question', { async: true }),
        patient: _emberData.default.belongsTo('patient', { async: true }),
        form: _emberData.default.belongsTo('form', { async: true }),
        answer: _emberData.default.attr()
    });
});
define('self-start-front-end/models/appointment', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    date: _emberData.default.attr(),
    reason: _emberData.default.attr(),
    other: _emberData.default.attr(),
    patient: _emberData.default.belongsTo('patient')
  });
});
define('self-start-front-end/models/assesment-test', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({});
});
define('self-start-front-end/models/city', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    // city
    name: _emberData.default.attr(),
    provinces: _emberData.default.belongsTo('province', { async: true }) //1 to 1
  });
});
define('self-start-front-end/models/country', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    // country
    name: _emberData.default.attr(),
    provinces: _emberData.default.hasMany('province') //1 to many
  });
});
define('self-start-front-end/models/exercise', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr(),
    description: _emberData.default.attr(),
    objectives: _emberData.default.attr(),
    authorName: _emberData.default.attr(),
    actionSteps: _emberData.default.attr(),
    location: _emberData.default.attr(),
    frequency: _emberData.default.attr(),
    duration: _emberData.default.attr(),
    multimediaURL: _emberData.default.attr(),
    targetDate: _emberData.default.attr(),

    images: _emberData.default.hasMany('image')
    // rehabilitationPlan:DS.belongsTo('rehabilitationplan',{ async: true })
    // images:DS.attr()

  });
});
define('self-start-front-end/models/form', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        name: _emberData.default.attr(),
        description: _emberData.default.attr(),
        author: _emberData.default.attr(),
        answers: _emberData.default.hasMany('answer'),
        questions: _emberData.default.hasMany('question')
    });
});
define('self-start-front-end/models/gender', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    // gender
    name: _emberData.default.attr()
  });
});
define('self-start-front-end/models/image', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr(),
    type: _emberData.default.attr(),
    size: _emberData.default.attr(),
    rawSize: _emberData.default.attr('number'),
    imageData: _emberData.default.attr(),
    exercise: _emberData.default.hasMany('exercise')

  });
});
define('self-start-front-end/models/marital-status', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    // status

    name: _emberData.default.attr()
  });
});
define('self-start-front-end/models/patient', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    // patient
    ID: _emberData.default.attr(),
    familyName: _emberData.default.attr(),
    givenName: _emberData.default.attr(),
    email: _emberData.default.attr(),
    streetName: _emberData.default.attr(),
    streetNumber: _emberData.default.attr('Number'),
    apartment: _emberData.default.attr('Number'),
    country: _emberData.default.attr(),
    province: _emberData.default.attr(),
    city: _emberData.default.attr(),
    dateOfBirth: _emberData.default.attr('Date'),
    healthCardNumber: _emberData.default.attr(),
    gender: _emberData.default.attr(),
    phoneNumber: _emberData.default.attr(),
    postalCode: _emberData.default.attr(),
    appointments: _emberData.default.hasMany('appointment', { async: true }),
    account: _emberData.default.attr()

  });
});
define('self-start-front-end/models/physiotherapest', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        ID: _emberData.default.attr(),
        familyName: _emberData.default.attr(),
        givenName: _emberData.default.attr(),
        email: _emberData.default.attr(),
        dateHired: _emberData.default.attr(),
        dateFired: _emberData.default.attr(),
        treatment: _emberData.default.attr(),
        account: _emberData.default.attr(),
        appointments: _emberData.default.hasMany('appointment', { async: true })
    });
});
define('self-start-front-end/models/province', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    // province
    name: _emberData.default.attr(),
    country: _emberData.default.belongsTo('country', { async: true }), //1 to 1
    cities: _emberData.default.hasMany('city', { async: true }) //1 to many
  });
});
define('self-start-front-end/models/question-order', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        question: _emberData.default.belongsTo('question'),
        form: _emberData.default.belongsTo('form'),
        order: _emberData.default.attr()
    });
});
define('self-start-front-end/models/question', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    questionText: _emberData.default.attr(),
    helpDescription: _emberData.default.attr(),
    Order: _emberData.default.attr('number'),
    type: _emberData.default.attr(),
    optionNumber: _emberData.default.attr('number'),
    optionString: _emberData.default.attr(),
    mc: _emberData.default.attr('boolean'),
    sa: _emberData.default.attr('boolean'),
    tf: _emberData.default.attr('boolean'),
    ra: _emberData.default.attr('boolean'),
    answers: _emberData.default.hasMany('answer'),
    forms: _emberData.default.hasMany('form')
  });
});
define('self-start-front-end/models/rehabilitationplan', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({

    planName: _emberData.default.attr(),
    description: _emberData.default.attr(),
    physioID: _emberData.default.attr(),
    goal: _emberData.default.attr(),
    timeToComplete: _emberData.default.attr(),
    exercises: _emberData.default.hasMany('exercise', { async: true }),
    assessmentTests: _emberData.default.hasMany('assesmentTest', { async: true })
  });
});
define('self-start-front-end/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('self-start-front-end/router', ['exports', 'self-start-front-end/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('home', { path: '/' });
    this.route('patients');
    this.route('rehabplans');
    this.route('admin');
    this.route('questions');
    this.route('forms');
    this.route('province');
    this.route('manage-selections');
    this.route('city');
    this.route('marital-status');
    this.route('new-rehabplans');
    this.route('physiotherapists');
    this.route('new-physiotherapist');
    this.route('update-physiotherapist', { path: 'physiotherapist/:physiotherapest_id' });
    this.route('formDisplay');
    this.route('update-patient', { path: 'patient/:patient_id' });
    this.route('new-patient');
    this.route('appointment');
    this.route('patient-file');
    this.route('exercises');
    this.route('images');
    this.route('register');
    this.route('dashboard');
    this.route('message');
  });

  exports.default = Router;
});
define('self-start-front-end/routes/admin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/appointment', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('appointment');
    }
  });
});
define('self-start-front-end/routes/city', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/dashboard', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/exercise', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('exercise');
    }
  });
});
define('self-start-front-end/routes/exercises', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return Ember.RSVP.hash({
        exercise: this.store.findAll('exercise'),
        image: this.store.findAll('image')
      });
    },
    afterModel: function afterModel() {
      this.store.findAll('image');
    }
  });
});
define('self-start-front-end/routes/form-display', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model() {
            return Ember.RSVP.hash({
                form: this.store.findAll('form'),
                question: this.store.findAll('question')
            });
        }
    });
});
define('self-start-front-end/routes/forms', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model() {
            return Ember.RSVP.hash({
                form: this.store.findAll('form'),
                question: this.store.findAll('question')
            });
        },
        afterModel: function afterModel() {
            this.store.findAll('question');
        }
    });
});
define('self-start-front-end/routes/home', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('patient');
    }
  });
});
define('self-start-front-end/routes/images', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('image');
    }
  });
});
define('self-start-front-end/routes/manage-selections', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return Ember.RSVP.hash({
        gender: this.store.findAll('gender'),
        country: this.store.findAll('country'),
        province: this.store.findAll('province')
      });
    }
  });
});
define('self-start-front-end/routes/message', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/new-exercise', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/new-patient', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('patient');
    }
  });
});
define('self-start-front-end/routes/new-rehabplans', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/patient-file', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/patients', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('patient');
    }
  });
});
define('self-start-front-end/routes/physiotherapists', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model() {
            return this.store.findAll('physiotherapest');
        }
    });
});
define('self-start-front-end/routes/province', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/questions', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model() {
            return this.store.findAll('question');
        }
    });
});
define('self-start-front-end/routes/register', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('patient');
    }
  });
});
define('self-start-front-end/routes/rehabplans', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('rehabilitationplan');
    }
  });
});
define('self-start-front-end/routes/update-patient', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.RESTSerializer.extend({
    primaryKey: '_id'
  });
});
define('self-start-front-end/serializers/patient', ['exports', 'self-start-front-end/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    primaryKey: '_id',
    attrs: {
      account: { embedded: 'always' }
      //payments: { embedded: 'always' }
    }
  });
});
define('self-start-front-end/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("self-start-front-end/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _transitionMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _transitionMap.default;
});
define('self-start-front-end/services/media', ['exports', 'ember-responsive/media'], function (exports, _media) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _media.default;
});
define('self-start-front-end/services/resize-detector', ['exports', 'ember-element-resize-detector/services/resize-detector'], function (exports, _resizeDetector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _resizeDetector.default;
    }
  });
});
define('self-start-front-end/services/scrollbar-thickness', ['exports', 'ember-scrollable/services/scrollbar-thickness'], function (exports, _scrollbarThickness) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _scrollbarThickness.default;
    }
  });
});
define('self-start-front-end/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _textMeasurer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textMeasurer.default;
    }
  });
});
define("self-start-front-end/templates/admin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lzjWWtSO", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[1,[18,\"admin-welcome\"],false],[0,\"\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/admin.hbs" } });
});
define("self-start-front-end/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rKizXn1z", "block": "{\"symbols\":[],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/reset.css\"]]],[7],[8],[0,\" \"],[2,\" CSS reset \"],[0,\"\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/doc.css\"]]],[7],[8],[0,\"\\n\\n\\n\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/application.hbs" } });
});
define("self-start-front-end/templates/appointment", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "58d3+74L", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"book-appointment\"],false],[0,\"\\n\\n\"],[1,[18,\"view-schedule\"],false],[0,\"\\n\\n\"],[1,[18,\"view-appointment\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/appointment.hbs" } });
});
define("self-start-front-end/templates/city", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gUSxBWer", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/city.hbs" } });
});
define("self-start-front-end/templates/components/add-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "AM68n2zH", "block": "{\"symbols\":[],\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n    \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Add Country\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newCountry\",\"small newCountry\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new country\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Country Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add country\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-country.hbs" } });
});
define("self-start-front-end/templates/components/add-exercises", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "i4ooKLW/", "block": "{\"symbols\":[\"file\",\"aS\",\"o\"],\"statements\":[[0,\"\\n\"],[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n    \"],[6,\"h2\"],[9,\"id\",\"exercise\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Add New Exercise\"],[8],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Exercise Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Name\"]],\"Exercise Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Description\"],[8],[0,\"\\n        \"],[1,[25,\"textarea\",null,[[\"value\",\"cols\",\"rows\",\"placeholder\"],[[20,[\"Description\"]],\"80\",\"6\",\"Description\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Author Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"AuthName\"]],\"Author Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\\n        \"],[6,\"label\"],[7],[0,\"Objectives\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Objective\"]],\"Objective\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addObjective\"]],[7],[0,\"\\n            Add Objective\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[0,\"Current Objectives\"],[8],[0,\"\\n          \"],[6,\"ul\"],[9,\"align\",\"left\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"obj\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,3,[]],false],[0,\"\\n                  \"],[6,\"br\"],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Action Steps\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"ActionSteps\"]],\"Action Steps\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addActionStep\"]],[7],[0,\"\\n            Add Action Step\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[0,\"Current Action Steps\"],[8],[0,\"\\n          \"],[6,\"ol\"],[9,\"align\",\"left\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"actionStep\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,2,[]],false],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Location\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Location\"]],\"Location\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Frequency\"],[8],[0,\"\\n\"],[0,\"        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Frequency\"]],\"Frequency\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Duration\"],[8],[0,\"\\n\"],[0,\"        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Duration\"]],\"Duration\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Target Date\"],[8],[0,\"\\n\"],[0,\"        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"TargetDate\"]],\"Target Date\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Multimedia URL\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"MMURL\"]],\"Multi Media URL\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"queue\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"ui divided demo items\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"image\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isUploading\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"div\"],[9,\"class\",\"ui active inverted dimmer\"],[7],[0,\"\\n                    \"],[6,\"div\"],[9,\"class\",\"ui loader\"],[7],[8],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                  \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"base64Image\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isDisplayableImage\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"label\"],[7],[0,\"Image Name\"],[8],[0,\"\\n                    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[19,1,[\"name\"]],\"Exercise Name\"]]],false],[0,\"\\n                    \"],[6,\"button\"],[9,\"class\",\"ui red basic button\"],[3,\"action\",[[19,0,[]],\"deleteFile\",[19,1,[]]]],[7],[0,\"\\n                      Delete\\n                    \"],[8],[0,\"\\n                    \"],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                    \"],[6,\"p\"],[7],[0,\"Unsupported image\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[6,\"div\"],[9,\"class\",\"ui fluid labeled input\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"ui fluid huge label\"],[10,\"style\",[18,\"labelStyle\"],null],[7],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"big cloud upload icon\"],[7],[8],[0,\"\\n            Click or Drop files into this area to upload files\\n          \"],[8],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"file\"],[9,\"value\",\"target.value\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectFile\"],null],null],[10,\"style\",[18,\"inputStyle\"],null],[10,\"accept\",[26,[[18,\"accept\"]]]],[10,\"multiple\",[18,\"multiple\"],null],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[0,\"\\n\\n\\n\"],[0,\"      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"inline\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui button\"],[9,\"type\",\"submit\"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui button\"],[9,\"type\",\"submit\"],[3,\"action\",[[19,0,[]],\"cancel\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"addExercise\"]],[7],[0,\"\\n    Add Exercise\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-exercises.hbs" } });
});
define("self-start-front-end/templates/components/add-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ybNrcv4i", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"sixteen wide field\"],[7],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"fName\"]],\"Name of form\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"sixteen wide field\"],[7],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"fDescription\"]],\"Description of form\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui centered grid\"],[7],[0,\"\\n            \"],[6,\"button\"],[9,\"class\",\"ui fluid positive button\"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n            \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancel\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"addForm\"]],[7],[0,\"\\n        Add Form\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-form.hbs" } });
});
define("self-start-front-end/templates/components/add-gender", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8rrx+WOe", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"cd-button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Add Gender\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newGender\",\"small newGender\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new Gender\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Gender Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add gender\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-gender.hbs" } });
});
define("self-start-front-end/templates/components/add-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+/+zXXVl", "block": "{\"symbols\":[\"oneCountry\",\"oneGender\"],\"statements\":[[4,\"nav-bar\",null,null,{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"tagline\"],[7],[0,\"\\n           Add New Client\\n        \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"style\",\"padding-left: 368px\"],[7],[0,\"\\n          \"],[6,\"a\"],[9,\"href\",\"/patients\"],[9,\"class\",\"ui large inverted download button\"],[7],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"arrow left icon\"],[7],[8],[0,\"Return to Clients\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"background\"],[7],[0,\"\\n\\n    \"],[6,\"br\"],[7],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui centered very padded raised segment container\"],[9,\"style\",\"background-color: white\"],[7],[0,\"\\n      \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n      \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n        \"],[6,\"fieldset\"],[7],[0,\"\\n          \"],[6,\"legend\"],[7],[0,\"Account Settings\"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Account Name\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"userAccountName\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Temporary Password\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"lock\",\"text\",[20,[\"encryptedPassword\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"fieldset\"],[7],[0,\"\\n          \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date of Birth\"],[8],[0,\"\\n            \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[7],[0,\"\\n            \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n              \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectGender\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"true\"],[7],[0,\"\\n                \"],[6,\"option\"],[9,\"selected\",\"selected\"],[7],[0,\"\\n                  Select Gender\\n                \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"gender\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n                    \"],[1,[19,2,[\"name\"]],false],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Health Card Number\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"card\",\"text\",[20,[\"healthCardNumber\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n\\n        \"],[6,\"fieldset\"],[7],[0,\"\\n          \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Number\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetNumber\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Street Name\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetName\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Unit\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"bookmark\",\"text\",[20,[\"apartment\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Postal/ZIP Code\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"flag\",\"text\",[20,[\"postalCode\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n\\n\\n          \"],[6,\"div\"],[7],[0,\"\\n            \"],[6,\"h4\"],[7],[0,\"Country\"],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n              \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectCountry\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"true\"],[7],[0,\"\\n                \"],[6,\"option\"],[9,\"selected\",\"selected\"],[7],[0,\"\\n                  Select Country\\n                \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"country\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n                    \"],[1,[19,1,[\"name\"]],false],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n        \"],[8],[0,\"\\n\\n\\n        \"],[6,\"fieldset\"],[7],[0,\"\\n          \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"phoneNumber\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n            \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"email\"]],true]]],false],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[9,\"style\",\"float: left\"],[7],[0,\"\\n            \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-patient.hbs" } });
});
define("self-start-front-end/templates/components/add-physiotherapist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jY06avMB", "block": "{\"symbols\":[],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Employment start date\"],[8],[0,\"\\n      \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n  \\n  \"],[8],[0,\"\\n  \\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-physiotherapist.hbs" } });
});
define("self-start-front-end/templates/components/add-province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BDT1MQbZ", "block": "{\"symbols\":[\"country\"],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"cd-button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Add Province\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newProvince\",\"small newProvince\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new Province\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Province Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add province\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\\n        \"],[6,\"label\"],[7],[0,\"Country Name\"],[8],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"onChange\"],[\"search selection\",[25,\"action\",[[19,0,[]],\"setCountryId\"],null]]],{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[0,\"Select a country\"],[8],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"countries\"]]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"data-value\",[26,[[19,1,[\"id\"]]]]],[9,\"class\",\"item\"],[7],[0,\"\\n                \"],[1,[19,1,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-province.hbs" } });
});
define("self-start-front-end/templates/components/add-question", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9Ajqq7ff", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n\\n  \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"inline fields\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Question Type:\"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                    \"],[6,\"input\"],[9,\"name\",\"type\"],[9,\"type\",\"radio\"],[3,\"action\",[[19,0,[]],\"multipleChoice\"]],[7],[8],[0,\"\\n\\n                    \"],[6,\"label\"],[7],[0,\"Multiple Choice\"],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                    \"],[6,\"input\"],[9,\"name\",\"type\"],[9,\"type\",\"radio\"],[3,\"action\",[[19,0,[]],\"shortAns\"]],[7],[8],[0,\"\\n                    \"],[6,\"label\"],[7],[0,\"Short Answer\"],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                    \"],[6,\"input\"],[9,\"name\",\"type\"],[9,\"type\",\"radio\"],[3,\"action\",[[19,0,[]],\"rating\"]],[7],[8],[0,\"\\n                    \"],[6,\"label\"],[7],[0,\"Rating\"],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                    \"],[6,\"input\"],[9,\"name\",\"type\"],[9,\"type\",\"radio\"],[3,\"action\",[[19,0,[]],\"trueFalse\"]],[7],[8],[0,\"\\n                    \"],[6,\"label\"],[7],[0,\"True/False\"],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n\\n\"],[4,\"if\",[[20,[\"rating\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"rquestion\"]],\"Question\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"rhelp\"]],\"Help\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"shortAns\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"saquestion\"]],\"Question\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"sahelp\"]],\"Help\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"trueFalse\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"tfquestion\"]],\"Question\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"tfhelp\"]],\"Help\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"multipleChoice\"]]],null,{\"statements\":[[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcquestion\"]],\"Question\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop1\"]],\"Option 1\"]]],false],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"option2\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop2\"]],\"Option 2\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"option3\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop3\"]],\"Option 3\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"option4\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop4\"]],\"Option 4\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"option5\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop5\"]],\"Option 5\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"option6\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop6\"]],\"Option 6\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"addable\"]]],null,{\"statements\":[[0,\"        \"],[6,\"button\"],[9,\"class\",\"ui blue button\"],[3,\"action\",[[19,0,[]],\"addOption\"]],[7],[0,\"Add Option\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"removable\"]]],null,{\"statements\":[[0,\"        \"],[6,\"button\"],[9,\"class\",\"ui blue button\"],[3,\"action\",[[19,0,[]],\"removeOption\"]],[7],[0,\"Remove Option\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mchelp\"]],\"Help\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui centered grid\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui fluid positive button\"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancel\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[6,\"div\"],[9,\"class\",\"ui centered grid\"],[7],[0,\"\\n    \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"addQuestion\"]],[7],[0,\"\\n        Add Question\\n    \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-question.hbs" } });
});
define("self-start-front-end/templates/components/add-rehabplan", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vxIZumQN", "block": "{\"symbols\":[\"oneExercise\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Rehabilitation Plan\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"star\",\"text\",[20,[\"Name\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Author\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"authorName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-textarea\"],[7],[0,\"Description\"],[8],[0,\"\\n      \"],[1,[25,\"textarea\",null,[[\"class\",\"name\",\"value\",\"required\"],[\"message\",\"cd-textarea\",[20,[\"description\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Goal\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"award\",\"text\",[20,[\"goal\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Time\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"video\",\"text\",[20,[\"timeToComplete\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Exercises\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"exercise\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"exerciseModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"exercise\",\"name\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-rehabplan.hbs" } });
});
define("self-start-front-end/templates/components/admin-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cCEdCI3L", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\"\\n\\n\"],[2,\"<style>\"],[0,\"\\n\"],[2,\".ui.visible.left.sidebar ~ .fixed,\"],[0,\"\\n\"],[2,\".ui.visible.left.sidebar ~ .pusher {\"],[0,\"\\n\"],[2,\"-ebkit-transform: translate3d(260px, 0, 0); transform: translate3d(260px, 0, 0);\"],[0,\"\\n\"],[2,\"}\"],[0,\"\\n\"],[2,\"</style>\"],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"id\",\"example\"],[9,\"class\",\"index pushable\"],[7],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"full height\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"following bar\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui large secondary network menu inverted\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui logo shape\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"sides\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"active ui side\"],[7],[0,\"\\n                  \"],[4,\"link-to\",[\"admin\"],null,{\"statements\":[[6,\"img\"],[9,\"class\",\"ui image\"],[9,\"src\",\"assets/images/home/Header.png\"],[7],[8]],\"parameters\":[]},null],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"right menu inverted\"],[7],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"../patients\"],[9,\"class\",\"item\"],[7],[0,\"Clients\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"../exercises\"],[9,\"class\",\"item\"],[7],[0,\"Exercise\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"../forms\"],[9,\"class\",\"item\"],[7],[0,\"Forms\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"../manage-selections\"],[9,\"class\",\"item\"],[7],[0,\"Configure\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"../appointment\"],[9,\"class\",\"item\"],[7],[0,\"Appointments\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"id\",\"login\"],[9,\"href\",\"../\"],[9,\"class\",\"item\"],[7],[0,\"Log out\"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[11,1],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/admin-nav.hbs" } });
});
define("self-start-front-end/templates/components/admin-welcome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "baed85T6", "block": "{\"symbols\":[],\"statements\":[[4,\"admin-nav\",null,null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg3\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"library\"],[7],[0,\"Welcome Stephanie\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/admin-welcome.hbs" } });
});
define("self-start-front-end/templates/components/back-to-top", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2X3Y11K3", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1],[0,\"\\n\"],[2,\" ICON NEEDS FONT AWESOME FOR CHEVRON UP ICON \"],[0,\"\\n\"],[6,\"link\"],[9,\"href\",\"//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css\"],[9,\"rel\",\"stylesheet\"],[7],[8],[0,\"\\n\\n\"],[2,\" Return to Top \"],[0,\"\\n\"],[6,\"a\"],[9,\"href\",\"javascript:\"],[9,\"id\",\"return-to-top\"],[7],[6,\"i\"],[9,\"class\",\"icon-chevron-up\"],[7],[8],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/back-to-top.hbs" } });
});
define("self-start-front-end/templates/components/book-appointment", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+bmAjPDe", "block": "{\"symbols\":[\"date\",\"b\",\"phsio\"],\"statements\":[[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/schedule-style.css\"]]],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n\\n\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"value\",[18,\"selectphysio\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateValue\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n          \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"getphysio\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,3,[\"id\"]],null],[7],[0,\"\\n              \"],[1,[19,3,[\"givenName\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancelbookingappointment\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n  \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"prev\"]],[7],[0,\"previous\"],[8],[0,\"\\n  \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"next\"]],[7],[0,\"next\"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-schedule\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"timeline\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"09:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"09:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"10:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"10:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"11:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"11:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"12:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"12:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"13:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"13:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"14:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"14:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"15:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"15:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"16:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"16:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"17:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"17:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"18:00\"],[8],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"events\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"weekdate\"]]],null,{\"statements\":[[0,\"          \"],[6,\"li\"],[9,\"class\",\"events-group\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"top-info\"],[7],[6,\"span\"],[7],[1,[19,1,[]],false],[8],[8],[0,\"\\n\\n            \"],[6,\"ul\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"blocks\"]]],null,{\"statements\":[[4,\"if\",[[25,\"compare\",[[19,1,[]],[19,2,[\"date\"]]],null]],null,{\"statements\":[[0,\"                  \"],[6,\"li\"],[9,\"class\",\"single-event\"],[10,\"data-start\",[19,2,[\"datastart\"]],null],[10,\"data-end\",[19,2,[\"dataend\"]],null],[9,\"data-content\",\"Open\"],[10,\"data-event\",[19,2,[\"dataevent\"]],null],[7],[0,\"\\n                    \"],[6,\"a\"],[9,\"href\",\"#0\"],[3,\"action\",[[19,0,[]],\"openModal\",[19,2,[]]]],[7],[0,\"\\n                      \"],[6,\"em\"],[9,\"class\",\"event-name\"],[7],[0,\"Open\"],[8],[0,\"\\n                    \"],[8],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[2]},null],[0,\"            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"event-modal\"],[7],[0,\"\\n      \"],[6,\"header\"],[9,\"class\",\"header\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"event-date\"],[7],[8],[0,\"\\n          \"],[6,\"h3\"],[9,\"class\",\"event-name\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"header-bg\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"body\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"event-info\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"body-bg\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"a\"],[9,\"href\",\"#0\"],[9,\"class\",\"close\"],[7],[0,\"Close\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"bookAppointment\"]],[7],[0,\"\\n    Book appointment\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"saveappointment\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\" Physiotherapist\"],[8],[0,\"\\n      \"],[6,\"p\"],[7],[1,[20,[\"phyidget\",\"familyName\"]],false],[0,\" \"],[1,[20,[\"phyidget\",\"givenName\"]],false],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Reason\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"star\",\"text\",[20,[\"Reason\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Other\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"user\",\"text\",[20,[\"Other\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date\"],[8],[0,\"\\n        \"],[6,\"p\"],[7],[1,[20,[\"selectedappointment\",\"fulldate\"]],false],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/book-appointment.hbs" } });
});
define("self-start-front-end/templates/components/config-selection", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ChMEr3Yr", "block": "{\"symbols\":[\"province\",\"country\",\"gender\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[4,\"admin-nav\",null,null,{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg4\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"tagline\"],[7],[0,\"\\n           Configure Selections\\n        \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:200px\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[3,\"action\",[[19,0,[]],\"countrySelect\"]],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"Add Country\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:200px\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[3,\"action\",[[19,0,[]],\"provinceSelect\"]],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          Add Province\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:200px\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n        Add City\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:200px\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[3,\"action\",[[19,0,[]],\"genderSelect\"]],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"Add Gender\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"genderSelected\"]]],null,{\"statements\":[[0,\"  \"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n    \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n        \"],[6,\"ul\"],[7],[0,\"\\n          \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Genders\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"gender\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"li\"],[7],[0,\"\\n              \"],[1,[19,3,[\"name\"]],false],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-gender\",null,[[\"ID\"],[[19,3,[\"id\"]]]]],false],[8],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;\"],[7],[1,[25,\"edit-gender\",null,[[\"ID\"],[[19,3,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n    \"],[1,[18,\"add-gender\"],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"countrySelected\"]]],null,{\"statements\":[[0,\"  \"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n    \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n        \"],[6,\"ul\"],[7],[0,\"\\n          \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Countries\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"country\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"li\"],[7],[1,[19,2,[\"name\"]],false],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-country\",null,[[\"ID\"],[[19,2,[\"id\"]]]]],false],[8],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;\"],[7],[1,[25,\"edit-country\",null,[[\"ID\"],[[19,2,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n    \"],[1,[18,\"add-country\"],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"provinceSelected\"]]],null,{\"statements\":[[0,\"  \"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n    \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n        \"],[6,\"ul\"],[7],[0,\"\\n          \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Provinces\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"province\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"li\"],[7],[1,[19,1,[\"name\"]],false],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-province\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n    \"],[1,[18,\"add-province\"],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/config-selection.hbs" } });
});
define("self-start-front-end/templates/components/confirm-booking", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Q/QR1tNW", "block": "{\"symbols\":[],\"statements\":[[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Reason\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"star\",\"text\",[20,[\"Reason\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Other\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"user\",\"text\",[20,[\"Other\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date\"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancelbookingappointment\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/confirm-booking.hbs" } });
});
define("self-start-front-end/templates/components/delete-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bqQ3QEQe", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-country.hbs" } });
});
define("self-start-front-end/templates/components/delete-exercises", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+nxMKZ9i", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular icon red button\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\" remove icon\"],[7],[0,\" \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\" warning sign icon\"],[7],[8],[0,\"\\n    Please Confirm\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you want to delete this exercise?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui red cancel inverted button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n      No\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui green ok inverted button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n      Yes\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[11,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-exercises.hbs" } });
});
define("self-start-front-end/templates/components/delete-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "C8e2swLZ", "block": "{\"symbols\":[],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon red button\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n  Delete\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\"warning sign icon\"],[7],[8],[0,\"\\n    Delete form?\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui right floated red cancel inverted button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n      No\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui green ok inverted button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n      Yes\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-form.hbs" } });
});
define("self-start-front-end/templates/components/delete-gender", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SNQ6A7hO", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-gender.hbs" } });
});
define("self-start-front-end/templates/components/delete-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ybzHFBUt", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"assets/images/trash-simple.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:.6em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:.6em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-patient.hbs" } });
});
define("self-start-front-end/templates/components/delete-physiotherapist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "U2BkXUSk", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-physiotherapist.hbs" } });
});
define("self-start-front-end/templates/components/delete-question", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "HCUH5RCQ", "block": "{\"symbols\":[],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon red button\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n  Delete\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-question.hbs" } });
});
define("self-start-front-end/templates/components/delete-rehabplan", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GZkuwdTM", "block": "{\"symbols\":[],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon red button\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n  Delete\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-rehabplan.hbs" } });
});
define("self-start-front-end/templates/components/delete-status", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jCwNEmuY", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-status.hbs" } });
});
define("self-start-front-end/templates/components/display-questions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "NGZTFNTU", "block": "{\"symbols\":[\"q\"],\"statements\":[[6,\"script\"],[9,\"type\",\"text/javascript\"],[7],[0,\"$(document).ready(function(){$(\\\".rating\\\").rating();});\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\"],[6,\"ol\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"formModel\",\"questions\"]]],null,{\"statements\":[[0,\"    \"],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[19,1,[\"sa\"]]],null,{\"statements\":[[0,\"        \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui input focus\"],[7],[0,\"\\n            \"],[6,\"li\"],[7],[1,[25,\"input\",null,[[\"type\",\"value\"],[\"text\",[20,[\"the\"]]]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,1,[\"ra\"]]],null,{\"statements\":[[0,\"        \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n         \"],[6,\"li\"],[7],[6,\"div\"],[9,\"class\",\"ui large heart rating\"],[9,\"data-max-rating\",\"10\"],[7],[8],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,1,[\"tf\"]]],null,{\"statements\":[[0,\"    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n     \"],[6,\"li\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"inline fields\"],[7],[0,\"\\n           \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"tf\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[0,\"True\"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n               \"],[6,\"input\"],[9,\"name\",\"tf\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n               \"],[6,\"label\"],[7],[0,\"False\"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"  \\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,1,[\"mc\"]]],null,{\"statements\":[[0,\"    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"grouped fields\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],0],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],1],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],2],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"],[4,\"if\",[[25,\"number-of-mc\",[[19,1,[\"optionNumber\"]],3],null]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],3],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"number-of-mc\",[[19,1,[\"optionNumber\"]],4],null]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],4],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"number-of-mc\",[[19,1,[\"optionNumber\"]],5],null]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],5],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"Submit\"]],[7],[0,\"Submit\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/display-questions.hbs" } });
});
define("self-start-front-end/templates/components/edit-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "e20kPOAL", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit country: \\\"\"],[1,[18,\"name\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Country Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add country\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-country.hbs" } });
});
define("self-start-front-end/templates/components/edit-exercises", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "D18+8sUl", "block": "{\"symbols\":[\"file\",\"image\",\"aS\",\"o\"],\"statements\":[[0,\"\\n\"],[6,\"button\"],[9,\"class\",\"ui mini circular icon green button\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\" pencil icon\"],[7],[0,\" \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n\\n    \"],[6,\"h2\"],[9,\"id\",\"rehabPlan\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Edit Exercise \"],[1,[18,\"Name\"],false],[8],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Exercise Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Name\"]],\"Exercise Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[2,\"Description\"],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Description\"],[8],[0,\"\\n        \"],[1,[25,\"textarea\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Description\"]],\"Description\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Author Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"AuthName\"]],\"Author Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Objectives\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Objective\"]],\"Objective\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addObjective\"]],[7],[0,\"\\n            Add \"],[6,\"br\"],[7],[8],[0,\" Objective\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"align\",\"center\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Current Objectives\"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"ul\"],[9,\"align\",\"left\"],[10,\"value\",[18,\"obj\"],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"obj\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,4,[]],false],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModelDelete\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Action Steps\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"ActionSteps\"]],\"Action Steps\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addActionStep\"]],[7],[0,\"\\n            Add \"],[6,\"br\"],[7],[8],[0,\" Action Step\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"align\",\"center\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Current Action Steps\"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"ol\"],[9,\"align\",\"left\"],[10,\"value\",[18,\"actionStep\"],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"actionStep\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,3,[]],false],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"delete\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Location\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Location\"]],\"Location\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Frequency\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui left icon action input\"],[7],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"hourglass half icon\"],[7],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Frequency\"]],\"Frequency\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Duration\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui left icon action input\"],[7],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"calendar icon\"],[7],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Duration\"]],\"Duration\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Target Date\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui left icon action input\"],[7],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"add to calendar icon\"],[7],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"TargetDate\"]],\"Target Date\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Multimedia URL\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"MMURL\"]],\"Multi Media URL\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"secQueue\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"ui items\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"ui small image\"],[7],[0,\"\\n                \"],[6,\"img\"],[10,\"src\",[26,[[19,2,[\"imageData\"]]]]],[7],[8],[0,\"\\n                \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n                  \"],[6,\"label\"],[7],[0,\"Image Name\"],[8],[0,\" \"],[6,\"br\"],[7],[8],[0,\"\\n                  \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[19,2,[\"name\"]],[19,2,[\"name\"]]]]],false],[0,\" \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n                  \"],[6,\"button\"],[9,\"class\",\"ui red basic button\"],[3,\"action\",[[19,0,[]],\"deleteFile\",[19,2,[]]]],[7],[0,\"\\n                    Delete\\n                  \"],[8],[0,\"\\n                  \"],[6,\"br\"],[7],[8],[0,\" \"],[6,\"br\"],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"queue\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"ui divided demo items\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"image\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isUploading\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"div\"],[9,\"class\",\"ui active inverted dimmer\"],[7],[0,\"\\n                    \"],[6,\"div\"],[9,\"class\",\"ui loader\"],[7],[8],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                  \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"base64Image\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isDisplayableImage\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"label\"],[7],[0,\"Image Name\"],[8],[0,\" \"],[6,\"br\"],[7],[8],[0,\"\\n                    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[19,1,[\"name\"]],\"Exercise Name\"]]],false],[0,\"\\n                    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n                    \"],[6,\"button\"],[9,\"class\",\"ui red basic button\"],[3,\"action\",[[19,0,[]],\"deleteNewFile\",[19,1,[]]]],[7],[0,\"\\n                      Delete\\n                    \"],[8],[0,\"\\n                    \"],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                    \"],[6,\"p\"],[7],[0,\"Unsupported image\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[6,\"div\"],[9,\"class\",\"ui fluid labeled input\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"ui fluid huge label\"],[10,\"style\",[18,\"labelStyle\"],null],[7],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"big cloud upload icon\"],[7],[8],[0,\"\\n            Click or Drop files into this area to upload files\\n          \"],[8],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"file\"],[9,\"value\",\"target.value\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectFile\"],null],null],[10,\"style\",[18,\"inputStyle\"],null],[10,\"accept\",[26,[[18,\"accept\"]]]],[10,\"multiple\",[18,\"multiple\"],null],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[2,\"footer for save / cancel\"],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui positive button\"],[7],[0,\"Save\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui black deny button\"],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-exercises.hbs" } });
});
define("self-start-front-end/templates/components/edit-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "reQAgqpt", "block": "{\"symbols\":[],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon green button\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"edit icon\"],[7],[8],[0,\"\\n        Edit\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n         \"],[6,\"label\"],[7],[0,\"Form Name\"],[8],[0,\"\\n         \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\"],[\"text\",\"50\",\"1\",[20,[\"fName\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Form Description\"],[8],[0,\"\\n        \"],[1,[25,\"textarea\",null,[[\"cols\",\"rows\",\"value\"],[\"50\",\"1\",[20,[\"fDescription\"]]]]],false],[0,\"\\n      \"],[8],[0,\"      \\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui right floated red deny button\"],[7],[0,\"\\n      Cancel\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[7],[0,\"\\n      Save\\n      \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-form.hbs" } });
});
define("self-start-front-end/templates/components/edit-gender", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aCuCuelj", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit Gender: \\\"\"],[1,[18,\"name\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Gender Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add gender\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-gender.hbs" } });
});
define("self-start-front-end/templates/components/edit-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lLBHFW6w", "block": "{\"symbols\":[\"oneCountry\",\"oneGender\"],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer; \"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"assets/images/pencil.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"i\"],[9,\"class\",\"close icon\"],[7],[8],[0,\"\\n  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Edit Client\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"scrolling content\"],[7],[0,\"\\n\\n  \"],[6,\"form\"],[9,\"id\",\"edit\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"\",\"text\",[20,[\"pateintsData\",\"givenName\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"\",\"text\",[20,[\"pateintsData\",\"familyName\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date of Birth\"],[8],[0,\"\\n        \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[7],[0,\"\\n        \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectGender\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"pateintsData\",\"gender\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n                \"],[1,[19,2,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Health Card Number\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"card\",\"text\",[20,[\"pateintsData\",\"healthCardNumber\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Number\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"pateintsData\",\"streetNumber\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Street Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"pateintsData\",\"streetName\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Unit\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"bookmark\",\"text\",[20,[\"pateintsData\",\"apartment\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Postal/ZIP Code\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"flag\",\"text\",[20,[\"pateintsData\",\"postalCode\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[7],[0,\"\\n        \"],[6,\"h4\"],[7],[0,\"Country\"],[8],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectCountry\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"pateintsData\",\"country\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n                \"],[1,[19,1,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"pateintsData\",\"phoneNumber\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"pateintsData\",\"email\"]],true]]],false],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n            \"],[2,\"<div class=\\\"ok cd-button\\\">\"],[0,\"\\n        \"],[2,\"<input type=\\\"submit\\\" value=\\\"Submit\\\">\"],[0,\"\\n      \"],[2,\"</div>\"],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n      \"],[2,\"<div class=\\\"actions\\\">\"],[0,\"\\n        \"],[2,\"<div class=\\\"ok cd-button\\\">\"],[0,\"\\n          \"],[2,\"<input type=\\\"submit\\\" value=\\\"Submit\\\">\"],[0,\"\\n        \"],[2,\"</div>\"],[0,\"\\n      \"],[2,\"</div>\"],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"height: 75px\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui primary approve button\"],[9,\"style\",\"float: right;\"],[7],[0,\"\\n      Submit\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-patient.hbs" } });
});
define("self-start-front-end/templates/components/edit-physiotherapist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "k+JtCz8K", "block": "{\"symbols\":[],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\"],[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n   \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Employment start date\"],[8],[0,\"\\n      \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n\"],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-physiotherapist.hbs" } });
});
define("self-start-front-end/templates/components/edit-rehabplan", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Xsou0g3C", "block": "{\"symbols\":[],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon green button\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"edit icon\"],[7],[8],[0,\"\\n  Edit\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"h2\"],[9,\"id\",\"rehabPlan\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Edit Rehabilitation Plan  \"],[1,[18,\"planName\"],false],[8],[0,\"\\n\\n  \"],[6,\"form\"],[9,\"class\",\"ui form\"],[9,\"style\",\"padding: 5%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large user icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"seven wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"planName\"]],\"Rehab plan name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"seven wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"physioID\"]],\"Author Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[2,\"Description\"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large comment icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"description\"]],\"Description\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[2,\"goal\"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large trophy icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"goal\"]],\"Goal\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[2,\"icon\"],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large wait icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"timeToComplete\"]],\"Time\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n    \"],[2,\"Exercise\"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large world icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"exercises\"]],\"Exercise\"]]],false],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n\\n    \"],[2,\"assessment Test\"],[0,\"\\n    \"],[2,\"<div class=\\\"fields\\\">\"],[0,\"\\n    \"],[2,\"<div class=\\\"two wide field\\\">\"],[0,\"\\n    \"],[2,\"<i id=\\\"icon\\\" class=\\\"black large comment icon\\\"></i>\"],[0,\"\\n    \"],[2,\"</div>\"],[0,\"\\n    \"],[2,\"<div class=\\\"fourteen wide field\\\">\"],[0,\"\\n\"],[0,\"    \"],[2,\"</div>\"],[0,\"\\n    \"],[2,\"</div>\"],[0,\"\\n    \"],[2,\"<br>\"],[0,\"\\n    \"],[2,\"footer for save / cancel\"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui black deny button\"],[7],[0,\"\\n        Cancel\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[7],[0,\"\\n        Save\\n        \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-rehabplan.hbs" } });
});
define("self-start-front-end/templates/components/manage-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "P7kKRbvU", "block": "{\"symbols\":[\"question\"],\"statements\":[[0,\"\\n\"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\nManage Form Questions\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n           \"],[6,\"h2\"],[7],[0,\" \"],[1,[18,\"fName\"],false],[0,\" \"],[8],[0,\"\\n           \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"questionsModel\"]]],null,{\"statements\":[[0,\"                        \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n                         \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n                        \"],[8],[0,\"\\n\\n                        \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n                         \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"addQuestion\",[19,1,[]],[20,[\"form\"]],[19,1,[\"id\"]]]],[7],[0,\" Add \"],[8],[0,\"\\n                        \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"           \"],[8],[0,\"\\n           \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n         \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n         \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[7],[0,\"\\n         Done\\n         \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/manage-form.hbs" } });
});
define("self-start-front-end/templates/components/manage-patients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hJP+JyVa", "block": "{\"symbols\":[\"patient\",\"column\",\"column\",\"attribute\"],\"statements\":[[4,\"admin-nav\",null,null,{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"tagline\"],[7],[0,\"\\n           Client Profiles\\n        \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"style\",\"padding-left: 400px\"],[7],[0,\"\\n          \"],[6,\"a\"],[9,\"href\",\"/new-patient\"],[9,\"class\",\"ui large inverted download button\"],[7],[0,\"\\n            Add Client\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"background\"],[7],[0,\"\\n\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui segment\"],[9,\"style\",\"margin-left: 5%; margin-right: 5%\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui left aligned seven wide column\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"two fields\"],[7],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"selected\",\"onChange\"],[\"selection\",[20,[\"queryPath\"]],[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"queryPath\"]]],null]],null]]],{\"statements\":[[0,\"                \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[1,[20,[\"modelAttributes\",\"firstObject\",\"name\"]],false],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"div\"],[9,\"class\",\"item\"],[10,\"data-value\",[26,[[19,4,[\"key\"]]]]],[7],[0,\"\\n                      \"],[1,[19,4,[\"name\"]],false],[0,\"\\n                    \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"                \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n                \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"type\",\"placeholder\",\"value\"],[\"text\",\"Search...\",[20,[\"query\"]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"style\",\"display: inline\"],[7],[0,\"\\n        \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[7],[0,\"\\n          \"],[6,\"thead\"],[7],[0,\"\\n          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"th\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\" \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"              \"],[6,\"th\"],[10,\"class\",[19,3,[\"class\"]],null],[3,\"action\",[[19,0,[]],\"sortColumn\",[19,3,[\"key\"]],[19,3,[\"dir\"]]]],[7],[1,[19,3,[\"name\"]],false],[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"\\n            \"],[6,\"th\"],[9,\"class\",\"centered aligned two wide  column\"],[7],[0,\"Actions\"],[8],[0,\"\\n            \"],[2,\"<th class=\\\"left aligned one wide  column\\\"></th>\"],[0,\"\\n\\n          \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n\\n\\n\\n      \"],[6,\"div\"],[9,\"id\",\"myWindow\"],[9,\"style\",\"height:600px;overflow-y: scroll; overflow-x: hidden;\"],[7],[0,\"\\n        \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[7],[0,\"\\n          \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"patientsModel\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n                \"],[6,\"img\"],[9,\"src\",\"assets/images/nav/single-01.svg\"],[9,\"class\",\"ui mini rounded image\"],[3,\"action\",[[19,0,[]],\"toggleDetail\",[19,1,[\"id\"]]]],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"\\n\"],[0,\"\\n                \"],[6,\"td\"],[10,\"class\",[19,2,[\"class\"]],null],[7],[0,\"  \"],[1,[25,\"get\",[[19,1,[]],[19,2,[\"key\"]]],null],false],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column \"],[7],[0,\"\\n                \"],[1,[25,\"edit-patient\",null,[[\"pateintsData\"],[[19,1,[]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[1,[25,\"delete-patient\",null,[[\"ID\",\"flagDelete\"],[[19,1,[\"id\"]],[20,[\"flagDelete\"]]]]],false],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"th\"],[9,\"colspan\",\"8\"],[7],[0,\"\\n\"],[4,\"liquid-spacer\",null,[[\"growDuration\"],[500]],{\"statements\":[[4,\"if\",[[25,\"eq\",[[20,[\"isShowing\"]],[19,1,[\"id\"]]],null]],null,{\"statements\":[[0,\"                    \"],[1,[25,\"show-patient\",null,[[\"model\"],[[19,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"              \"],[8],[0,\"\\n            \"],[6,\"tr\"],[7],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n\"],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/manage-patients.hbs" } });
});
define("self-start-front-end/templates/components/modify-question", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tKotoPv+", "block": "{\"symbols\":[],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon green button\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[3,\"action\",[[19,0,[]],\"isMultipleChoice\"]],[7],[6,\"i\"],[9,\"class\",\"edit icon\"],[7],[8],[0,\"\\n        Edit\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit Question: \\\"\"],[1,[18,\"questionText\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"multipleChoice\"]]],null,{\"statements\":[[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[0,\"Question\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\"],[\"text\",\"50\",\"1\",[20,[\"questionText\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[0,\"Help Description\"],[8],[0,\"\\n          \"],[1,[25,\"textarea\",null,[[\"cols\",\"rows\",\"value\"],[\"50\",\"1\",[20,[\"questionData\",\"helpDescription\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[0,\"Option 1\"],[8],[0,\"\\n          \"],[1,[25,\"textarea\",null,[[\"cols\",\"rows\",\"value\"],[\"50\",\"1\",[20,[\"opt1String\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"opt2\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Option 2\"],[8],[0,\"\\n            \"],[1,[25,\"textarea\",null,[[\"cols\",\"rows\",\"value\"],[\"50\",\"1\",[20,[\"opt2String\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"opt3\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Option 3\"],[8],[0,\"\\n            \"],[1,[25,\"textarea\",null,[[\"cols\",\"rows\",\"value\"],[\"50\",\"1\",[20,[\"opt3String\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"opt4\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Option 4\"],[8],[0,\"\\n            \"],[1,[25,\"textarea\",null,[[\"cols\",\"rows\",\"value\"],[\"50\",\"1\",[20,[\"opt4String\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"opt5\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Option 5\"],[8],[0,\"\\n            \"],[1,[25,\"textarea\",null,[[\"cols\",\"rows\",\"value\"],[\"50\",\"1\",[20,[\"opt5String\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"opt6\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Option 6\"],[8],[0,\"\\n            \"],[1,[25,\"textarea\",null,[[\"cols\",\"rows\",\"value\"],[\"50\",\"1\",[20,[\"opt6String\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[0,\"Question \"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\"],[\"text\",\"50\",\"1\",[20,[\"questionData\",\"questionText\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[0,\"Help Description\"],[8],[0,\"\\n          \"],[1,[25,\"textarea\",null,[[\"cols\",\"rows\",\"value\"],[\"50\",\"1\",[20,[\"questionData\",\"helpDescription\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:.2em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:.2em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/modify-question.hbs" } });
});
define("self-start-front-end/templates/components/nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1zfWHD2/", "block": "{\"symbols\":[\"&default\"],\"statements\":[[0,\"\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\"\\n\\n\"],[2,\"<style>\"],[0,\"\\n  \"],[2,\".ui.visible.left.sidebar ~ .fixed,\"],[0,\"\\n  \"],[2,\".ui.visible.left.sidebar ~ .pusher {\"],[0,\"\\n    \"],[2,\"-ebkit-transform: translate3d(260px, 0, 0); transform: translate3d(260px, 0, 0);\"],[0,\"\\n  \"],[2,\"}\"],[0,\"\\n\"],[2,\"</style>\"],[0,\"\\n\\n\"],[6,\"div\"],[9,\"id\",\"example\"],[9,\"class\",\"index pushable\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"full height\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"following bar\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"ui large secondary network menu inverted\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"ui logo shape\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"sides\"],[7],[0,\"\\n                  \"],[6,\"div\"],[9,\"class\",\"active ui side\"],[7],[0,\"\\n                    \"],[4,\"link-to\",[\"home\"],null,{\"statements\":[[6,\"img\"],[9,\"class\",\"ui image\"],[9,\"src\",\"assets/images/home/Header.png\"],[7],[8]],\"parameters\":[]},null],[0,\"\\n                  \"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n\\n            \"],[6,\"div\"],[9,\"class\",\"right menu inverted\"],[7],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"About\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"How it Works\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"Services\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"Assessment\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"Blog\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"Contact\"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"loggedOut\"]]],null,{\"statements\":[[0,\"                \"],[6,\"a\"],[9,\"id\",\"login\"],[9,\"class\",\"item\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"Log in\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[6,\"a\"],[9,\"class\",\"item\"],[3,\"action\",[[19,0,[]],\"logout\"]],[7],[0,\"Logout\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[11,1],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"login\",\"login\"]],{\"statements\":[[0,\"  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n  \"],[6,\"h2\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Login\"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"id\",\"ui container\"],[9,\"style\",\"height: 250px; padding-left:10%; padding-right: 10%; padding-top: 2%\"],[7],[0,\"\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Email\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Email\"]],\"Email\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Password\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"password\",[20,[\"PWord\"]],\"Password\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"inline\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui green button \"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui button \"],[3,\"action\",[[19,0,[]],\"deny\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/nav-bar.hbs" } });
});
define("self-start-front-end/templates/components/parse-question", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ws/Z1fuT", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\\n   \\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/parse-question.hbs" } });
});
define("self-start-front-end/templates/components/register-user", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RQF1PdSF", "block": "{\"symbols\":[],\"statements\":[[6,\"a\"],[9,\"class\",\"ui large inverted download button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  Register\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"register\",\"register\"]],{\"statements\":[[0,\"\\n  \"],[6,\"h2\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Register\"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"id\",\"ui container\"],[9,\"style\",\"height: 320px; padding-left:10%; padding-right: 10%; padding-top: 2%\"],[7],[0,\"\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"User Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"UName\"]],\"User Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Email\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Email\"]],\"Email\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Password\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"password\",[20,[\"PWord\"]],\"Password\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"inline\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui green button \"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui button \"],[3,\"action\",[[19,0,[]],\"deny\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/register-user.hbs" } });
});
define("self-start-front-end/templates/components/show-form-questions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JLCVeDTJ", "block": "{\"symbols\":[\"oneQuestion\",\"q\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui segment\"],[7],[0,\"\\n  \"],[6,\"h3\"],[7],[0,\"Questions: \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"questions\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide column\"],[7],[0,\"\\n        \"],[6,\"li\"],[7],[0,\"  \"],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"two wide column right aligned\"],[7],[0,\"\\n          \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"removeQuestion\",[19,1,[]],[20,[\"thisForm\"]],[19,1,[\"id\"]],[20,[\"thisForm\",\"id\"]]]],[7],[0,\"Remove\"],[8],[0,\"\\n              \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Order\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"orderChange\",[19,1,[]],[20,[\"thisForm\"]],[20,[\"thisForm\",\"id\"]]],null],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"questions\"]]],null,{\"statements\":[[0,\"           \\n              \"],[6,\"option\"],[10,\"value\",[19,3,[]],null],[10,\"selected\",[25,\"is-equal\",[[19,1,[]],[19,2,[]]],null],null],[7],[0,\"\\n              \"],[1,[25,\"index-plus-one\",[[19,3,[]]],null],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2,3]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"     \"],[6,\"div\"],[9,\"class\",\"two wide column right aligned\"],[7],[0,\"\\n          \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"save\",[20,[\"thisForm\"]],[20,[\"thisForm\",\"id\"]]]],[7],[0,\"Save\"],[8],[0,\"\\n     \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/show-form-questions.hbs" } });
});
define("self-start-front-end/templates/components/show-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bx60ProX", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"ui horizontal segment items\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"eight wide column\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui raised very padded text segment\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"six wide column\"],[7],[0,\"\\n            \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[6,\"img\"],[9,\"src\",\"assets/images/nav/single-01.svg\"],[9,\"class\",\"ui small square image\"],[7],[8],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Client:\"],[8],[0,\" \"],[1,[20,[\"model\",\"givenName\"]],false],[0,\" \"],[1,[20,[\"model\",\"familyName\"]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"left aligned eight wide column\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Date of Birth:\"],[8],[0,\" \"],[1,[18,\"dateFormat\"],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"br\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Gender:\"],[8],[1,[20,[\"model\",\"gender\"]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"br\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Health Card:\"],[8],[0,\" \"],[1,[20,[\"model\",\"healthCardNumber\"]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"br\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Phone Number:\"],[8],[1,[20,[\"model\",\"phoneNumber\"]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"br\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Email:\"],[8],[0,\"\\n                \"],[1,[20,[\"model\",\"email\"]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"br\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Address:\"],[8],[1,[20,[\"model\",\"streetNumber\"]],false],[0,\" \"],[1,[20,[\"model\",\"streetName\"]],false],[0,\", \"],[1,[20,[\"model\",\"postalCode\"]],false],[0,\"\\n                \"],[6,\"p\"],[7],[1,[20,[\"model\",\"city\"]],false],[0,\", \"],[1,[20,[\"model\",\"province\"]],false],[0,\", \"],[1,[20,[\"model\",\"country\"]],false],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"eight wide column\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide row\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui raised very padded text segment\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"History:\"],[8],[0,\"\\n              \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide row\"],[9,\"style\",\"float: right\"],[7],[0,\"\\n\\n        \"],[6,\"a\"],[9,\"href\",\"/patient-file\"],[9,\"id\",\"client\"],[9,\"class\",\"ui inverted download button\"],[7],[0,\"\\n          Client's file \"],[6,\"i\"],[9,\"class\",\"right arrow icon\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/show-patient.hbs" } });
});
define("self-start-front-end/templates/components/simple-example", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Iev+6fac", "block": "{\"symbols\":[\"image\"],\"statements\":[[4,\"if\",[[20,[\"ImageIsAdding\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[1,[25,\"upload-file\",null,[[\"model\",\"maximumFileSize\",\"multiple\",\"flag\"],[\"image\",6,true,[20,[\"ImageIsAdding\"]]]]],false],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"ui items\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui small image\"],[7],[0,\"\\n          \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"imageData\"]]]]],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"meta\"],[7],[0,\"\\n            \"],[6,\"span\"],[7],[0,\"Size: \"],[1,[19,1,[\"size\"]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n            \"],[6,\"span\"],[7],[0,\"Type: \"],[1,[19,1,[\"type\"]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"extra\"],[7],[0,\"\\n            \"],[6,\"button\"],[9,\"class\",\"ui icon red basic button\"],[3,\"action\",[[19,0,[]],\"deleteImage\",[19,1,[]]]],[7],[0,\"\\n              \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"button\"],[9,\"class\",\"ui blue button\"],[3,\"action\",[[19,0,[]],\"addNewImage\"]],[7],[0,\"\\n    Add New Image\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}],[0,\"\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/simple-example.hbs" } });
});
define("self-start-front-end/templates/components/ui-accordion", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1d63BRn/", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-accordion.hbs" } });
});
define("self-start-front-end/templates/components/ui-checkbox", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/EaY5fkg", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"input\"],[10,\"type\",[18,\"type\"],null],[10,\"name\",[18,\"name\"],null],[10,\"tabindex\",[18,\"tabindex\"],null],[10,\"checked\",[25,\"unbound\",[[20,[\"checked\"]]],null],null],[10,\"disabled\",[25,\"unbound\",[[20,[\"disabled\"]]],null],null],[7],[8],[0,\"\\n\"],[6,\"label\"],[7],[1,[18,\"label\"],false],[8],[0,\"\\n\"],[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-checkbox.hbs" } });
});
define("self-start-front-end/templates/components/ui-dimmer", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "d27dFHer", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-dimmer.hbs" } });
});
define("self-start-front-end/templates/components/ui-dropdown", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "S3j6W1SM", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null],[25,\"action\",[[19,0,[]],\"mapping\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-dropdown.hbs" } });
});
define("self-start-front-end/templates/components/ui-embed", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "EaNqN0JU", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-embed.hbs" } });
});
define("self-start-front-end/templates/components/ui-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xZDYQRHF", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-modal.hbs" } });
});
define("self-start-front-end/templates/components/ui-nag", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "e5wZu09K", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-nag.hbs" } });
});
define("self-start-front-end/templates/components/ui-popup", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QEA8UP2N", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-popup.hbs" } });
});
define("self-start-front-end/templates/components/ui-progress", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8QvuF9d6", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-progress.hbs" } });
});
define("self-start-front-end/templates/components/ui-radio", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1RW2V8qo", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"input\"],[10,\"type\",[18,\"type\"],null],[10,\"name\",[18,\"name\"],null],[10,\"tabindex\",[18,\"tabindex\"],null],[10,\"checked\",[25,\"unbound\",[[20,[\"checked\"]]],null],null],[10,\"disabled\",[25,\"unbound\",[[20,[\"disabled\"]]],null],null],[7],[8],[0,\"\\n\"],[6,\"label\"],[7],[1,[18,\"label\"],false],[8],[0,\"\\n\"],[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-radio.hbs" } });
});
define("self-start-front-end/templates/components/ui-rating", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6ITUrBhQ", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-rating.hbs" } });
});
define("self-start-front-end/templates/components/ui-search", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/C1GTaiI", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-search.hbs" } });
});
define("self-start-front-end/templates/components/ui-shape", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ky9ToTEC", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-shape.hbs" } });
});
define("self-start-front-end/templates/components/ui-sidebar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xlSyl5WD", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-sidebar.hbs" } });
});
define("self-start-front-end/templates/components/ui-sticky", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "juXmKGHP", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[25,\"action\",[[19,0,[]],\"execute\"],null]]]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/ui-sticky.hbs" } });
});
define("self-start-front-end/templates/components/upload-file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hHim44W9", "block": "{\"symbols\":[\"file\"],\"statements\":[[4,\"each\",[[20,[\"queue\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui divided demo items\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"image\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isUploading\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"ui active inverted dimmer\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui loader\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"base64Image\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"meta\"],[7],[0,\"\\n          \"],[6,\"span\"],[7],[0,\"Size: \"],[1,[19,1,[\"size\"]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isDisplayableImage\"]]],null,{\"statements\":[[0,\"            \"],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"p\"],[7],[0,\"Unsupported image\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"extra\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isDisplayableImage\"]]],null,{\"statements\":[[0,\"            \"],[6,\"button\"],[9,\"class\",\"ui icon green basic button\"],[3,\"action\",[[19,0,[]],\"saveFile\",[19,1,[]]]],[7],[0,\"\\n              \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[6,\"button\"],[9,\"class\",\"ui icon red basic button\"],[3,\"action\",[[19,0,[]],\"deleteFile\",[19,1,[]]]],[7],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[1]},{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui fluid labeled input\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"ui fluid huge label\"],[10,\"style\",[18,\"labelStyle\"],null],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"big cloud upload icon\"],[7],[8],[0,\"\\n      Click or Drop files into this area to upload files\\n    \"],[8],[0,\"\\n    \"],[6,\"input\"],[9,\"type\",\"file\"],[9,\"value\",\"target.value\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectFile\"],null],null],[10,\"style\",[18,\"inputStyle\"],null],[10,\"accept\",[26,[[18,\"accept\"]]]],[10,\"multiple\",[18,\"multiple\"],null],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"button\"],[9,\"class\",\"ui black button\"],[3,\"action\",[[19,0,[]],\"done\",[20,[\"file\"]]]],[7],[0,\"\\n    Cancel\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"queue\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"savingInProgress\"]]],null,{\"statements\":[[0,\"    \"],[6,\"button\"],[9,\"class\",\"ui labeled green icon loading button\"],[7],[0,\"Loading\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"button\"],[9,\"class\",\"ui labeled green icon button\"],[3,\"action\",[[19,0,[]],\"saveAllFiles\"]],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n      Save All\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[6,\"button\"],[9,\"class\",\"ui labeled red icon button\"],[3,\"action\",[[19,0,[]],\"deleteAllFiles\"]],[7],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n    Remove All\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/upload-file.hbs" } });
});
define("self-start-front-end/templates/components/user-info", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1V94NdZG", "block": "{\"symbols\":[\"oneCountry\",\"oneGender\"],\"statements\":[[4,\"nav-bar\",null,null,{\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg4\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"tagline\"],[7],[0,\"\\n         Complete Registration\\n      \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"background\"],[7],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui centered very padded raised segment container\"],[9,\"style\",\"background-color: white\"],[7],[0,\"\\n    \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n     \"],[6,\"fieldset\"],[7],[0,\"\\n        \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date of Birth\"],[8],[0,\"\\n          \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[7],[0,\"\\n          \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n          \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n            \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectGender\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"true\"],[7],[0,\"\\n              \"],[6,\"option\"],[9,\"selected\",\"selected\"],[7],[0,\"\\n                Select Gender\\n              \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"                \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"gender\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n                  \"],[1,[19,2,[\"name\"]],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Health Card Number\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"card\",\"text\",[20,[\"healthCardNumber\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"fieldset\"],[7],[0,\"\\n        \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Number\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetNumber\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Street Name\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetName\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Unit\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"bookmark\",\"text\",[20,[\"apartment\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Postal/ZIP Code\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"flag\",\"text\",[20,[\"postalCode\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n\\n        \"],[6,\"div\"],[7],[0,\"\\n          \"],[6,\"h4\"],[7],[0,\"Country\"],[8],[0,\"\\n          \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n            \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectCountry\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"true\"],[7],[0,\"\\n              \"],[6,\"option\"],[9,\"selected\",\"selected\"],[7],[0,\"\\n                Select Country\\n              \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"                \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"country\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n                  \"],[1,[19,1,[\"name\"]],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"fieldset\"],[7],[0,\"\\n        \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"phoneNumber\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[9,\"style\",\"float: left\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/user-info.hbs" } });
});
define("self-start-front-end/templates/components/user-login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FvE+prOM", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\"],[6,\"a\"],[9,\"id\",\"login\"],[9,\"class\",\"item\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"Log in\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"login\",\"login\"]],{\"statements\":[[0,\"  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n  \"],[6,\"h2\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Login\"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"id\",\"ui container\"],[9,\"style\",\"height: 250px; padding-left:10%; padding-right: 10%; padding-top: 2%\"],[7],[0,\"\\n  \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Email\"]],\"Email\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Password\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"password\",[20,[\"PWord\"]],\"Password\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"inline\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui green button \"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui button \"],[3,\"action\",[[19,0,[]],\"deny\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/user-login.hbs" } });
});
define("self-start-front-end/templates/components/view-appointment", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "m8sQt8lZ", "block": "{\"symbols\":[\"client\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n\\n\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Client\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"value\",[18,\"selectclient\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateValue\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n          \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select patient\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"getclient\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,1,[\"id\"]],null],[7],[0,\"\\n              \"],[1,[19,1,[\"familyName\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"bookAppointment\"]],[7],[0,\"\\n    Book appointment\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/view-appointment.hbs" } });
});
define("self-start-front-end/templates/components/view-schedule", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xYtLS18w", "block": "{\"symbols\":[\"date\",\"appo\",\"phsio\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n\\n\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"value\",[18,\"selectphysio\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateValue\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n          \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"getphysio\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,3,[\"id\"]],null],[7],[0,\"\\n              \"],[1,[19,3,[\"givenName\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"appointments_filter\"]]],null,{\"statements\":[[0,\"        \"],[6,\"p\"],[7],[1,[19,2,[\"date\"]],false],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"prev\"]],[7],[0,\"previous\"],[8],[0,\"\\n  \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"next\"]],[7],[0,\"next\"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"cd-schedule loading\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"timeline\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"09:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"09:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"10:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"10:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"11:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"11:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"12:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"12:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"13:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"13:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"14:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"14:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"15:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"15:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"16:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"16:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"17:00\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"17:30\"],[8],[8],[0,\"\\n        \"],[6,\"li\"],[7],[6,\"span\"],[7],[0,\"18:00\"],[8],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"events\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"weekdate\"]]],null,{\"statements\":[[0,\"          \"],[6,\"li\"],[9,\"class\",\"events-group\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"top-info\"],[7],[6,\"span\"],[7],[1,[19,1,[]],false],[8],[8],[0,\"\\n            \"],[6,\"ul\"],[7],[0,\"\\n              \"],[6,\"li\"],[9,\"class\",\"single-event\"],[9,\"data-start\",\"09:00\"],[9,\"data-end\",\"10:30\"],[9,\"data-content\",\"Open\"],[10,\"data-event\",[26,[[18,\"event\"]]]],[3,\"action\",[[19,0,[]],\"setslot\",1,[19,1,[]]]],[7],[0,\"\\n                \"],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"\\n                  \"],[6,\"span\"],[9,\"class\",\"event-date\"],[7],[0,\"  9  -  10:30\"],[8],[0,\"\\n                  \"],[6,\"em\"],[9,\"class\",\"event-name\"],[7],[0,\"slot1\"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"li\"],[9,\"class\",\"single-event\"],[9,\"value\",\"1\"],[9,\"data-start\",\"10:30\"],[9,\"data-end\",\"12:00\"],[9,\"data-content\",\"Open\"],[10,\"data-event\",[26,[[18,\"event\"]]]],[3,\"action\",[[19,0,[]],\"setslot\",2,[19,1,[]]]],[7],[0,\"\\n                \"],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"\\n                  \"],[6,\"span\"],[9,\"class\",\"event-date\"],[7],[0,\"  10:30  -  12:00\"],[8],[0,\"\\n                  \"],[6,\"em\"],[9,\"class\",\"event-name\"],[7],[0,\"slot2\"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"li\"],[9,\"class\",\"single-event\"],[9,\"data-start\",\"12:00\"],[9,\"data-end\",\"13:30\"],[9,\"data-content\",\"Open\"],[10,\"data-event\",[18,\"event\"],null],[3,\"action\",[[19,0,[]],\"setslot\",3,[19,1,[]]]],[7],[0,\"\\n                \"],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"\\n                  \"],[6,\"span\"],[9,\"class\",\"event-date\"],[7],[0,\"  12:00  -  13:30\"],[8],[0,\"\\n                  \"],[6,\"em\"],[9,\"class\",\"event-name\"],[7],[0,\"Slot3\"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"li\"],[9,\"class\",\"single-event\"],[9,\"data-start\",\"13:30\"],[9,\"data-end\",\"15:00\"],[9,\"data-content\",\"Open\"],[10,\"data-event\",[18,\"event\"],null],[3,\"action\",[[19,0,[]],\"setslot\",4,[19,1,[]]]],[7],[0,\"\\n\\n                \"],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"\\n                  \"],[6,\"span\"],[9,\"class\",\"event-date\"],[7],[0,\"  13:30  -  15:00\"],[8],[0,\"\\n                  \"],[6,\"em\"],[9,\"class\",\"event-name\"],[7],[0,\"Slot4\"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"event-modal\"],[7],[0,\"\\n      \"],[6,\"header\"],[9,\"class\",\"header\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"event-date\"],[7],[8],[0,\"\\n          \"],[6,\"h3\"],[9,\"class\",\"event-name\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"header-bg\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"body\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"event-info\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"body-bg\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"a\"],[9,\"href\",\"#0\"],[9,\"class\",\"close\"],[7],[0,\"Close\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"save\"]],[7],[0,\"\\n    Save\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"viewschedule\"]],[7],[0,\"\\n    View schedule (physio)\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/view-schedule.hbs" } });
});
define("self-start-front-end/templates/components/welcome-page", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "K+D/um8S", "block": "{\"symbols\":[],\"statements\":[[2,\"&lt;!&ndash; PRELOADER &ndash;&gt;\"],[0,\"\\n\"],[2,\"<div id=\\\"preloader\\\"><div><em></em><em></em><em></em><em></em></div></div>\"],[0,\"\\n\"],[2,\"&lt;!&ndash; //PRELOADER &ndash;&gt;\"],[0,\"\\n\"],[4,\"nav-bar\",null,null,{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg1\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"library\"],[7],[0,\"Self Start\"],[8],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"tagline\"],[7],[0,\"\\n            Guiding your health and well–being\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"style\",\"padding-left: 471px\"],[7],[0,\"\\n\\n          \"],[1,[18,\"register-user\"],false],[0,\"\\n          \"],[2,\"<a href=\\\"/appointment\\\"  class=\\\"ui large inverted download button\\\" >\"],[0,\"\\n            \"],[2,\"Book Appointment\"],[0,\"\\n          \"],[2,\"</a>\"],[0,\"\\n          \"],[6,\"a\"],[9,\"href\",\"/#\"],[9,\"class\",\"ui large inverted basic button\"],[7],[0,\"Ask a Physio\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui vertical stripe intro segment\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui stackable centered very relaxed stacked aligned grid container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n          \"],[6,\"img\"],[9,\"class\",\"ui image\"],[9,\"src\",\"assets/images/home/Steph-4491-1200x1800.jpg\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"twelve wide column\"],[7],[0,\"\\n          \"],[6,\"h1\"],[9,\"class\",\"ui header\"],[7],[0,\"Stephanie Marcotte\"],[8],[0,\"\\n          \"],[6,\"p\"],[7],[0,\"I believe movement is life.\"],[6,\"br\"],[7],[8],[0,\"\\n            I believe you can heal your body with functional movement patterns.\"],[6,\"br\"],[7],[8],[0,\"\\n            I believe it is never to late to create change in a body & it can happen fast.\"],[6,\"br\"],[7],[8],[0,\"\\n            I believe your body knows what it needs.\"],[6,\"br\"],[7],[8],[0,\"\\n            I believe every system in your body relies on a functional musculoskeletal system.\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n            All systems in the body work on movement:\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n          \"],[6,\"ul\"],[7],[0,\"\\n            \"],[6,\"li\"],[7],[0,\"the heart beats\"],[8],[0,\"\\n            \"],[6,\"li\"],[7],[0,\"the lungs breath\"],[8],[0,\"\\n            \"],[6,\"li\"],[7],[0,\"the stomach grinds\"],[8],[0,\"\\n            \"],[6,\"li\"],[7],[0,\"the colon transports\"],[8],[0,\"\\n            \"],[6,\"li\"],[7],[0,\"the blood flows\"],[8],[0,\"\\n            \"],[6,\"li\"],[7],[0,\"the nerves conduct\"],[8],[0,\"\\n            \"],[6,\"li\"],[7],[0,\"the muscles contract\"],[8],[0,\"\\n          \"],[8],[6,\"br\"],[7],[8],[0,\"\\n          Dis-ease in the body begins when movement is impaired. Restore your proper design for movement and your pain will cease. No fancy machinery or magic pills required; your body already has everything it needs to heal.\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n          I believe you need to trust yourself.\"],[6,\"br\"],[7],[8],[0,\"\\n          I believe you need to take responsibility for your present state of health.\"],[6,\"br\"],[7],[8],[0,\"\\n          I believe you can become free of your pain.\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[2,\"<div class=\\\"stackable very relaxed ui grid container\\\">\"],[0,\"\\n    \"],[2,\"</div>\"],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"feature alternate ui stripe vertical segment\"],[7],[0,\"\\n\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/welcome-page.hbs" } });
});
define("self-start-front-end/templates/country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aUtP+eOA", "block": "{\"symbols\":[\"country\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Countries\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-country\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;\"],[7],[1,[25,\"edit-country\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-country\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/country.hbs" } });
});
define("self-start-front-end/templates/dashboard", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "TZIG6YLm", "block": "{\"symbols\":[],\"statements\":[[4,\"nav-bar\",null,null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg4\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"tagline\"],[7],[0,\"\\n         Client Dashboard\\n      \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/dashboard.hbs" } });
});
define("self-start-front-end/templates/exercise", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aVRtzoKj", "block": "{\"symbols\":[\"Exercise\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Exercises\"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[0,\"\\n            \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;  padding-top: .5%;\"],[7],[1,[25,\"delete-exercises\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;  padding-top: .5%;\"],[7],[1,[25,\"edit-exercises\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 30%; \"],[7],[1,[19,1,[\"description\"]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"id\",\"add\"],[9,\"class\",\"container\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"new-exercise\"],null,{\"statements\":[[0,\"    \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"plus icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/exercise.hbs" } });
});
define("self-start-front-end/templates/exercises", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "e5CmHWGA", "block": "{\"symbols\":[\"Exercise\"],\"statements\":[[6,\"div\"],[9,\"id\",\"content\"],[7],[0,\"\\n  \"],[1,[18,\"add-exercises\"],false],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"ui single line table\"],[7],[0,\"\\n\\n    \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Exercise Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Description\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"exercise\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,1,[\"description\"]],false],[8],[0,\"\\n        \"],[6,\"td\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"four wide column right aligned\"],[7],[0,\"\\n            \"],[1,[25,\"edit-exercises\",null,[[\"ID\",\"images\"],[[19,1,[\"id\"]],[19,1,[\"images\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"four wide column left aligned\"],[7],[0,\"\\n            \"],[1,[25,\"delete-exercises\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/exercises.hbs" } });
});
define("self-start-front-end/templates/form-display", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "XzW9AC1k", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[1,[25,\"display-questions\",null,[[\"id\"],[[20,[\"id\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/form-display.hbs" } });
});
define("self-start-front-end/templates/forms", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zARdPO/F", "block": "{\"symbols\":[\"form\"],\"statements\":[[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"h2\"],[7],[0,\" Forms \"],[8],[0,\"\\n\\n\"],[4,\"ui-accordion\",null,null,{\"statements\":[[4,\"each\",[[20,[\"model\",\"form\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"twelve wide column\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"title\"],[7],[0,\"\\n         \"],[6,\"i\"],[9,\"class\",\"ui dropdown blue icon\"],[7],[8],[0,\"\\n          \"],[1,[19,1,[\"name\"]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[1,[25,\"show-form-questions\",null,[[\"questions\",\"thisForm\"],[[19,1,[\"questions\"]],[19,1,[]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"six wide column right aligned\"],[7],[0,\"\\n          \"],[1,[25,\"manage-form\",null,[[\"ID\",\"questions\",\"form\",\"fName\"],[[19,1,[\"id\"]],[19,1,[\"questions\"]],[19,1,[]],[19,1,[\"name\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[6,\"a\"],[9,\"id\",\"questions\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"formDisplay\",[25,\"query-params\",null,[[\"id\"],[[19,1,[\"id\"]]]]]],null,{\"statements\":[[0,\"              \"],[6,\"button\"],[9,\"class\",\"ui button\"],[7],[0,\"View Form\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide column right aligned\"],[7],[0,\"\\n        \"],[1,[25,\"edit-form\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide column left aligned\"],[7],[0,\"\\n        \"],[1,[25,\"delete-form\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[1,[18,\"add-form\"],false],[0,\"\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/forms.hbs" } });
});
define("self-start-front-end/templates/gender", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ubewetn6", "block": "{\"symbols\":[\"gender\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Genders\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[0,\"\\n            \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-gender\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;\"],[7],[1,[25,\"edit-gender\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-gender\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/gender.hbs" } });
});
define("self-start-front-end/templates/home", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+hjUF3+G", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[1,[25,\"welcome-page\",null,[[\"model\"],[[20,[\"model\"]]]]],false],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/home.hbs" } });
});
define("self-start-front-end/templates/images", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8moXPiJV", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/images.hbs" } });
});
define("self-start-front-end/templates/manage-selections", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "o5yRehUm", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"config-selection\",null,[[\"model\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/manage-selections.hbs" } });
});
define("self-start-front-end/templates/message", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SluaZqBa", "block": "{\"symbols\":[],\"statements\":[[4,\"nav-bar\",null,null,{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg1\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"library\"],[7],[0,\"Self Start\"],[8],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"tagline\"],[7],[0,\"\\n            You have Registered. Login to access your dashboard.\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/message.hbs" } });
});
define("self-start-front-end/templates/new-exercise", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GybKU8+I", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-exercises\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/new-exercise.hbs" } });
});
define("self-start-front-end/templates/new-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "E5IIhA2N", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"add-patient\",null,[[\"model\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/new-patient.hbs" } });
});
define("self-start-front-end/templates/new-physiotherapist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SU7nfG4w", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-physiotherapist\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/new-physiotherapist.hbs" } });
});
define("self-start-front-end/templates/new-rehabplans", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zCDP/nRZ", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-rehabplan\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/new-rehabplans.hbs" } });
});
define("self-start-front-end/templates/patient-file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Esp83gK2", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/patient-file.hbs" } });
});
define("self-start-front-end/templates/patients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2cv4Totk", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[1,[18,\"manage-patients\"],false],[0,\"\\n\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/patients.hbs" } });
});
define("self-start-front-end/templates/physiotherapists", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1FT7h3uN", "block": "{\"symbols\":[\"physiotherapest\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Physiotherapists\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"givenName\"]],false],[0,\" \"],[1,[19,1,[\"familyName\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-physiotherapist\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%; cursor: pointer;\"],[9,\"title\",\"Edit\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"update-physiotherapist\",[19,1,[\"id\"]]],null,{\"statements\":[[0,\"                \"],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[8],[0,\"\\n\\n\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"id\",\"add\"],[9,\"class\",\"container\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"new-physiotherapist\"],null,{\"statements\":[[0,\"    \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"plus icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/physiotherapists.hbs" } });
});
define("self-start-front-end/templates/province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "71SG2//Q", "block": "{\"symbols\":[\"province\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Provinces\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-province\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-province\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/province.hbs" } });
});
define("self-start-front-end/templates/questions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UZz3qCCC", "block": "{\"symbols\":[\"question\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"p\"],[9,\"style\",\"margin-left: 10%\"],[7],[1,[18,\"add-question\"],false],[8],[0,\"\\n\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Questions\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"questionText\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-top: .5%;\"],[7],[1,[25,\"delete-question\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;  padding-top: .5%;\"],[7],[1,[25,\"modify-question\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 20%; \"],[7],[1,[19,1,[\"type\"]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/questions.hbs" } });
});
define("self-start-front-end/templates/register", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4DjiPkJ4", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"user-info\",null,[[\"model\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/register.hbs" } });
});
define("self-start-front-end/templates/rehabplans", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8uo3sgzL", "block": "{\"symbols\":[\"Rehabplan\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"id\",\"content\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui search\"],[9,\"style\",\"margin-left: 70%\"],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"input\"],[9,\"class\",\"prompt\"],[9,\"type\",\"text\"],[9,\"placeholder\",\"Search Rehabilitation plan\"],[7],[8],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n    \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n        \"],[6,\"ul\"],[7],[0,\"\\n          \"],[6,\"li\"],[9,\"style\",\"text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Rehabilitation Plan\"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"li\"],[7],[0,\"\\n              \"],[1,[19,1,[\"planName\"]],false],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right;  padding-top: .5%;\"],[7],[1,[25,\"delete-rehabplan\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;  padding-top: .5%;\"],[7],[1,[25,\"edit-rehabplan\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 30%; \"],[7],[1,[19,1,[\"description\"]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"id\",\"add\"],[9,\"class\",\"container\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"new-rehabplans\"],null,{\"statements\":[[0,\"    \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"plus icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/rehabplans.hbs" } });
});
define("self-start-front-end/templates/update-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5tb/Gk2l", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"edit-patient\",null,[[\"pateintsData\",\"DOB\"],[[20,[\"model\"]],[20,[\"model\",\"dateOfBirth\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/update-patient.hbs" } });
});
define("self-start-front-end/templates/update-physiotherapist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4kIkaGFU", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"edit-physiotherapist\",null,[[\"physiotherapistData\",\"DOB\"],[[20,[\"model\"]],[20,[\"model\",\"dateOfBirth\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/update-physiotherapist.hbs" } });
});
define('self-start-front-end/transitions', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    // Add your transitions here, like:
    //   this.transition(
    //     this.fromRoute('people.index'),
    //     this.toRoute('people.detail'),
    //     this.use('toLeft'),
    //     this.reverse('toRight')
    //   );

    this.transition(this.hasClass('editing'),

    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(true), this.use('toLeft', { duration: 700 }),

    // which means we can also apply a reverse rule for transitions to
    // the false state.
    this.reverse('toRight', { duration: 500 }));
  };
});
define('self-start-front-end/transitions/cross-fade', ['exports', 'liquid-fire/transitions/cross-fade'], function (exports, _crossFade) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _crossFade.default;
    }
  });
});
define('self-start-front-end/transitions/default', ['exports', 'liquid-fire/transitions/default'], function (exports, _default) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _default.default;
    }
  });
});
define('self-start-front-end/transitions/explode', ['exports', 'liquid-fire/transitions/explode'], function (exports, _explode) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _explode.default;
    }
  });
});
define('self-start-front-end/transitions/fade', ['exports', 'liquid-fire/transitions/fade'], function (exports, _fade) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _fade.default;
    }
  });
});
define('self-start-front-end/transitions/flex-grow', ['exports', 'liquid-fire/transitions/flex-grow'], function (exports, _flexGrow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flexGrow.default;
    }
  });
});
define('self-start-front-end/transitions/fly-to', ['exports', 'liquid-fire/transitions/fly-to'], function (exports, _flyTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flyTo.default;
    }
  });
});
define('self-start-front-end/transitions/move-over', ['exports', 'liquid-fire/transitions/move-over'], function (exports, _moveOver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moveOver.default;
    }
  });
});
define('self-start-front-end/transitions/scale', ['exports', 'liquid-fire/transitions/scale'], function (exports, _scale) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _scale.default;
    }
  });
});
define('self-start-front-end/transitions/scroll-then', ['exports', 'liquid-fire/transitions/scroll-then'], function (exports, _scrollThen) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _scrollThen.default;
    }
  });
});
define('self-start-front-end/transitions/to-down', ['exports', 'liquid-fire/transitions/to-down'], function (exports, _toDown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toDown.default;
    }
  });
});
define('self-start-front-end/transitions/to-left', ['exports', 'liquid-fire/transitions/to-left'], function (exports, _toLeft) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toLeft.default;
    }
  });
});
define('self-start-front-end/transitions/to-right', ['exports', 'liquid-fire/transitions/to-right'], function (exports, _toRight) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toRight.default;
    }
  });
});
define('self-start-front-end/transitions/to-up', ['exports', 'liquid-fire/transitions/to-up'], function (exports, _toUp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toUp.default;
    }
  });
});
define('self-start-front-end/transitions/wait', ['exports', 'liquid-fire/transitions/wait'], function (exports, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _wait.default;
    }
  });
});
define('self-start-front-end/utils/file-object', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Object.extend({
    // Name is used for the upload property
    name: '',

    // {Property} Human readable size of the selected file
    size: "0 KB",

    // {Property} Raw file size of the selected file
    rawSize: 0,

    // {Property} Indicates if this file is an image we can display
    isDisplayableImage: false,

    // {Property} String representation of the file
    base64Image: '',

    // {Property} Will be an HTML5 File
    fileToUpload: null,

    // {Property} The acceptable file size in MB
    maximumFileSize: 0,

    // {Property} If a file is currently being uploaded
    isUploading: false,

    // {Property} If the file was uploaded successfully
    isUploaded: false,

    humanReadableFileSize: function humanReadableFileSize(size) {
      var label = "";
      if (size == 0) {
        label = "0 KB";
      } else if (size && !isNaN(size)) {
        var fileSizeInBytes = size;
        var i = -1;
        do {
          fileSizeInBytes = fileSizeInBytes / 1024;
          i++;
        } while (fileSizeInBytes > 1024);

        var byteUnits = [' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
        label += Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
      }
      return label;
    },

    readFile: function readFile() {
      var self = this;
      this.set('isUploading', true);
      this.set('isUploaded', false);
      var fileToUpload = this.get('fileToUpload');
      var isImage = fileToUpload.type.indexOf('image') === 0;

      this.set('name', fileToUpload.name);
      this.set('type', fileToUpload.type);
      this.set('rawSize', fileToUpload.size);
      this.set('size', self.humanReadableFileSize(fileToUpload.size));

      // Create a reader and read the file.
      var reader = new FileReader();
      reader.onprogress = function () {
        self.set('isUploading', true);
        self.set('isUploaded', false);
      };
      reader.onloadend = function (event) {
        self.set('base64Image', event.target.result);
        self.set('isUploading', false);
        self.set('isUploaded', true);
      };
      this.set('isDisplayableImage', false);
      self.set('isUploading', false);
      self.set('isUploaded', true);
      if (isImage) {
        // Don't read anything bigger than 5 MB
        var maxSize = self.get('maximumFileSize') * 1024 * 1024;
        if (fileToUpload.size <= maxSize) {
          this.set('isDisplayableImage', true);
          // Read in the image file from the file explorer.
          reader.readAsDataURL(fileToUpload);
        } else {
          // Read in the error image file.
          self.set('base64Image', '/assets/images/square-image.png');
        }
      } else {
        // not an image
        self.set('base64Image', '/assets/images/square-image.png');
      }
    },
    init: function init() {
      this._super.apply(this, arguments);
      this.readFile();
    }
  });
});
define('self-start-front-end/utils/get-promise-content', ['exports', 'ember-promise-tools/utils/get-promise-content'], function (exports, _getPromiseContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _getPromiseContent.default;
    }
  });
});
define('self-start-front-end/utils/is-fulfilled', ['exports', 'ember-promise-tools/utils/is-fulfilled'], function (exports, _isFulfilled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isFulfilled.default;
    }
  });
});
define('self-start-front-end/utils/is-promise', ['exports', 'ember-promise-tools/utils/is-promise'], function (exports, _isPromise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isPromise.default;
    }
  });
});
define('self-start-front-end/utils/smart-resolve', ['exports', 'ember-promise-tools/utils/smart-resolve'], function (exports, _smartResolve) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _smartResolve.default;
    }
  });
});
define('self-start-front-end/utils/titleize', ['exports', 'ember-cli-string-helpers/utils/titleize'], function (exports, _titleize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _titleize.default;
    }
  });
});
define('self-start-front-end/validators/alias', ['exports', 'ember-cp-validations/validators/alias'], function (exports, _alias) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _alias.default;
    }
  });
});
define('self-start-front-end/validators/belongs-to', ['exports', 'ember-cp-validations/validators/belongs-to'], function (exports, _belongsTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _belongsTo.default;
    }
  });
});
define('self-start-front-end/validators/collection', ['exports', 'ember-cp-validations/validators/collection'], function (exports, _collection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _collection.default;
    }
  });
});
define('self-start-front-end/validators/confirmation', ['exports', 'ember-cp-validations/validators/confirmation'], function (exports, _confirmation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _confirmation.default;
    }
  });
});
define('self-start-front-end/validators/date', ['exports', 'ember-cp-validations/validators/date'], function (exports, _date) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _date.default;
    }
  });
});
define('self-start-front-end/validators/dependent', ['exports', 'ember-cp-validations/validators/dependent'], function (exports, _dependent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dependent.default;
    }
  });
});
define('self-start-front-end/validators/ds-error', ['exports', 'ember-cp-validations/validators/ds-error'], function (exports, _dsError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dsError.default;
    }
  });
});
define('self-start-front-end/validators/exclusion', ['exports', 'ember-cp-validations/validators/exclusion'], function (exports, _exclusion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _exclusion.default;
    }
  });
});
define('self-start-front-end/validators/format', ['exports', 'ember-cp-validations/validators/format'], function (exports, _format) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _format.default;
    }
  });
});
define('self-start-front-end/validators/has-many', ['exports', 'ember-cp-validations/validators/has-many'], function (exports, _hasMany) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasMany.default;
    }
  });
});
define('self-start-front-end/validators/inclusion', ['exports', 'ember-cp-validations/validators/inclusion'], function (exports, _inclusion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inclusion.default;
    }
  });
});
define('self-start-front-end/validators/length', ['exports', 'ember-cp-validations/validators/length'], function (exports, _length) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _length.default;
    }
  });
});
define('self-start-front-end/validators/messages', ['exports', 'ember-cp-validations/validators/messages'], function (exports, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _messages.default;
    }
  });
});
define('self-start-front-end/validators/number', ['exports', 'ember-cp-validations/validators/number'], function (exports, _number) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _number.default;
    }
  });
});
define('self-start-front-end/validators/presence', ['exports', 'ember-cp-validations/validators/presence'], function (exports, _presence) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _presence.default;
    }
  });
});


define('self-start-front-end/config/environment', [], function() {
  var prefix = 'self-start-front-end';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("self-start-front-end/app")["default"].create({"name":"self-start-front-end","version":"0.0.0+4afe42f7"});
}
//# sourceMappingURL=self-start-front-end.map
