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
define('self-start-front-end/components/add-admin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
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
    cbState: false,
    temp: [],
    queue2: [],
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

    modalName: Ember.computed(function () {
      return 'add-exercise' + this.get('id');
    }),

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
      },
      addExercise: function addExercise() {
        this.set('isEditing', true);
      },


      submit: function submit() {
        var _this = this;

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
        var secQueue2 = [];

        this.queue.forEach(function (file) {
          secQueue.pushObject(file);
        });
        console.log("this is q2", this.queue2);
        this.queue2.forEach(function (file) {
          secQueue2.push(file);
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

          secQueue2.forEach(function (file) {
            _this.get('DS').findRecord(_this.get('model'), file.get('id')).then(function (obj) {
              obj.get('exercise').pushObject(exercise);
              obj.save();
              exercise.get('images').pushObject(obj);
            });
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
        this.set('isEditing', false);

        // window.location.reload();
        // windows.location.reload();
      },

      addTempImage: function addTempImage(image) {
        console.log(image);
        this.temp.push(image);
        console.log(image.name);
      },

      openModal: function openModal() {
        var _this2 = this;

        console.log("ajskdaksjd");
        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          onDeny: function onDeny() {
            console.log("sa");
            _this2.get('temp').clear();
            return true;
          },

          onApprove: function onApprove() {

            var self = _this2;
            console.log("asdjaskdjaksdj");
            console.log(_this2.temp);
            _this2.get('temp').forEach(function (obj) {
              self.get("queue2").pushObject(obj);
            });

            _this2.get('temp').clear();
            return true;
          }
        }).modal('show');
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
define('self-start-front-end/components/add-image', ['exports', 'self-start-front-end/utils/file-object'], function (exports, _fileObject) {
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
      },


      submit: function submit() {
        var _this = this;

        var secQueue = [];

        this.queue.forEach(function (file) {
          secQueue.pushObject(file);
        });

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

          newFile.save();
        });
        this.queue.clear();

        // window.location.reload();
        // windows.location.reload();
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
    flagAdd: null,

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
      submit: function submit() {
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
          Ember.$('.ui.newPatient.modal').modal('hide');
          if (_this.get('flagAdd') === true) _this.set('flagAdd', false);else _this.set('flagAdd', true);
          return true;
        });
      },


      openModal: function openModal() {
        Ember.$('.ui.newPatient.modal').modal({
          closable: false,

          onDeny: function onDeny() {
            return true;
          }

        }).modal('show');
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
    flagAdd: null,
    tagName: '',

    init: function init() {
      this._super.apply(this, arguments);

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


    genderModel: Ember.computed(function () {
      return this.get('DS').findAll('gender');
    }),

    actions: {
      selectGender: function selectGender(gender) {
        this.set('selectedGender', gender);
      },
      assignHiredDate: function assignHiredDate(date) {
        this.set('selectedHiredDate', date);
      },
      assignFiredDate: function assignFiredDate(date) {
        this.set('selectedFiredDate', date);
      },
      submit: function submit() {
        var _this = this;

        var self = this;

        var physioAccount = {};
        physioAccount['encryptedPassword'] = self.get('encryptedPassword');

        var physiotherapist = this.get('DS').createRecord('physiotherapest', {
          familyName: self.get('familyName'),
          givenName: self.get('givenName'),
          email: self.get('email'),
          dateHired: new Date(this.get('selectedHiredDate')),
          dateFired: new Date(this.get('selectedFiredDate')),
          gender: self.get('selectedGender'),
          phoneNumber: self.get('phoneNumber'),
          //treatment: self.get('treatment'),
          account: physioAccount

        });
        physiotherapist.save().then(function () {
          Ember.$('.ui.newPhysio.modal').modal('hide');
          _this.set('familyName', '');
          _this.set('givenName', '');
          _this.set('email', '');
          _this.set('selectedGender', '');
          _this.set('dateHired', '');
          _this.set('dateFired', '');
          _this.set('phoneNumber', '');
          _this.set('encryptedPassword', '');
          if (_this.get('flagAdd') === true) _this.set('flagAdd', false);else _this.set('flagAdd', true);
          return true;
        });
      },

      openModal: function openModal() {
        Ember.$('.ui.newPhysio.modal').modal({
          closable: false,

          onDeny: function onDeny() {
            return true;
          }

        }).modal('show');
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

    countries: Ember.computed(function () {
      return this.get('DS').findAll('country');
    }),

    actions: {

      setCountryId: function setCountryId(comp, id) {
        this.set('countryId', id);
      },

      openModal: function openModal() {
        var _this = this;

        // this.set('name', '');
        // this.set('countryId', null);
        // this.set('city', []);

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
        // this.set('trueFalse', false);
        // this.set('shortAns', false);
        // this.set('multipleChoice', false);
        // this.set('rating',true);
      },
      addQuestion: function addQuestion() {
        this.set('shortAns', false);
        this.set('multipleChoice', false);
        this.set('rating', false);
        this.set('trueFalse', false);
      },


      // cancel: function () {
      //   this.set('isEditing', false);
      // },

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
          self.set('shortAns', false);
          self.set('multipleChoice', false);
          self.set('rating', false);
          self.set('trueFalse', false);
          return true;
        });

        this.set('shortAns', false);
        this.set('multipleChoice', false);
        this.set('rating', false);
        this.set('trueFalse', false);
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
      selectExercise: function selectExercise(exercise) {
        this.set('selectedExercise', exercise);
      },
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
          timeToComplete: self.get('timeToComplete'),
          exercises: self.get('selectedExercise')
          //assessmentTests: self.get('assessmentTests'),
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
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      Ember.$('body').visibility({
        offset: -10,
        observeChanges: false,
        once: false,
        continuous: false,
        onTopPassed: function onTopPassed() {
          requestAnimationFrame(function () {
            Ember.$('.following.bar').addClass('light fixed').find('.menu').removeClass('inverted');
            Ember.$('.following .additional.item').transition('scale in', 750);
            Ember.$('.selfStart').attr("src", '/assets/images/marcotte-self-start-bodysmartFINAL.png');
          });
        },
        onTopPassedReverse: function onTopPassedReverse() {
          requestAnimationFrame(function () {
            Ember.$('.following.bar').removeClass('light fixed').find('.menu').addClass('inverted').find('.additional.item').transition('hide');
            Ember.$('.selfStart').attr("src", '/assets/images/home/Header.png');
          });
        }
      });
    },


    actions: {}
  });
});
define('self-start-front-end/components/admin-table', ['exports'], function (exports) {
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
    query: null,
    flagDelete: false,

    modelAttributes: [{ 'key': 'givenName', 'name': 'First Name', 'dir': 'asc', 'class': 'left aligned two wide column' }, { 'key': 'familyName', 'name': 'Last Name', 'dir': '', 'class': 'left aligned two wide column' }, { 'key': 'dateHired', 'name': 'Date Hired', 'dir': '', 'class': 'left aligned five wide column' }, { 'key': 'email', 'name': 'Email', 'dir': '', 'class': 'left aligned four wide column' }],

    adminsModel: [],
    INDEX: null,
    queryPath: 'givenName',
    scrolledLines: 0,

    activeModel: Ember.observer('offset', 'limit', 'sort', 'dir', 'flagDelete', function () {
      var self = this;

      this.get('store').query('administrator', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('adminsModel', records.toArray());
      });
    }),

    filteradmins: Ember.observer('query', 'queryPath', function () {
      var queryText = this.get('query');
      if (queryText !== null && queryText.length > 0) {
        this.set('regex', "^" + queryText);
      } else {
        this.set('regex', '');
      }

      this.get('store').query('administrator', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('adminsModel', records.toArray());
      });
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this.set('limit', 10);
      this.set('offset', 0);
      this.set('pageSize', 10);
      var self = this;

      this.get('store').query('administrator', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('adminsModel', records.toArray());
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
      sortColumn: function sortColumn(columnName, direction) {
        var _this = this;

        this.get('modelAttributes').forEach(function (element) {
          if (element.key === columnName) {
            if (direction === 'asc') {
              Ember.set(element, 'dir', 'desc');
              _this.set('dir', 'desc');
            } else if (direction === 'desc') {
              Ember.set(element, 'dir', 'asc');
              _this.set('dir', 'asc');
            } else {
              Ember.set(element, 'dir', 'asc');
              _this.set('dir', 'asc');
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
define('self-start-front-end/components/admin-welcome', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('self-start-front-end/components/as-calendar', ['exports', 'ember-calendar/components/as-calendar'], function (exports, _asCalendar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _asCalendar.default;
});
define('self-start-front-end/components/as-calendar/header', ['exports', 'ember-calendar/components/as-calendar/header'], function (exports, _header) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _header.default;
});
define('self-start-front-end/components/as-calendar/occurrence', ['exports', 'ember-calendar/components/as-calendar/occurrence'], function (exports, _occurrence) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _occurrence.default;
});
define('self-start-front-end/components/as-calendar/time-zone-option', ['exports', 'ember-calendar/components/as-calendar/time-zone-option'], function (exports, _timeZoneOption) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _timeZoneOption.default;
});
define('self-start-front-end/components/as-calendar/time-zone-select', ['exports', 'ember-calendar/components/as-calendar/time-zone-select'], function (exports, _timeZoneSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _timeZoneSelect.default;
});
define('self-start-front-end/components/as-calendar/timetable', ['exports', 'ember-calendar/components/as-calendar/timetable'], function (exports, _timetable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _timetable.default;
});
define('self-start-front-end/components/as-calendar/timetable/content', ['exports', 'ember-calendar/components/as-calendar/timetable/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _content.default;
});
define('self-start-front-end/components/as-calendar/timetable/occurrence', ['exports', 'ember-calendar/components/as-calendar/timetable/occurrence'], function (exports, _occurrence) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _occurrence.default;
});
define('self-start-front-end/components/assign-rehabplan', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    plansData: null,
    store: Ember.inject.service('store'),
    model: null,
    ajax: Ember.inject.service(),

    modalName: Ember.computed(function () {
      return 'editAssign' + this.get('plansData').id;
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
            var self = _this;
            var link = _this.get('store').createRecord('rehab-client-link', {
              terminated: _this.get('plansData.terminated'),
              RehabilitationPlan: _this.get('plansData'),
              Patient: _this.get('model'),
              assigned: true
            });
            link.save().then(function (res) {
              //   this.get('ajax').request('http://localhost:8082/rehabClientLinks', {
              //     method: 'POST',
              //     data: {
              //       rehabClientLink: {
              //         terminated: this.get('plansData.terminated'),
              //         RehabilitationPlan: this.get('plansData'),
              //         Patient: this.get('model'),
              //         assigned: true
              //       }
              //     },
              //     success: function(res) {
              //       if(res.success) {
              //         $('.ui.' + this.get('modalName') + '.modal').modal('hide');
              //         return true;
              //       } else {
              //         alert("This Rehab Plan is already assigned to this patient");
              //       }
              //     }
              //   });

              if (res.success) {
                Ember.$('.ui.' + _this.get('modalName') + '.modal').modal('hide');
                return true;
              } else {
                link.destroyRecord().then(function (o) {
                  console.log(o);
                });
                alert("This Rehab Plan is already assigned to this patient");
              }
            });
          }
        }).modal('show');
      }
    }
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
define('self-start-front-end/components/book-appointment', ['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    occurrences: Ember.A(),
    availableSpot: Ember.A(),
    removedSpot: Ember.A(),

    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),
    isEditing: false,

    modalName: Ember.computed(function () {
      return 'Book Appointment';
    }),
    givenName: null,
    familyName: null,
    timeSlots: Ember.A(),
    selectedappointmentBlock: null,
    selectedbookedTime: null,

    phyidget: null,

    physioPicked: false,

    getphysio: Ember.computed(function () {
      return this.get('DS').findAll('physiotherapest');
    }),

    init: function init() {
      this._super.apply(this, arguments);
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);

      if (Ember.$('.floating-labels').length > 0) floatLabels();

      function floatLabels() {
        var inputFields = Ember.$('.floating-labels .cd-label').next();
        inputFields.each(function () {
          var singleInput = Ember.$(this);
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
    },


    actions: {
      calendarAddOccurrence: function calendarAddOccurrence(occurrence) {
        // this.get('occurrences').pushObject(Ember.Object.create({
        //   title: occurrence.get('title'),
        //   startsAt: occurrence.get('startsAt'),
        //   endsAt: occurrence.get('endsAt')
        // }));
        //
        // console.log(JSON.stringify(this.get('occurrences')));
      },

      calendarUpdateOccurrence: function calendarUpdateOccurrence(occurrence, properties, isPreview) {
        console.log(JSON.stringify(occurrence));
        this.set('selectedappointmentBlock', occurrence);

        Ember.$('.ui.bk.modal').modal({
          closeable: false,
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {
            return true;
          }
        }).modal('show');
      },

      calendarRemoveOccurrence: function calendarRemoveOccurrence(occurrence) {
        // this.get('occurrences').removeObject(occurrence);
        // console.log(JSON.stringify(occurrence));
      },

      updateValue: function updateValue(physio) {
        this.set('occurrences', Ember.A());
        this.set('removedSpot', Ember.A());

        var home = this;
        //save physioid
        this.set('selectedPhysioId', physio);
        //get record of selected physiotherapist
        this.get('DS').findRecord('physiotherapest', physio).then(function (phy) {
          //might not need this
          home.set('selectedphysio', phy);
          home.set('givenName', phy.get('givenName'));
          home.set('familyName', phy.get('familyName'));
          //get each appointment by  physiotherapist appointment
          phy.get('appointments').forEach(function (obj) {
            var curid = obj.get('id');
            home.get('DS').findRecord('appointment', curid).then(function (app) {
              var scheduledDate = (0, _moment.default)(app.get('date'));
              var endDate = (0, _moment.default)(app.get('endDate'));
              //filter out any appointments that is previous to current date
              if (scheduledDate > (0, _moment.default)()) {
                if (app.get('reason') == null) {
                  home.get('occurrences').pushObject(Ember.Object.create({
                    title: "Book Appointment",
                    isDraggable: true,
                    isResizable: false,
                    isRemovable: false,
                    startsAt: scheduledDate.toISOString(),
                    endsAt: endDate.toISOString(),
                    tempid: app.get('id')
                  }));
                }
              }
            });
          });
        });
      },
      updateTime: function updateTime(type) {
        // this.get('occurrences').pushObject(Ember.Object.create({
        //   title: occurrence.get('title'),
        //   startsAt: occurrence.get('startsAt'),
        //   endsAt: occurrence.get('endsAt')
        // }));
        this.set('timeSlots', Ember.A());

        var selected = this.get('selectedappointmentBlock');
        var start_time = selected.startsAt;
        var end_time = selected.endsAt;

        var amount = void 0;
        if (type === 't') amount = 60;else amount = 90;

        while ((0, _moment.default)(start_time).add(amount, 'minute') <= (0, _moment.default)(end_time)) {
          this.get('timeSlots').pushObject(Ember.Object.create({
            time: (0, _moment.default)(start_time),
            end: (0, _moment.default)(start_time).add(amount, 'minute'),
            value: (0, _moment.default)(start_time).format('hh:mm A')
          }));

          start_time = (0, _moment.default)(start_time).add(30, 'minute');
        }
      },
      setselectedtime: function setselectedtime(t) {
        var self = this;
        this.get('timeSlots').forEach(function (obj) {
          if ((0, _moment.default)(t).isSame(obj.time)) {
            self.set('selectedbookedTime', obj);
          }
        });
        console.log(JSON.stringify(this.get('selectedbookedTime')));
      },
      cancel_appointment: function cancel_appointment() {
        this.set('Reason', '');
        this.set('selectAppointmentType', '');
        this.set('Other', '');
        this.set('selectedTime', '');
        this.set('timeSlots', Ember.A());
        Ember.$('.ui.bk.modal').modal('hide');
      },
      book_appointment: function book_appointment() {
        var self = this;
        //temp client until we get token
        //laptop
        var client = '5ab9649cc7f3c62814754951';
        //desktop
        // let client = '5a88738e1f0fdc2b94498e81';
        var physio = self.get('selectphysio');
        var booking = this.get('DS').createRecord('appointment', {
          reason: self.get('Reason'),
          other: self.get('Other'),
          date: self.get('selectedbookedTime').time,
          endDate: self.get('selectedbookedTime').end
        });
        self.get('DS').findRecord('patient', client).then(function (src) {
          console.log(src);
          booking.set('patient', src);
          src.get('appointments').pushObject(booking);
          booking.save().then(function () {
            src.save().then(function () {
              self.get('DS').findRecord('physiotherapest', self.get('selectedPhysioId')).then(function (a) {
                a.get('appointments').pushObject(booking);
                a.save().then(function () {
                  //{"title":"Book Appointment","startsAt":"2018-03-16T13:00:00.000Z","endsAt":"2018-03-16T17:30:00.000Z","tempid":"5aa9d71c004e3909bc597bba"}
                  var usedBlock = self.get('selectedappointmentBlock');
                  //time":"2018-03-16T13:00:00.000Z","end":"2018-03-16T14:30:00.000Z","value":"09:00
                  var bookedTime = self.get('selectedbookedTime');
                  //remove the block you used

                  //case 1 if the slots are exact
                  if ((0, _moment.default)(usedBlock.startsAt).isSame(bookedTime.time) && (0, _moment.default)(usedBlock.endsAt).isSame(bookedTime.end)) {
                    console.log("case 1");
                    self.get('DS').findRecord('appointment', usedBlock.tempid).then(function (old) {
                      old.destroyRecord().then(function () {
                        Ember.$('.ui.bk.modal').modal('hide');
                        // window.location.reload();
                      });
                    });
                  }
                  //case 2 booked at the start block
                  else if ((0, _moment.default)(usedBlock.startsAt).isSame(bookedTime.time)) {
                      console.log("case 2");
                      self.get('DS').findRecord('appointment', usedBlock.tempid).then(function (old) {
                        old.set('date', bookedTime.end);
                        old.save().then(function () {
                          Ember.$('.ui.bk.modal').modal('hide');
                          // window.location.reload();
                        });
                      });
                    }
                    //case 3 booked at the end block
                    else if ((0, _moment.default)(usedBlock.endsAt).isSame(bookedTime.end)) {
                        console.log("case 3");
                        self.get('DS').findRecord('appointment', usedBlock.tempid).then(function (old) {
                          old.set('endDate', bookedTime.time);
                          old.save().then(function () {
                            Ember.$('.ui.bk.modal').modal('hide');
                            // window.location.reload();
                          });
                        });
                      }
                      //case 4 booked in between
                      else {
                          //create 2 segmented block
                          var topappo = self.get('DS').createRecord('appointment', {
                            date: usedBlock.startsAt,
                            endDate: bookedTime.time
                          });
                          var bottomappo = self.get('DS').createRecord('appointment', {
                            date: bookedTime.end,
                            endDate: usedBlock.endsAt
                          });
                          topappo.save().then(function () {
                            bottomappo.save().then(function () {
                              a.get('appointments').pushObject(topappo);
                              a.get('appointments').pushObject(bottomappo);
                              a.save().then(function () {
                                //remove old block
                                self.get('DS').findRecord('appointment', usedBlock.tempid).then(function (rec) {
                                  a.get('appointments').removeObject(rec);
                                  a.save().then(function () {
                                    rec.destroyRecord().then(function () {
                                      Ember.$('.ui.bk.modal').modal('hide');
                                      // window.location.reload();
                                    });
                                  });
                                });
                              });
                            });
                          });
                        }
                });
              });
            });
          });
        });
      }
    }
  });
});
define('self-start-front-end/components/client-appointment', ['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    occurrences: Ember.A(),
    availableSpot: Ember.A(),
    removedSpot: Ember.A(),

    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),
    isEditing: false,

    modalName: Ember.computed(function () {
      return 'Book Appointment';
    }),
    givenName: null,
    familyName: null,
    timeSlots: Ember.A(),
    selectedappointmentBlock: null,
    selectedbookedTime: null,

    phyidget: null,

    physioPicked: false,

    getphysio: Ember.computed(function () {
      return this.get('DS').findAll('physiotherapest');
    }),

    init: function init() {
      this._super.apply(this, arguments);
    },


    actions: {
      calendarAddOccurrence: function calendarAddOccurrence(occurrence) {
        // this.get('occurrences').pushObject(Ember.Object.create({
        //   title: occurrence.get('title'),
        //   startsAt: occurrence.get('startsAt'),
        //   endsAt: occurrence.get('endsAt')
        // }));
        //
        // console.log(JSON.stringify(this.get('occurrences')));
      },

      calendarUpdateOccurrence: function calendarUpdateOccurrence(occurrence, properties, isPreview) {
        console.log(JSON.stringify(occurrence));
        this.set('selectedappointmentBlock', occurrence);

        Ember.$('.ui.bk.modal').modal({
          closeable: false,
          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {
            return true;
          }
        }).modal('show');
      },

      calendarRemoveOccurrence: function calendarRemoveOccurrence(occurrence) {
        // this.get('occurrences').removeObject(occurrence);
        // console.log(JSON.stringify(occurrence));
      },

      updateValue: function updateValue(physio) {
        this.set('occurrences', Ember.A());
        this.set('removedSpot', Ember.A());

        var home = this;
        //save physioid
        this.set('selectedPhysioId', physio);
        //get record of selected physiotherapist
        this.get('DS').findRecord('physiotherapest', physio).then(function (phy) {
          //might not need this
          home.set('selectedphysio', phy);
          home.set('givenName', phy.get('givenName'));
          home.set('familyName', phy.get('familyName'));
          //get each appointment by  physiotherapist appointment
          phy.get('appointments').forEach(function (obj) {
            var curid = obj.get('id');
            home.get('DS').findRecord('appointment', curid).then(function (app) {
              var scheduledDate = (0, _moment.default)(app.get('date'));
              var endDate = (0, _moment.default)(app.get('endDate'));
              //filter out any appointments that is previous to current date
              if (scheduledDate > (0, _moment.default)()) {
                if (app.get('reason') == null) {
                  home.get('occurrences').pushObject(Ember.Object.create({
                    title: "Book Appointment",
                    startsAt: scheduledDate.toISOString(),
                    endsAt: endDate.toISOString(),
                    tempid: app.get('id')
                  }));
                }
              }
            });
          });
        });
      },
      updateTime: function updateTime(type) {
        // this.get('occurrences').pushObject(Ember.Object.create({
        //   title: occurrence.get('title'),
        //   startsAt: occurrence.get('startsAt'),
        //   endsAt: occurrence.get('endsAt')
        // }));
        this.set('timeSlots', Ember.A());

        var selected = this.get('selectedappointmentBlock');
        var start_time = selected.startsAt;
        var end_time = selected.endsAt;

        var amount = void 0;
        if (type === 't') amount = 60;else amount = 90;

        while ((0, _moment.default)(start_time).add(amount, 'minute') <= (0, _moment.default)(end_time)) {
          this.get('timeSlots').pushObject(Ember.Object.create({
            time: (0, _moment.default)(start_time),
            end: (0, _moment.default)(start_time).add(amount, 'minute'),
            value: (0, _moment.default)(start_time).format('hh:mm A')
          }));

          start_time = (0, _moment.default)(start_time).add(30, 'minute');
        }
      },
      setselectedtime: function setselectedtime(t) {
        var self = this;
        this.get('timeSlots').forEach(function (obj) {
          if ((0, _moment.default)(t).isSame(obj.time)) {
            self.set('selectedbookedTime', obj);
          }
        });
        console.log(JSON.stringify(this.get('selectedbookedTime')));
      },
      cancel_appointment: function cancel_appointment() {
        this.set('Reason', '');
        this.set('selectAppointmentType', '');
        this.set('Other', '');
        this.set('selectedTime', '');
        this.set('timeSlots', Ember.A());
        Ember.$('.ui.bk.modal').modal('hide');
      },
      book_appointment: function book_appointment() {
        var self = this;
        //temp client until we get token
        //laptop
        var client = '5a8cea371af849309c3833d4';
        //desktop
        // let client = '5a88738e1f0fdc2b94498e81';
        var physio = self.get('selectphysio');
        var booking = this.get('DS').createRecord('appointment', {
          reason: self.get('Reason'),
          other: self.get('Other'),
          date: self.get('selectedbookedTime').time,
          endDate: self.get('selectedbookedTime').end
        });
        self.get('DS').findRecord('patient', client).then(function (src) {
          console.log(src);
          booking.set('patient', src);
          src.get('appointments').pushObject(booking);
          booking.save().then(function () {
            src.save().then(function () {
              self.get('DS').findRecord('physiotherapest', self.get('selectedPhysioId')).then(function (a) {
                a.get('appointments').pushObject(booking);
                a.save().then(function () {
                  //{"title":"Book Appointment","startsAt":"2018-03-16T13:00:00.000Z","endsAt":"2018-03-16T17:30:00.000Z","tempid":"5aa9d71c004e3909bc597bba"}
                  var usedBlock = self.get('selectedappointmentBlock');
                  //time":"2018-03-16T13:00:00.000Z","end":"2018-03-16T14:30:00.000Z","value":"09:00
                  var bookedTime = self.get('selectedbookedTime');
                  //remove the block you used

                  //case 1 if the slots are exact
                  if ((0, _moment.default)(usedBlock.startsAt).isSame(bookedTime.time) && (0, _moment.default)(usedBlock.endsAt).isSame(bookedTime.end)) {
                    console.log("case 1");
                    self.get('DS').findRecord('appointment', usedBlock.tempid).then(function (old) {
                      old.destroyRecord().then(function () {
                        Ember.$('.ui.bk.modal').modal('hide');
                        window.location.reload();
                      });
                    });
                  }
                  //case 2 booked at the start block
                  else if ((0, _moment.default)(usedBlock.startsAt).isSame(bookedTime.time)) {
                      console.log("case 2");
                      self.get('DS').findRecord('appointment', usedBlock.tempid).then(function (old) {
                        old.set('date', bookedTime.end);
                        old.save().then(function () {
                          Ember.$('.ui.bk.modal').modal('hide');
                          window.location.reload();
                        });
                      });
                    }
                    //case 3 booked at the end block
                    else if ((0, _moment.default)(usedBlock.endsAt).isSame(bookedTime.end)) {
                        console.log("case 3");
                        self.get('DS').findRecord('appointment', usedBlock.tempid).then(function (old) {
                          old.set('endDate', bookedTime.time);
                          old.save().then(function () {
                            Ember.$('.ui.bk.modal').modal('hide');
                            window.location.reload();
                          });
                        });
                      }
                      //case 4 booked in between
                      else {
                          //create 2 segmented block
                          var topappo = self.get('DS').createRecord('appointment', {
                            date: usedBlock.startsAt,
                            endDate: bookedTime.time
                          });
                          var bottomappo = self.get('DS').createRecord('appointment', {
                            date: bookedTime.end,
                            endDate: usedBlock.endsAt
                          });
                          topappo.save().then(function () {
                            bottomappo.save().then(function () {
                              a.get('appointments').pushObject(topappo);
                              a.get('appointments').pushObject(bottomappo);
                              a.save().then(function () {
                                //remove old block
                                self.get('DS').findRecord('appointment', usedBlock.tempid).then(function (rec) {
                                  a.get('appointments').removeObject(rec);
                                  a.save().then(function () {
                                    rec.destroyRecord().then(function () {
                                      Ember.$('.ui.bk.modal').modal('hide');
                                      window.location.reload();
                                    });
                                  });
                                });
                              });
                            });
                          });
                        }
                });
              });
            });
          });
        });
      }
    }
  });
});
define('self-start-front-end/components/client-file', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service(),

    limit: 10,
    offset: 0,
    pageSize: 10,
    sort: 'planName',
    dir: '',
    query: null,
    flagDelete: false,
    flagAdd: false,

    modelAttributes: [{ 'key': 'planName', 'name': 'Plan Name', 'dir': 'asc', 'class': 'left aligned five wide column' }, { 'key': 'physioID.givenName', 'name': 'Author Name', 'dir': '', 'class': 'left aligned six wide column' }],

    plansModel: [],
    INDEX: null,
    queryPath: 'planName',
    scrolledLines: 0,

    activeModel: Ember.observer('offset', 'limit', 'sort', 'dir', 'flagDelete', 'flagAdd', function () {
      var self = this;
      console.log(this.plansModel);
      this.get('store').query('rehabilitationplan', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('plansModel', records.toArray());
      });
    }),

    filterplans: Ember.observer('query', 'queryPath', function () {
      var queryText = this.get('query');
      if (queryText !== null && queryText.length > 0) {
        this.set('regex', "^" + queryText);
      } else {
        this.set('regex', '');
      }

      this.get('store').query('rehabilitationplan', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('plansModel', records.toArray());
      });
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this.set('limit', 10);
      this.set('offset', 0);
      this.set('pageSize', 10);
      var self = this;

      this.get('store').query('rehabilitationplan', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('plansModel', records.toArray());
      });

      // this.get('plansModel').forEach(function (gph) {
      //   self.get('store').findRecord('physiotherapest', gph.get('id')).then(()=>{
      //
      //   })
      // });
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

    clientState: "active",
    practState: "",
    adminState: "",

    terminated: false,

    actions: {
      assign: function assign() {
        var assign = self.get('store').createRecord('rehab-client-link', {
          terminated: self.get('terminated'),
          RehabilitationPlan: self.get('RehabilitationPlan'),
          Patient: self.get('Patient')
        });
        //when save is successfull close form
        rehabplan.save().then(function () {
          return true;
        });
      },
      client: function client() {
        this.set('clientView', true);
        this.set('practView', false);
        this.set('adminView', false);
        this.set('clientState', "active");
        this.set('practState', "");
        this.set('adminState', "");
      },
      pract: function pract() {
        this.set('clientView', false);
        this.set('practView', true);
        this.set('adminView', false);
        this.set('clientState', "");
        this.set('practState', "active");
        this.set('adminState', "");
      },
      admin: function admin() {
        this.set('clientView', false);
        this.set('practView', false);
        this.set('adminView', true);
        this.set('clientState', "");
        this.set('practState', "");
        this.set('adminState', "active");
      },
      toggleDetail: function toggleDetail(ID) {

        if (this.get('isShowing') === ID) this.set('isShowing', null);else this.set('isShowing', ID);
      },
      sortColumn: function sortColumn(columnName, direction) {
        var _this = this;

        this.get('modelAttributes').forEach(function (element) {
          if (element.key === columnName) {
            if (direction === 'asc') {
              Ember.set(element, 'dir', 'desc');
              _this.set('dir', 'desc');
            } else if (direction === 'desc') {
              Ember.set(element, 'dir', 'asc');
              _this.set('dir', 'asc');
            } else {
              Ember.set(element, 'dir', 'asc');
              _this.set('dir', 'asc');
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
define('self-start-front-end/components/client-nav', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: '',

    init: function init() {
      this._super.apply(this, arguments);
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      var Skype = new function () {
        var t = [],
            e = !1,
            n = "https://swc.cdn.skype.com/contactme/v/1.0.0/skype-uri.min.js";this.ui = function (a) {
          for (var c = document.getElementsByTagName("script"), i = c.length, r = !1; i--;) {
            if (c[i].src === n) {
              r = !0;break;
            }
          }if (!r) {
            var s = document.getElementsByTagName("head")[0],
                u = document.createElement("script");u.setAttribute("type", "text/javascript"), u.setAttribute("src", n), u.onload = function () {
              e = !0;for (var n = t.length; n--;) {
                SkypeButton.ui(t[n]);
              }
            }, s.appendChild(u);
          }e ? SkypeButton.ui(a) : t.push(a);
        };
      }();

      Skype.ui({
        "name": "dropdown",
        "element": "SkypeButton_Call",
        "participants": ["ramzi_abdullahi"],
        "imageSize": 24,
        "imageColor": "white"
      });

      Ember.$('body').visibility({
        offset: -10,
        observeChanges: false,
        once: false,
        continuous: false,
        onTopPassed: function onTopPassed() {
          requestAnimationFrame(function () {
            Ember.$('.following.bar').addClass('light fixed').find('.menu').removeClass('inverted');
            Ember.$('.following .additional.item').transition('scale in', 750);
            Ember.$('.selfStart').attr("src", '/assets/images/marcotte-self-start-bodysmartFINAL.png');
          });
        },
        onTopPassedReverse: function onTopPassedReverse() {
          requestAnimationFrame(function () {
            Ember.$('.following.bar').removeClass('light fixed').find('.menu').addClass('inverted').find('.additional.item').transition('hide');
            Ember.$('.selfStart').attr("src", '/assets/images/home/Header.png');
          });
        }
      });
    },


    actions: {}
  });
});
define('self-start-front-end/components/client-welcome', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('self-start-front-end/components/config-selection', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service(),

    genderSelected: false,
    countrySelected: false,
    provinceSelected: false,
    quoteSelected: false,
    model: null,

    limit: 10,
    offset: 0,
    pageSize: 10,
    sort: 'name',
    dir: '',
    query: null,
    flagDelete: false,
    modelAttributes: [{ 'key': 'name', 'name': 'Name', 'dir': 'asc', 'class': 'left aligned thirteen wide column' }],

    countriesModel: [],
    INDEX: null,
    queryPath: 'name',
    scrolledLines: 0,

    activeModel: Ember.observer('offset', 'limit', 'sort', 'dir', 'flagDelete', function () {
      var self = this;

      this.get('store').query('country', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('countriesModel', records.toArray());
      });
    }),

    filtercountries: Ember.observer('query', 'queryPath', function () {
      var _this = this;

      var queryText = this.get('query');
      if (queryText !== null && queryText.length > 0) {
        this.set('regex', "^" + queryText);
      } else {
        this.set('regex', '');
      }

      this.get('store').query('country', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        _this.set('countriesModel', records.toArray());
      });
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this.set('limit', 10);
      this.set('offset', 0);
      this.set('pageSize', 10);
      var self = this;
      this.get('store').query('country', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('countriesModel', records.toArray());
      });
    },


    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this.bindScrolling();
    },
    willRemoveElement: function willRemoveElement() {
      this._super.apply(this, arguments);
      this.unbindScrolling();
    },
    scrolled: function scrolled() {
      console.log("scrolled");
      if (this.get('scrolledLines') < Ember.$("#myWin").scrollTop()) {
        this.set('scrolledLines', Ember.$("#myWin").scrollTop());
        this.set('limit', this.get('limit') + 10);
      }
    },

    bindScrolling: function bindScrolling() {
      var self = this;
      // var onScroll = function() {
      //   console.log("bottom");
      //   Ember.run.debounce(self, self.scrolled, 500);
      // };

      //Ember.$("#myWin").bind('touchmove', onScroll);
      Ember.$("#myWin").bind('scroll', function () {
        console.log("bottom");
        Ember.run.debounce(self, self.scrolled, 500);
      });
    },

    unbindScrolling: function unbindScrolling() {
      //Ember.$("#myWin").unbind('scroll');
      //Ember.$("#myWin").unbind('touchmove');
    },

    actions: {
      genderSelect: function genderSelect() {
        this.set('genderSelected', true);
        this.set('countrySelected', false);
        this.set('provinceSelected', false);
        this.set('quoteSelected', false);
      },
      countrySelect: function countrySelect() {
        this.set('countrySelected', true);
        this.set('genderSelected', false);
        this.set('provinceSelected', false);
        this.set('quoteSelected', false);
      },
      provinceSelect: function provinceSelect() {
        this.set('provinceSelected', true);
        this.set('genderSelected', false);
        this.set('countrySelected', false);
        this.set('quoteSelected', false);
      },
      quoteSelect: function quoteSelect() {
        this.set('provinceSelected', false);
        this.set('genderSelected', false);
        this.set('countrySelected', false);
        this.set('quoteSelected', true);
      },
      submit: function submit() {
        var _this2 = this;

        this.get('store').findAll('administrator').then(function (rec) {
          rec.set('message', _this2.get('message'));
          rec.save().then(function () {
            return true;
          });
        });
      },
      sortColumn: function sortColumn(columnName, direction) {
        var _this3 = this;

        this.get('modelAttributes').forEach(function (element) {
          if (element.key === columnName) {
            if (direction === 'asc') {
              Ember.set(element, 'dir', 'desc');
              _this3.set('dir', 'desc');
            } else if (direction === 'desc') {
              Ember.set(element, 'dir', 'asc');
              _this3.set('dir', 'asc');
            } else {
              Ember.set(element, 'dir', 'asc');
              _this3.set('dir', 'asc');
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
define('self-start-front-end/components/delete-admin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('self-start-front-end/components/delete-country', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    flagDelete: null,

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
            var country = _this.get('DS').peekRecord('country', _this.get('ID'));

            country.destroyRecord().then(function () {
              if (_this.get('flagDelete') === true) _this.set('flagDelete', false);else _this.set('flagDelete', true);
              return true;
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
define('self-start-front-end/components/delete-image', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'delete-image' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        var _this = this;

        // console.log(this.get('modalName'));
        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
            _this.get('DS').find('image', _this.get('ID')).then(function (image) {
              image.destroyRecord().then(function () {
                return true;
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
    flagDelete: null,

    modalName: Ember.computed(function () {
      return 'Delete-physio' + this.get('ID');
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

            var physio = _this.get('DS').peekRecord('physiotherapest', _this.get('ID'));

            physio.set('appointment', []);
            physio.save().then(function () {
              physio.destroyRecord().then(function () {
                if (_this.get('flagDelete') === true) _this.set('flagDelete', false);else _this.set('flagDelete', true);
                return true;
              });
            });
          }
        }).modal('show');
      }
    }
  });
});
define('self-start-front-end/components/delete-province', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'Delete-Province' + this.get('ID');
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

            _this.get('DS').find('province', _this.get('ID')).then(function (province) {
              province.set('name', '');
              province.set('country', null);
              province.save().then(function () {
                province.destroyRecord();
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
    flagDelete: null,

    modalName: Ember.computed(function () {
      return 'Delete-plan' + this.get('ID');
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

            var plan = _this.get('DS').peekRecord('rehabilitationplan', _this.get('ID'));

            plan.destroyRecord().then(function () {
              if (_this.get('flagDelete') === true) _this.set('flagDelete', false);else _this.set('flagDelete', true);
              return true;
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
define('self-start-front-end/components/display-assessment', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    qNum: 0,

    assessmentModel: Ember.computed(function () {
      console.log(this.assessID);
      return this.get('DS').find('assessment-test', this.assessID);
    }),

    actions: {
      Submit: function Submit() {

        var x = this.get('DS').find('assessment-test', this.get('assessid'));
        console.log(x.get('questions'));
      }
    }
  });
});
define("self-start-front-end/components/display-forms", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    formView: true,
    questionView: false,
    formState: "active",
    questionState: "",

    actions: {
      form: function form() {
        this.set('formView', true);
        this.set('questionView', false);
        this.set('formState', "active");
        this.set('questionState', "");
      },
      question: function question() {
        this.set('formView', false);
        this.set('questionView', true);
        this.set('formState', "");
        this.set('questionState', "active");
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
        })
    });
});
define('self-start-front-end/components/edit-admin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
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
      submit: function submit() {
        var _this = this;

        this.get('DS').findRecord('patient', this.get('pateintsData').id).then(function (rec) {
          rec.set('familyName', _this.get('pateintsData.familyName'));
          rec.set('givenName', _this.get('pateintsData.givenName'));
          rec.set('email', _this.get('pateintsData.email'));
          rec.set('streetName', _this.get('pateintsData.streetName'));
          rec.set('streetNumber', _this.get('pateintsData.streetNumber'));
          rec.set('apartment', _this.get('pateintsData.apartment'));
          rec.set('country', _this.get('selectedCountry'));
          rec.set('province', _this.get('pateintsData.province'));
          rec.set('city', _this.get('pateintsData.city'));
          rec.set('healthCardNumber', _this.get('pateintsData.healthCardNumber'));
          rec.set('gender', _this.get('selectedGender'));
          rec.set('dateOfBirth', new Date(_this.get('selectedDate')));
          rec.set('phoneNumber', _this.get('pateintsData.phoneNumber'));
          rec.set('postalCode', _this.get('pateintsData.postalCode'));

          rec.save().then(function () {
            return true;
          });
        });
      },


      openModal: function openModal() {

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          centered: false,
          dimmerSettings: { opacity: 0.25 },
          onDeny: function onDeny() {
            return true;
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

    selectedGender: null,
    selectedHiredDate: null,
    selectedFiredDate: null,
    physiosData: null,

    tagName: '',

    init: function init() {
      this._super.apply(this, arguments);
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);

      var dateHired = this.get('physiosData').get('dateHired');
      var dateFired = this.get('physiosData').get('dateFired');

      if (dateHired !== undefined) {
        var dateHiredString = dateHired.toISOString().substring(0, 10);
        this.set('selectedHiredDate', dateHiredString);
      } else if (dateFired !== undefined) {
        var dateFiredString = dateFired.toISOString().substring(0, 10);
        this.set('selectedFiredDate', dateFiredString);
      }
      this.set('selectedGender', this.get('physiosData').get('gender'));
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


    genderModel: Ember.computed(function () {
      return this.get('DS').findAll('gender');
    }),

    modalName: Ember.computed(function () {
      return 'editPhysio' + this.get('physiosData').id;
    }),

    actions: {
      assignHiredDate: function assignHiredDate(date) {
        this.set('selectedHiredDate', date);
      },
      assignFiredDate: function assignFiredDate(date) {
        this.set('selectedFiredDate', date);
      },
      selectGender: function selectGender(gender) {
        this.set('selectedGender', gender);
      },
      submit: function submit() {
        var _this = this;

        this.get('DS').findRecord('physiotherapest', this.get('physiosData').id).then(function (rec) {
          rec.set('familyName', _this.get('physiosData.familyName'));
          rec.set('givenName', _this.get('physiosData.givenName'));
          rec.set('email', _this.get('physiosData.email'));
          rec.set('gender', _this.get('selectedGender'));
          rec.set('dateHired', new Date(_this.get('selectedHiredDate')));
          rec.set('dateFired', new Date(_this.get('selectedFiredDate')));
          rec.set('phoneNumber', _this.get('physiosData.phoneNumber'));

          rec.save().then(function () {
            Ember.$('.ui.' + _this.get('modalName') + '.modal').modal('hide');
            return true;
          });
        });
      },


      openModal: function openModal() {

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          centered: false,
          dimmerSettings: { opacity: 0.25 },
          onDeny: function onDeny() {
            return true;
          }

        }).modal('show');
      }
    }

  });
});
define('self-start-front-end/components/edit-province', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    provinceData: null,
    name: Ember.computed.oneWay('provinceData.name'),

    modalName: Ember.computed(function () {
      return 'editProvince' + this.get('ID');
    }),

    countries: Ember.computed(function () {
      return this.get('DS').findAll('country');
    }),

    actions: {
      setCountryId: function setCountryId(comp, id) {
        this.set('countryId', id);
      },
      openModal: function openModal() {
        var _this = this;

        this.set('provinceData', this.get('DS').peekRecord('province', this.get('ID')));

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',

          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {

            var country = _this.get('DS').peekRecord('country', _this.get('countryId'));

            _this.get('DS').findRecord('province', _this.get('ID')).then(function (rec) {
              rec.set('name', _this.get('name'));
              rec.set('country', country);
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
              rec.set('assessmentTests', _this.get('assessmentTests'));
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
define('self-start-front-end/components/get-answers', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    DS: Ember.inject.service('store'),
    SAanswer: "",
    rateValue: 0,
    mcop1: 0,
    mcop2: 0,
    mcop3: 0,
    mcop4: 0,
    mcop5: 0,
    mcop6: 0,

    actions: {
      ratingSave: function ratingSave(rv) {

        this.set('rateValue', rv);

        var temp = [];
        this.get("assessment").get('answers').forEach(function (element) {
          temp.push(element);
        });

        temp[this.get("qNumber")] = this.get('rateValue');
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }

        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      TFtrue: function TFtrue() {
        var temp = [];
        this.get("assessment").get('answers').forEach(function (element) {
          temp.push(element);
        });
        temp[this.get("qNumber")] = "True";
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }

        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      TFfalse: function TFfalse() {
        var temp = [];
        this.get("assessment").get('answers').forEach(function (element) {
          temp.push(element);
        });
        temp[this.get("qNumber")] = "False";
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }

        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      saSave: function saSave() {

        var temp = [];
        this.get("assessment").get('answers').forEach(function (element) {
          temp.push(element);
        });
        temp[this.get("qNumber")] = this.get("SAanswer");
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }

        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      mcop1Save: function mcop1Save() {
        var temp = [];
        this.get("assessment").get('answers').forEach(function (element) {
          temp.push(element);
        });
        temp[this.get("qNumber")] = "0";
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }

        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      mcop2Save: function mcop2Save() {
        var temp = [];
        this.get("assessment").get('answers').forEach(function (element) {
          temp.push(element);
        });
        temp[this.get("qNumber")] = "1";
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }

        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      mcop3Save: function mcop3Save() {
        var temp = [];
        this.get("assessment").get('answers').forEach(function (element) {
          temp.push(element);
        });
        temp[this.get("qNumber")] = "2";
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }

        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      mcop4Save: function mcop4Save() {
        var temp = [];
        this.get("assessment").get('answers').forEach(function (element) {
          temp.push(element);
        });

        temp[this.get("qNumber")] = "3";
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }

        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      mcop5Save: function mcop5Save() {
        var temp = [];
        this.get("assessment").get('4').forEach(function (element) {
          temp.push(element);
        });

        temp[this.get("qNumber")] = "True";
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }

        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      },
      mcop6Save: function mcop6Save() {
        var temp = [];
        this.get("assessment").get('answers').forEach(function (element) {
          temp.push(element);
        });

        temp[this.get("qNumber")] = "5";
        this.get("assessment").get('answers').clear();

        for (var x = 0; x < temp.length; x++) {

          this.get("assessment").get('answers').push(temp[x]);
        }
        console.log(this.get("assessment").get('answers'));

        this.get('DS').findRecord('assessment-test', this.assessid).then(function (rec) {
          rec.save().then(function () {});
        });
      }
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
define('self-start-front-end/components/list-forms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'list-form' + this.get('ID');
    }),

    formsModel: Ember.computed(function () {
      return this.get('DS').findAll('form');
    }),

    actions: {
      AddTest: function AddTest(thisForm, thisPlan) {

        var temp = [];
        thisForm.get("questions").forEach(function (element) {
          temp.push("!!!!");
        });

        var newTest = this.get('DS').createRecord('assessment-test', {
          form: thisForm,
          questions: thisForm.get("questions"),
          rehabPlan: thisPlan,
          answers: temp
        });
        newTest.save().then(function () {
          return true;
        });
      },


      openModal: function openModal() {
        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closeable: false,
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
define('self-start-front-end/components/manage-admin-accounts', ['exports'], function (exports) {
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
    query: null,
    flagDelete: false,
    flagAdd: false,
    clientView: true,
    practView: false,
    adminView: false,

    modelAttributes: [{ 'key': 'givenName', 'name': 'First Name', 'dir': 'asc', 'class': 'left aligned two wide column' }, { 'key': 'familyName', 'name': 'Last Name', 'dir': '', 'class': 'left aligned two wide column' }, { 'key': 'dateOfBirth', 'name': 'Date of Birth', 'dir': '', 'class': 'left aligned five wide column' },
    // {'key': 'address', 'name':'Address'},
    { 'key': 'email', 'name': 'Email', 'dir': '', 'class': 'left aligned four wide column' }],
    // {'key': 'phoneNumber', 'name':'Phone Number'}],

    patientsModel: [],
    INDEX: null,
    queryPath: 'givenName',
    scrolledLines: 0,

    activeModel: Ember.observer('offset', 'limit', 'sort', 'dir', 'flagDelete', 'flagAdd', function () {
      var self = this;

      this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('patientsModel', records.toArray());
      });
    }),

    filterpateints: Ember.observer('query', 'queryPath', function () {
      var queryText = this.get('query');
      if (queryText !== null && queryText.length > 0) {
        this.set('regex', "^" + queryText);
      } else {
        this.set('regex', '');
      }

      this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('patientsModel', records.toArray());
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

    clientState: "active",
    practState: "",
    adminState: "",

    actions: {
      client: function client() {
        this.set('clientView', true);
        this.set('practView', false);
        this.set('adminView', false);
        this.set('clientState', "active");
        this.set('practState', "");
        this.set('adminState', "");
      },
      pract: function pract() {
        this.set('clientView', false);
        this.set('practView', true);
        this.set('adminView', false);
        this.set('clientState', "");
        this.set('practState', "active");
        this.set('adminState', "");
      },
      admin: function admin() {
        this.set('clientView', false);
        this.set('practView', false);
        this.set('adminView', true);
        this.set('clientState', "");
        this.set('practState', "");
        this.set('adminState', "active");
      },
      toggleDetail: function toggleDetail(ID) {

        if (this.get('isShowing') === ID) this.set('isShowing', null);else this.set('isShowing', ID);
      },
      editpatient: function editpatient(ID) {
        if (this.get('isEditing') === ID) this.set('isEditing', null);else this.set('isEditing', ID);
      },
      sortColumn: function sortColumn(columnName, direction) {
        var _this = this;

        this.get('modelAttributes').forEach(function (element) {
          if (element.key === columnName) {
            if (direction === 'asc') {
              Ember.set(element, 'dir', 'desc');
              _this.set('dir', 'desc');
            } else if (direction === 'desc') {
              Ember.set(element, 'dir', 'asc');
              _this.set('dir', 'asc');
            } else {
              Ember.set(element, 'dir', 'asc');
              _this.set('dir', 'asc');
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
define('self-start-front-end/components/manage-questions', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
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
    loggingIn: true,

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
      var scrollLink = Ember.$('.scroll');

      // Smooth scrolling
      scrollLink.click(function (e) {
        e.preventDefault();
        Ember.$('body,html').animate({
          scrollTop: Ember.$(this.hash).offset().top
        }, 1000);
      });

      // Active link switching
      Ember.$(window).scroll(function () {
        var scrollbarLocation = Ember.$(this).scrollTop();

        scrollLink.each(function () {

          var sectionOffset = Ember.$(this.hash).offset().top - 20;

          if (sectionOffset <= scrollbarLocation) {
            Ember.$(this).parent().addClass('active');
            Ember.$(this).parent().siblings().removeClass('active');
          }
        });
      });
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      Ember.$('#window').visibility({
        offset: -10,
        observeChanges: false,
        once: false,
        continuous: false,
        onTopPassed: function onTopPassed() {
          requestAnimationFrame(function () {
            Ember.$('.following.bar').addClass('light fixed').find('.menu').removeClass('inverted');
            Ember.$('.following .additional.item').transition('scale in', 750);
            Ember.$('.selfStart').attr("src", 'assets/images/marcotte-self-start-bodysmartFINAL.png');
          });
        },
        onTopPassedReverse: function onTopPassedReverse() {
          requestAnimationFrame(function () {
            Ember.$('.following.bar').removeClass('light fixed').find('.menu').addClass('inverted').find('.additional.item').transition('hide');
            Ember.$('.selfStart').attr("src", 'assets/images/home/Header.png');
          });
        }
      });
    },


    actions: {
      forgotPassword: function forgotPassword() {
        this.set('loggingIn', false);
      },
      login: function login() {
        this.set('loggingIn', true);
      },


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

        Ember.$('.ui.login.modal.tiny').modal({
          // closable: false,
          transition: 'fade down',
          dimmerSettings: { opacity: 0.6 }

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
define('self-start-front-end/components/physio-nav', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: '',

    init: function init() {
      this._super.apply(this, arguments);
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      var Skype = new function () {
        var t = [],
            e = !1,
            n = "https://swc.cdn.skype.com/contactme/v/1.0.0/skype-uri.min.js";this.ui = function (a) {
          for (var c = document.getElementsByTagName("script"), i = c.length, r = !1; i--;) {
            if (c[i].src === n) {
              r = !0;break;
            }
          }if (!r) {
            var s = document.getElementsByTagName("head")[0],
                u = document.createElement("script");u.setAttribute("type", "text/javascript"), u.setAttribute("src", n), u.onload = function () {
              e = !0;for (var n = t.length; n--;) {
                SkypeButton.ui(t[n]);
              }
            }, s.appendChild(u);
          }e ? SkypeButton.ui(a) : t.push(a);
        };
      }();

      Skype.ui({
        "name": "chat",
        "element": "SkypeButton_Call",
        "participants": ["ramzi_abdullahi"],
        "imageSize": 24,
        "imageColor": "white"
      });

      Ember.$('body').visibility({
        offset: -10,
        observeChanges: false,
        once: false,
        continuous: false,
        onTopPassed: function onTopPassed() {
          requestAnimationFrame(function () {
            Ember.$('.following.bar').addClass('light fixed').find('.menu').removeClass('inverted');
            Ember.$('.following .additional.item').transition('scale in', 750);
            Ember.$('.selfStart').attr("src", '/assets/images/marcotte-self-start-bodysmartFINAL.png');
          });
        },
        onTopPassedReverse: function onTopPassedReverse() {
          requestAnimationFrame(function () {
            Ember.$('.following.bar').removeClass('light fixed').find('.menu').addClass('inverted').find('.additional.item').transition('hide');
            Ember.$('.selfStart').attr("src", '/assets/images/home/Header.png');
          });
        }
      });
    },


    actions: {
      logout: function logout() {}
    }
  });
});
define('self-start-front-end/components/physio-table', ['exports'], function (exports) {
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
    query: null,
    flagDelete: false,
    flagAdd: false,

    modelAttributes: [{ 'key': 'givenName', 'name': 'First Name', 'dir': 'asc', 'class': 'left aligned two wide column' }, { 'key': 'familyName', 'name': 'Last Name', 'dir': '', 'class': 'left aligned two wide column' }, { 'key': 'dateHired', 'name': 'Date Hired', 'dir': '', 'class': 'left aligned five wide column' }, { 'key': 'email', 'name': 'Email', 'dir': '', 'class': 'left aligned four wide column' }],

    practsModel: [],
    INDEX: null,
    queryPath: 'givenName',
    scrolledLines: 0,

    activeModel: Ember.observer('offset', 'limit', 'sort', 'dir', 'flagDelete', 'flagAdd', function () {
      var self = this;

      this.get('store').query('physiotherapest', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('practsModel', records.toArray());
      });
    }),

    filterpracts: Ember.observer('query', 'queryPath', function () {
      var queryText = this.get('query');
      if (queryText !== null && queryText.length > 0) {
        this.set('regex', "^" + queryText);
      } else {
        this.set('regex', '');
      }

      this.get('store').query('physiotherapest', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('practsModel', records.toArray());
      });
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this.set('limit', 10);
      this.set('offset', 0);
      this.set('pageSize', 10);
      var self = this;

      this.get('store').query('physiotherapest', this.getProperties(['offset', 'limit', 'sort', 'dir', 'queryPath', 'regex'])).then(function (records) {
        self.set('practsModel', records.toArray());
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
        //this.set('scrolledLines', Ember.$("#myWindow").scrollTop());
        //     this.set('limit', this.get('limit') + 10);
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
      sortColumn: function sortColumn(columnName, direction) {
        var _this = this;

        this.get('modelAttributes').forEach(function (element) {
          if (element.key === columnName) {
            if (direction === 'asc') {
              Ember.set(element, 'dir', 'desc');
              _this.set('dir', 'desc');
            } else if (direction === 'desc') {
              Ember.set(element, 'dir', 'asc');
              _this.set('dir', 'asc');
            } else {
              Ember.set(element, 'dir', 'asc');
              _this.set('dir', 'asc');
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
define('self-start-front-end/components/physio-welcome', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
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
define('self-start-front-end/components/rl-dropdown-container', ['exports', 'ember-rl-dropdown/components/rl-dropdown-container'], function (exports, _rlDropdownContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rlDropdownContainer.default;
});
define('self-start-front-end/components/rl-dropdown-toggle', ['exports', 'ember-rl-dropdown/components/rl-dropdown-toggle'], function (exports, _rlDropdownToggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rlDropdownToggle.default;
});
define('self-start-front-end/components/rl-dropdown', ['exports', 'ember-rl-dropdown/components/rl-dropdown'], function (exports, _rlDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rlDropdown.default;
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
        modalName: Ember.computed(function () {
            return 'Show-Questions' + this.get('ID');
        }),
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
            },

            openModal: function openModal() {
                Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
                    closeable: false,
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
    authentication: Ember.inject.service('auth'),

    init: function init() {
      this._super.apply(this, arguments);
      // console.log(this.get('authentication').hash("asdads"));
      // console.log(this.get('auth'));
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
      this.set('encryptedPassword', '');

      // this.set('selectedGender', this.get('selectedGender'));
      // this.set('selectedCountry', this.get('selectedCountry'));
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);

      if (Ember.$('.floating-labels').length > 0) floatLabels();

      function floatLabels() {
        var inputFields = Ember.$('.floating-labels .cd-label').next();
        inputFields.each(function () {
          var singleInput = Ember.$(this);
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
    },


    conutryModel: Ember.computed(function () {
      return this.get('DS').findAll('country');
    }),

    genderModel: Ember.computed(function () {
      return this.get('DS').findAll('gender');
    }),

    accountValue: "active",
    introValue: "disabled",
    appointmentValue: "disabled",
    paymentValue: "disabled",
    confirmValue: "disabled",

    account: true,
    intro: false,
    appointment: false,
    payment: false,
    confirm: false,

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
      submit: function submit() {
        var _this = this;

        var self = this;

        var passwords = this.get('DS').createRecord('password', {
          email: self.get('email'),
          encryptedPassword: self.get('authentication').hash(self.get('encryptedPassword')),
          passwordMustChanged: true,
          passwordReset: true
        });

        passwords.save().then(function (passwords) {
          var patient = _this.get('DS').createRecord('patient', {
            familyName: self.get('familyName'),
            givenName: self.get('givenName'),
            email: self.get('email'),
            streetName: self.get('streetName'),
            streetNumber: self.get('streetNumber'),
            apartment: self.get('apartment'),
            country: self.get('selectedCountry'),
            province: self.get('province'),
            city: self.get('city'),
            dateOfBirth: new Date(_this.get('selectedDate')),
            gender: self.get('selectedGender'),
            phoneNumber: self.get('phoneNumber'),
            postalCode: self.get('postalCode')
          });

          patient.save().then(function (res) {
            console.log('this is the response', res);
            console.log(res.get("success"));
            if (!res.get("success")) {
              console.log("FAILED");
              patient.destroyRecord().then(function (o) {
                console.log("destroyed", o);
              });
              passwords.destroyRecord().then(function (o) {});
            } else {
              console.log("SUCCESS", res);
              passwords.set('client', res);
            }
          });
        });
      }
    }
  });
});
define('self-start-front-end/components/user-login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _EmberComponent$exte;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  exports.default = Ember.Component.extend((_EmberComponent$exte = {
    DS: Ember.inject.service('store'),
    router: Ember.inject.service('-routing'),
    model: null,
    ajax: Ember.inject.service(),
    temp: false,
    authentication: Ember.inject.service('auth')

  }, _defineProperty(_EmberComponent$exte, 'authentication', function authentication() {
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
  }), _defineProperty(_EmberComponent$exte, 'actions', {
    goToInfo: function goToInfo() {},
    deny: function deny() {
      Ember.$('.ui.login.modal').modal('hide');
    },
    submit: function submit() {
      var auth = this.get("authentication");
      var self = this;
      auth.open(this.get('Email'), this.get('PWord')).then(function () {
        self.get('authentication').set('isLoginRequired', false);
      }, function (error) {});
    },


    logout: function logout() {
      localStorage.clear();
    },

    openModal: function openModal() {
      Ember.$('.ui.login.modal').modal({}).modal('show');
    }
  }), _EmberComponent$exte));
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
define('self-start-front-end/components/view-schedule', ['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    occurrences: Ember.A(),
    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),
    availableSpot: Ember.A(),
    removedSpot: Ember.A(),

    selectedphysio: null,
    selectedPhysioId: null,
    isEditing: false,

    // dragFinishText: false,
    // dragStartedText: false,
    // dragEndedText: false,
    // myObject:{id:1, name:'objectName'},

    getphysio: Ember.computed(function () {
      return this.get('DS').findAll('physiotherapest');
    }),

    actions: {
      //add delete, update
      calendarAddOccurrence: function calendarAddOccurrence(occurrence) {
        var container = Ember.Object.create({
          title: "SetAvailable Spot",
          startsAt: occurrence.get('startsAt'),
          isDraggable: true,
          isResizable: true,
          isRemovable: true,
          endsAt: occurrence.get('endsAt')
        });
        this.get('occurrences').pushObject(container);
        this.get('availableSpot').pushObject(container);
        console.log(JSON.stringify(this.get('availableSpot')));
      },

      calendarUpdateOccurrence: function calendarUpdateOccurrence(occurrence, properties, isPreview) {
        occurrence.setProperties(properties);

        if (!isPreview) {
          // console.log((properties));
        }
        console.log(JSON.stringify(this.get('availableSpot')));
      },

      calendarRemoveOccurrence: function calendarRemoveOccurrence(occurrence) {
        if (occurrence.tempid != null) {
          this.get('removedSpot').addObject(occurrence.tempid);
        }
        this.get('occurrences').removeObject(occurrence);
        this.get('availableSpot').removeObject(occurrence);
        console.log(JSON.stringify(this.get('availableSpot')));
        console.log(JSON.stringify(this.get('removedSpot')));
      },

      viewschedule: function viewschedule() {
        this.set('isEditing', true);
      },
      updateValue: function updateValue(physio) {
        this.set('occurrences', Ember.A());
        this.set('removedSpot', Ember.A());

        var home = this;
        //save physioid
        this.set('selectedPhysioId', physio);
        //get record of selected physiotherapist
        this.get('DS').findRecord('physiotherapest', physio).then(function (phy) {
          //might not need this
          home.set('selectedphysio', phy);
          //get each appointment by  physiotherapist appointment
          phy.get('appointments').forEach(function (obj) {
            var curid = obj.get('id');
            home.get('DS').findRecord('appointment', curid).then(function (app) {
              var scheduledDate = (0, _moment.default)(app.get('date'));
              var endDate = (0, _moment.default)(app.get('endDate'));
              //filter out any appointments that is previous to current date
              if (scheduledDate > (0, _moment.default)()) {
                if (app.get('reason') != null) {
                  home.get('occurrences').pushObject(Ember.Object.create({
                    title: "Booked",
                    isFilled: true,
                    isDraggable: false,
                    isResizable: false,
                    isRemovable: false,
                    startsAt: scheduledDate.toISOString(),
                    endsAt: endDate.toISOString()
                  }));
                } else {
                  var temp = Ember.Object.create({
                    title: "SetAvailable Spot",
                    isFilled: false,
                    isDraggable: true,
                    isResizable: true,
                    isRemovable: true,
                    startsAt: scheduledDate.toISOString(),
                    endsAt: endDate.toISOString(),
                    tempid: app.get('id')
                  });
                  home.get('occurrences').pushObject(temp);
                  home.get('availableSpot').pushObject(temp);
                }
              }
            });
          });
        });
      },


      // getclient(pid){
      //   console.log("getlient invoked");
      //   this.get('DS').findRecord('patient', pid).then(function (src){
      //
      //     let a = src.get('familyName');
      //     let b = src.get('givenName');
      //     console.log(a.toString());
      //     console.log(b.toString());
      //     return '';
      //   });
      // },

      // cancel() {
      //   return true;
      // },

      save: function save() {
        var self = this;
        var physio = self.get('selectedPhysioId');
        this.get('DS').find('physiotherapest', physio).then(function (a) {
          self.get('availableSpot').forEach(function (e) {
            if (e.tempid == null) {
              var appo = self.get('DS').createRecord('appointment', {
                date: e.startsAt,
                endDate: e.endsAt
              });
              appo.save().then(function () {
                a.get('appointments').pushObject(appo);
                a.save().then(function () {});
              });
            } else {
              self.get('DS').findRecord('appointment', e.tempid).then(function (rec) {
                rec.set('date', e.startsAt);
                rec.set('endDate', e.endsAt);
                rec.save().then(function () {});
              });
            }
          });

          self.get('removedSpot').forEach(function (e) {
            console.log(e);
            self.get('DS').findRecord('appointment', e).then(function (rec) {
              a.get('appointments').removeObject(rec);
              a.save().then(function () {
                rec.destroyRecord().then(function () {});
              });
            });
          });
        });
        self.set('isEditing', false);

        //end of save function
      }
    }
    //end of component
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
define('self-start-front-end/controllers/practitioner/assessment-display', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    queryParams: ['id'],
    id: null
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
define('self-start-front-end/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _cancelAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
  Object.defineProperty(exports, 'cancelAll', {
    enumerable: true,
    get: function () {
      return _cancelAll.cancelAll;
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
define('self-start-front-end/helpers/increment-q-num', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.helper.extend({
    compute: function compute(qNum) {
      return qNum + 1;
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
define('self-start-front-end/helpers/is-after', ['exports', 'ember-moment/helpers/is-after'], function (exports, _isAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isAfter.default;
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
define('self-start-front-end/helpers/is-before', ['exports', 'ember-moment/helpers/is-before'], function (exports, _isBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBefore.default;
    }
  });
});
define('self-start-front-end/helpers/is-between', ['exports', 'ember-moment/helpers/is-between'], function (exports, _isBetween) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBetween.default;
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
define('self-start-front-end/helpers/is-same-or-after', ['exports', 'ember-moment/helpers/is-same-or-after'], function (exports, _isSameOrAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrAfter.default;
    }
  });
});
define('self-start-front-end/helpers/is-same-or-before', ['exports', 'ember-moment/helpers/is-same-or-before'], function (exports, _isSameOrBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrBefore.default;
    }
  });
});
define('self-start-front-end/helpers/is-same', ['exports', 'ember-moment/helpers/is-same'], function (exports, _isSame) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSame.default;
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
define('self-start-front-end/helpers/moment-add', ['exports', 'ember-moment/helpers/moment-add'], function (exports, _momentAdd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentAdd.default;
    }
  });
});
define('self-start-front-end/helpers/moment-calendar', ['exports', 'ember-moment/helpers/moment-calendar'], function (exports, _momentCalendar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentCalendar.default;
    }
  });
});
define('self-start-front-end/helpers/moment-diff', ['exports', 'ember-moment/helpers/moment-diff'], function (exports, _momentDiff) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDiff.default;
    }
  });
});
define('self-start-front-end/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _momentDuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDuration.default;
    }
  });
});
define('self-start-front-end/helpers/moment-format', ['exports', 'ember-moment/helpers/moment-format'], function (exports, _momentFormat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFormat.default;
    }
  });
});
define('self-start-front-end/helpers/moment-from-now', ['exports', 'ember-moment/helpers/moment-from-now'], function (exports, _momentFromNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFromNow.default;
    }
  });
});
define('self-start-front-end/helpers/moment-from', ['exports', 'ember-moment/helpers/moment-from'], function (exports, _momentFrom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFrom.default;
    }
  });
});
define('self-start-front-end/helpers/moment-subtract', ['exports', 'ember-moment/helpers/moment-subtract'], function (exports, _momentSubtract) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentSubtract.default;
    }
  });
});
define('self-start-front-end/helpers/moment-to-date', ['exports', 'ember-moment/helpers/moment-to-date'], function (exports, _momentToDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToDate.default;
    }
  });
});
define('self-start-front-end/helpers/moment-to-now', ['exports', 'ember-moment/helpers/moment-to-now'], function (exports, _momentToNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToNow.default;
    }
  });
});
define('self-start-front-end/helpers/moment-to', ['exports', 'ember-moment/helpers/moment-to'], function (exports, _momentTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentTo.default;
    }
  });
});
define('self-start-front-end/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
define('self-start-front-end/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moment.default;
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
define('self-start-front-end/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _now) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _now.default;
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
define('self-start-front-end/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _perform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
  Object.defineProperty(exports, 'perform', {
    enumerable: true,
    get: function () {
      return _perform.perform;
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
define('self-start-front-end/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('self-start-front-end/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _task) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
  Object.defineProperty(exports, 'task', {
    enumerable: true,
    get: function () {
      return _task.task;
    }
  });
});
define('self-start-front-end/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
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
define('self-start-front-end/initializers/doc', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize(application) {
    application.inject('component', 'doc', 'service:doc');
  }

  exports.default = {
    name: 'doc',

    initialize: initialize
  };
});
define('self-start-front-end/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.initialize;
    }
  });
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
define('self-start-front-end/initializers/home', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize(application) {
    application.inject('component', 'home', 'service:home');
  }

  exports.default = {
    name: 'home',

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
define("self-start-front-end/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
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
define("self-start-front-end/models/administrator", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    ID: _emberData.default.attr(),
    familyName: _emberData.default.attr(),
    givenName: _emberData.default.attr(),
    email: _emberData.default.attr(),
    dateHired: _emberData.default.attr("Date"),
    dateFired: _emberData.default.attr("Date"),
    phoneNumber: _emberData.default.attr(),
    account: _emberData.default.attr(),
    message: _emberData.default.attr()
  });
});
define("self-start-front-end/models/answer", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    assessTest: _emberData.default.belongsTo("assessment-test"),
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
    endDate: _emberData.default.attr(),
    reason: _emberData.default.attr(),
    other: _emberData.default.attr(),
    patient: _emberData.default.belongsTo('patient')
  });
});
define('self-start-front-end/models/assessment-test', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    form: _emberData.default.belongsTo("form"),
    questions: _emberData.default.hasMany('question'),
    answers: _emberData.default.attr(),
    rehabPlan: _emberData.default.belongsTo('rehabilitationplan'),
    completed: _emberData.default.attr()
  });
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
    questions: _emberData.default.hasMany('question'),
    assessTest: _emberData.default.hasMany('assessment-test')
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
define('self-start-front-end/models/login', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    email: _emberData.default.attr(),
    password: _emberData.default.attr(),
    nonce: _emberData.default.attr(),
    response: _emberData.default.attr(),
    token: _emberData.default.attr(),
    requestType: _emberData.default.attr(),
    wrongUserName: _emberData.default.attr('boolean'),
    wrongPassword: _emberData.default.attr('boolean'),
    passwordMustChanged: _emberData.default.attr('boolean'),
    passwordReset: _emberData.default.attr('boolean'),
    loginFailed: _emberData.default.attr('boolean'),
    sessionIsActive: _emberData.default.attr('boolean')
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
define('self-start-front-end/models/password', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        email: _emberData.default.attr(),
        salt: _emberData.default.attr(),
        encryptedPassword: _emberData.default.attr(),
        passwordMustChanged: _emberData.default.attr(),
        passwordReset: _emberData.default.attr(),
        admin: _emberData.default.belongsTo('administrator'),
        practitioner: _emberData.default.belongsTo('physiotherapest'),
        client: _emberData.default.belongsTo('patient')
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
    account: _emberData.default.attr(),
    rehablink: _emberData.default.hasMany('rehab-client-link', { async: true }),
    success: _emberData.default.attr()
  });
});
define("self-start-front-end/models/physiotherapest", ["exports", "ember-data"], function (exports, _emberData) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        ID: _emberData.default.attr(),
        familyName: _emberData.default.attr(),
        givenName: _emberData.default.attr(),
        email: _emberData.default.attr(),
        dateHired: _emberData.default.attr("Date"),
        dateFired: _emberData.default.attr("Date"),
        phoneNumber: _emberData.default.attr(),
        gender: _emberData.default.attr(),
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
    assessmentTest: _emberData.default.hasMany('assessment-test'),
    forms: _emberData.default.hasMany('form')

  });
});
define('self-start-front-end/models/rehab-client-link', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    terminated: _emberData.default.attr('boolean'),
    RehabilitationPlan: _emberData.default.belongsTo('rehabilitationplan'),
    Patient: _emberData.default.belongsTo('patient'),
    assigned: _emberData.default.attr('boolean')
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
    exercises: _emberData.default.hasMany('exercise'),
    assessmentTests: _emberData.default.hasMany('assessment-test')
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
    //this.route('patients');
    this.route('rehabplans');
    this.route('admin', function () {
      this.route('admin-welcome', { path: '/' });
      this.route('manage-accounts');
      this.route('manage-selections');
      this.route('accounts');
      this.route('forms');
    });
    //this.route('questions');
    this.route('forms');
    //this.route('province');
    //this.route('city');
    //this.route('marital-status');
    this.route('new-rehabplans');
    //this.route('physiotherapists');
    //this.route('new-physiotherapist');
    //this.route('update-physiotherapist',{ path: 'physiotherapist/:physiotherapest_id'});
    this.route('formDisplay');
    //this.route('update-patient', { path: 'patient/:patient_id'});
    //this.route('new-patient');
    this.route('appointment');
    //this.route('patient-file');
    this.route('exercises');
    this.route('images');
    this.route('register');
    this.route('dashboard');
    this.route('message');
    this.route('practitioner', function () {
      this.route('physio-welcome', { path: '/' });
      this.route('clients');
      this.route('client-file', { path: 'clients/:patient_id' });
      this.route('rehabplans');
      this.route('new-rehabplans');
      this.route('assessment-display');
      this.route('appointment');
    });

    this.route('client', function () {
      this.route('welcome-client', { path: '/' });
      this.route('upload-photos');
      this.route('exercise-menu');
      this.route('resources');
      this.route('appointment');
    });
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
define('self-start-front-end/routes/admin/accounts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/admin/admin-welcome', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/admin/forms', ['exports'], function (exports) {
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
define('self-start-front-end/routes/admin/manage-accounts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/admin/manage-selections', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return Ember.RSVP.hash({
        gender: this.store.findAll('gender'),
        country: this.store.findAll('country'),
        province: this.store.findAll('province'),
        admin: this.store.findAll('administrator')
      });
    }
  });
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
define('self-start-front-end/routes/client', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/client/appointment', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/client/exercise-menu', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/client/resources', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/client/upload-photos', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/client/welcome-client', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('administrator');
    }
  });
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
      return Ember.RSVP.hash({
        exercise: this.store.findAll('exercise'),
        image: this.store.findAll('image')
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
define('self-start-front-end/routes/practitioner/appointment', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/practitioner/assessment-display', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return Ember.RSVP.hash({
        assessmentTest: this.store.findAll('assessment-test'),
        question: this.store.findAll('question')
      });
    }
  });
});
define('self-start-front-end/routes/practitioner/client-file', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    // model(){
    //   return this.store.findAll('rehab-client-link');
    // }
  });
});
define('self-start-front-end/routes/practitioner/clients', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/practitioner/new-rehabplans', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/practitioner/rehabplans', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return Ember.RSVP.hash({
        rehabPlan: this.store.findAll('rehabilitationplan'),
        assessmentTest: this.store.findAll('assessment-test')
      });
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
  exports.default = Ember.Route.extend({});
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
define('self-start-front-end/services/auth', ['exports', 'npm:crypto-browserify'], function (exports, _npmCryptoBrowserify) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    userName: null,
    encryptedPassword: null,
    isAuthenticated: false,
    store: Ember.inject.service(),
    isLoginRequested: false,
    userCList: null,
    ajax: Ember.inject.service(),

    getName: Ember.computed(function () {
      var identity = localStorage.getItem('sas-session-id');
      if (identity) {
        return this.decrypt(identity);
      } else {
        return null;
      }
    }),

    setName: function setName(name) {
      this.set('userName', name.toLowerCase());
      var identity = this.encrypt(this.get('userName'));
      localStorage.setItem('sas-session-id', identity);
    },
    setPassword: function setPassword(password) {
      this.set('encryptedPassword', this.hash(password));
    },
    hash: function hash(text) {
      var hash = _npmCryptoBrowserify.default.createHash('sha256');
      hash.update(text);
      return hash.digest('binary');
    },
    encrypt: function encrypt(plainText) {
      var cipher = _npmCryptoBrowserify.default.createCipher('aes256', 'SE3350b Winter 2016');
      var crypted = cipher.update(plainText, 'ascii', 'binary');
      crypted += cipher.final('binary');
      return crypted;
    },
    decrypt: function decrypt(cipherText) {
      var decipher = _npmCryptoBrowserify.default.createDecipher('aes256', 'SE3350b Winter 2016');
      var dec = decipher.update(cipherText, 'binary', 'ascii');
      dec += decipher.final('ascii');
      return dec;
    },
    open: function open(email, password) {
      var self = this;
      return new Ember.RSVP.Promise(function (resolve, reject) {
        // send username and password to the server asking for a challenge (nonce)
        self.setPassword(password);
        var myStore = self.get('store');

        self.get('ajax').request(window.location.protocol + "//" + window.location.hostname + ":8082" + "/Authenticate", {
          method: 'POST',
          data: {
            email: email,
            password: null, //first message password should be null
            nonce: null, // a challenge from the server
            response: null, // client response
            requestType: "open"
          },
          success: function success(serverResponse) {
            if (serverResponse.get('loginFailed')) {
              self.close(name);
              reject("loginFailed");
            } else {
              if (serverResponse.get('wrongUserName')) {
                //       self.close(name);
                reject("wrongUserName");
              } else {
                if (serverResponse.get('accountIsDisabled')) {
                  //        self.close(name);
                  reject("accountIsDisabled");
                } else {

                  var NONCE = self.encrypt(serverResponse.get('nonce'));
                  var clientResponse = myStore.createRecord('login', {
                    userName: name,
                    password: self.get('encryptedPassword'),
                    nonce: null, // a challenge from the server
                    response: NONCE, // client response
                    requestType: "openResponse"
                  });

                  clientResponse.save().then(function (message4) {
                    //get the token (message 4 in the protocol)
                    // and get the capability list or no access flag
                    // set the capability list as a token property in this service and return true
                    // or set the token property null and return false.
                    if (serverResponse.get('loginFailed')) {
                      ////  self.close(name);
                      reject("loginFailed");
                    } else {

                      if (message4.get('wrongPassword')) {
                        ////self.close(name);
                        reject("wrongPassword");
                      } else {
                        if (message4.get('passwordReset')) {
                          //self.close(name);
                          reject("passwordReset");
                        } else {
                          self.setName(name);
                          var userRole = self.decrypt(message4.get('token'));
                          self.set('isAuthenticated', true);
                          self.set('userCList', userRole);
                          resolve(userRole);
                        }
                      }
                    }
                  });
                }
              }
            }
          }
        });

        // send the first message of the authentication protocol
        loginRequest.save().then(function (serverResponse) {
          //get the server challenge (message 2 in the protocol)

          if (serverResponse.get('loginFailed')) {
            self.close(name);
            reject("loginFailed");
          } else {
            // encrypt server nonce and set client response
            if (serverResponse.get('wrongUserName')) {
              //       self.close(name);
              reject("wrongUserName");
            } else {
              if (serverResponse.get('accountIsDisabled')) {
                //        self.close(name);
                reject("accountIsDisabled");
              } else {

                var NONCE = self.encrypt(serverResponse.get('nonce'));
                var clientResponse = myStore.createRecord('login', {
                  userName: name,
                  password: self.get('encryptedPassword'),
                  nonce: null, // a challenge from the server
                  response: NONCE, // client response
                  requestType: "openResponse"
                });
                // send the third message of the authentication protocol
                clientResponse.save().then(function (message4) {
                  //get the token (message 4 in the protocol)
                  // and get the capability list or no access flag
                  // set the capability list as a token property in this service and return true
                  // or set the token property null and return false.
                  if (serverResponse.get('loginFailed')) {
                    ////  self.close(name);
                    reject("loginFailed");
                  } else {

                    if (message4.get('wrongPassword')) {
                      ////self.close(name);
                      reject("wrongPassword");
                    } else {
                      if (message4.get('passwordReset')) {
                        //self.close(name);
                        reject("passwordReset");
                      } else {
                        self.setName(name);
                        var userRole = self.decrypt(message4.get('token'));
                        self.set('isAuthenticated', true);
                        self.set('userCList', userRole);
                        resolve(userRole);
                      }
                    }
                  }
                });
              }
            }
          }
        });
      });
    },
    fetch: function fetch() {
      // get the current token from backend database
      var self = this;
      return new Ember.RSVP.Promise(function (resolve, reject) {
        var identity = localStorage.getItem('sas-session-id');
        if (identity) {
          var name = self.decrypt(identity);
          self.set('userName', name);
          var myStore = self.get('store');
          var fetchRequest = myStore.createRecord('login', {
            userName: name,
            password: null,
            nonce: null,
            response: null,
            requestType: "fetch"
          });
          fetchRequest.save().then(function (serverResponse) {
            if (serverResponse.get('loginFailed')) {
              self.close(name);
              reject("fetchFailed");
            } else {
              var NONCE = self.encrypt(serverResponse.get('nonce'));
              var clientResponse = myStore.createRecord('login', {
                userName: name,
                password: null,
                nonce: null, // a challenge from the server
                response: NONCE, // client response
                requestType: "fetchResponse"
              });
              // send the third message of the authentication protocol
              clientResponse.save().then(function (givenToken) {
                if (givenToken.get('loginFailed')) {
                  self.close(name);
                  reject("fetchFailed");
                } else {
                  var plainToken = self.decrypt(givenToken.get('token'));
                  self.set('isAuthenticated', true);
                  self.set('userCList', plainToken);
                  resolve(plainToken);
                }
              });
            }
          });
        } else {
          reject("userNotActive");
        }
      });
    },
    close: function close(user) {
      var myStore = this.get('store');
      myStore.query('login', { filter: { userName: user } }).then(function (Login) {
        if (Login) {
          Login.forEach(function (record) {
            record.destroyRecord();
          });
        }
      });
      window.localStorage.removeItem('sas-session-id');
      this.set('getName', null);
      this.set('userName', null);
      this.set('encryptedPassword', null);
      this.set('isAuthenticated', false);
      this.set('isLoginRequested', false);
    },
    openRoot: function openRoot(password) {
      var self = this;
      return new Ember.RSVP.Promise(function (resolve, reject) {
        if (password) {
          var myStore = self.get('store');
          var loginRequest = myStore.createRecord('root', {
            password: null,
            nonce: null,
            response: null
          });
          loginRequest.save().then(function (serverResponse) {
            // encrypt server nonce and set client response
            var NONCE = self.encrypt(serverResponse.get('nonce'));
            var clientResponse = myStore.createRecord('root', {
              password: self.encrypt(self.hash(password)),
              nonce: null,
              response: NONCE
            });
            clientResponse.save().then(function (message4) {
              if (message4.get('wrongPassword')) {
                self.closeRoot();
                reject("wrongPassword");
              } else {
                // self.setName("Root");
                self.set('isAuthenticated', true);
                resolve("Root");
              }
            });
          });
        } else {
          self.closeRoot();
          reject("wrongPassword");
        }
      });
    },
    closeRoot: function closeRoot() {
      var myStore = this.get('store');
      myStore.queryRecord('root', {}).then(function (Login) {
        if (Login) {
          Login.destroyRecord();
        }
      });
      //window.localStorage.removeItem('sas-session-id');
      this.set('getName', null);
      this.set('userName', null);
      this.set('isAuthenticated', false);
      this.set('isLoginRequested', false);
    }
  });
});
define('self-start-front-end/services/doc', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  exports.default = Ember.Service.extend({
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      // namespace
      window.semantic = {
        handler: {}
      };

      // selector cache
      var $document = Ember.$(document),
          $sortableTables = Ember.$('.sortable.table'),
          $sticky = Ember.$('.ui.sticky'),
          $tocSticky = Ember.$('.toc .ui.sticky'),
          $themeDropdown = Ember.$('.theme.dropdown'),
          $ui = Ember.$('.ui').not('.hover, .down'),
          $swap = Ember.$('.theme.menu .item'),
          $menu = Ember.$('#toc'),
          $hideMenu = Ember.$('#toc .hide.item'),
          $search = Ember.$('#search'),
          $sortTable = Ember.$('.sortable.table'),
          $demo = Ember.$('.demo'),
          $begSegment = Ember.$('.beg.segment'),
          $fullHeightContainer = Ember.$('.pusher > .full.height'),
          $container = Ember.$('.main.container'),
          $allHeaders = Ember.$('.main.container > h2, .main.container > .tab > h2, .main.container > .tab > .examples h2'),
          $sectionHeaders = $container.children('h2'),
          $followMenu = $container.find('.following.menu'),
          $sectionExample = $container.find('.example'),
          $exampleHeaders = $sectionExample.children('h4'),
          $footer = Ember.$('.page > .footer'),
          $menuMusic = Ember.$('.ui.main.menu .music.item'),
          $menuPopup = Ember.$('.ui.main.menu .popup.item'),
          $pageDropdown = Ember.$('.ui.main.menu .page.dropdown'),
          $pageTabs = Ember.$('.masthead.tab.segment .tabs.menu .item'),
          $languageDropdown = Ember.$('.language.dropdown'),
          $chineseModal = Ember.$('.chinese.modal'),
          $languageModal = Ember.$('.language.modal'),
          $downloadPopup = Ember.$('.download.button'),
          $downloads = Ember.$('.download.popup'),
          $downloadFramework = Ember.$('.framework.column .button'),
          $downloadInput = Ember.$('.download.popup input'),
          $downloadStandalone = Ember.$('.standalone.column .button'),
          $helpPopup = Ember.$('.header .help'),
          $example = Ember.$('.example'),
          $popupExample = $example.not('.no'),
          $shownExample = $example.filter('.shown'),
          $prerenderedExample = $example.has('.ui.checkbox, .ui.dropdown, .ui.search, .ui.progress, .ui.rating, .ui.dimmer, .ui.embed'),
          $visibilityExample = $example.filter('.visiblity').find('.overlay, .demo.segment, .items img'),
          $sidebarButton = Ember.$('.fixed.launch.button'),
          $code = Ember.$('div.code').not('.existing'),
          $existingCode = Ember.$('.existing.code'),
          expertiseLevel = Ember.$.cookie !== undefined ? Ember.$.cookie('expertiseLevel') || 0 : 0,
          languageDropdownUsed = false,
          metadata,
          requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 0);
      },


      // alias
      handler;

      // event handlers
      handler = {

        getMetadata: function getMetadata() {
          Ember.$.api({
            debug: false,
            on: 'now',
            url: '/metadata.json',
            cache: 'local',
            onSuccess: function onSuccess(response) {
              metadata = response;
            }
          });
        },

        showBeg: function showBeg() {
          if (window.localStorage !== undefined) {
            $begSegment.find('.delete.icon').on('click', handler.hideBeg);
            if (!window.localStorage.getItem('begDismissed')) {
              $begSegment.transition('slide down');
            }
          }
        },

        hideBeg: function hideBeg() {
          $begSegment.transition('slide down');
          if (window.localStorage !== undefined) {
            window.localStorage.setItem('begDismissed', true);
          }
        },

        createIcon: function createIcon() {
          $example.each(function () {
            var $insertPoint = Ember.$(this).is('.another') ? Ember.$(this).children().eq(0) : Ember.$(this).children().eq(1);
            Ember.$('<i/>').addClass('fitted icon code').insertBefore($insertPoint);
          }).find('i.code').on('click', handler.createCode);
        },

        shortcut: {
          modal: function modal() {
            var $modal = Ember.$('#shortcuts'),
                shortcutModalExists,
                shortcut,
                index;
            if (!shortcutModalExists) {
              var html = '<div class="ui small modal" id="shortcuts">';
              html += '<div class="header">Keyboard Shortcuts</div>';
              html += '<div class="content">';
              html += '<table class="ui striped basic table">';
              for (index = 0; index < shortcuts.length; index++) {
                shortcut = shortcuts[index];
                html += '<tr><td><b>' + shortcut.aka + '</b></td><td>' + shortcut.description + '</td></tr>';
              }
              html += '</table>';
              html += '<div class="actions"><div class="ui small teal button">OK</div></div>';
              html += '</div></div>';
              Ember.$('body').append(html);
              $modal = Ember.$('#shortcuts');
            }
            Ember.$('#shortcuts').modal('show');
          }
        },

        createWaypoints: function createWaypoints() {
          $sectionHeaders.visibility({
            observeChanges: false,
            once: false,
            offset: 50,
            onTopPassed: handler.activate.section,
            onTopPassedReverse: handler.activate.previous
          });

          $sectionExample.visibility({
            observeChanges: false,
            once: false,
            offset: 50,
            onTopPassed: handler.activate.example,
            onBottomPassedReverse: handler.activate.example
          });
          $footer.visibility({
            observeChanges: false,
            once: false,
            onBottomVisible: function onBottomVisible(calculations) {
              var $title = $followMenu.find('> .item > .title').last();
              $followMenu.accordion('open', $title);
            }
          });
        },

        activate: {
          previous: function previous() {
            var $menuItems = $followMenu.children('.item'),
                $section = $menuItems.filter('.active'),
                index = $menuItems.index($section);
            if ($section.prev().length > 0) {
              $section.removeClass('active').prev('.item').addClass('active');
              $followMenu.accordion('open', index - 1);
            }
          },
          accordion: function accordion() {
            var $section = Ember.$(this),
                index = $sectionHeaders.index($section),
                $followSection = $followMenu.children('.item'),
                $activeSection = $followSection.eq(index);
          },
          section: function section() {
            var $section = Ember.$(this),
                index = $sectionHeaders.index($section),
                $followSection = $followMenu.children('.item'),
                $activeSection = $followSection.eq(index),
                isActive = $activeSection.hasClass('active');
            if (!isActive) {
              $followSection.filter('.active').removeClass('active');
              $activeSection.addClass('active');
              $followMenu.accordion('open', index);
            }
          },
          example: function example() {
            var $section = Ember.$(this).children('h4').eq(0),
                index = $exampleHeaders.index($section),
                $followSection = $followMenu.find('.menu > .item'),
                $activeSection = $followSection.eq(index),
                inClosedTab = Ember.$(this).closest('.tab:not(.active)').length > 0,
                anotherExample = Ember.$(this).filter('.another.example').length > 0,
                isActive = $activeSection.hasClass('active');
            if (index !== -1 && !inClosedTab && !anotherExample && !isActive) {
              $followSection.filter('.active').removeClass('active');
              $activeSection.addClass('active');
            }
          }
        },

        translatePage: function translatePage(languageCode, text, $choice) {
          languageDropdownUsed = true;
          if (window.Transifex !== undefined) {
            window.Transifex.live.translateTo(languageCode, true);
          }
        },

        showLanguageModal: function showLanguageModal(languageCode) {
          var $choice = $languageDropdown.find('[data-value="' + languageCode + '"]').eq(0),
              percent = $choice.data('percent') || 0,
              text = $choice.text();
          // dont trigger on translate event every page load
          if (languageDropdownUsed) {
            if (languageCode == 'zh' && window.location.host.replace('www.', '') !== 'semantic-ui.cn') {
              $chineseModal.modal({
                closable: false
              }).modal('show');
            } else if (percent < 100) {
              languageDropdownUsed = false;
              $languageModal.modal().find('.header .name').html(text).end().find('.complete').html(percent).end();
              $languageModal.modal('show', function () {
                Ember.$('.language.modal .progress .bar').css('width', percent + '%');
              });
            }
          }
        },

        tryCreateMenu: function tryCreateMenu(event) {
          if (Ember.$(window).width() > 640 && !Ember.$('body').hasClass('basic')) {
            if ($container.length > 0 && $container.find('.following.menu').length === 0) {
              handler.createMenu();
              handler.createWaypoints();
              Ember.$(window).off('resize.menu');
            }
          }
        },

        createAnchors: function createAnchors() {
          $allHeaders.each(function () {
            var $section = Ember.$(this),
                text = handler.getText($section),
                safeName = handler.getSafeName(text),
                id = window.escape(safeName),
                $anchor = Ember.$('<a />').addClass('anchor').attr('id', id);
            $section.append($anchor);
          });
          $example.each(function () {
            var $title = Ember.$(this).children('h4').eq(0),
                text = handler.getText($title),
                safeName = handler.getSafeName(text),
                id = window.escape(safeName),
                $anchor = Ember.$('<a />').addClass('anchor').attr('id', id);
            if ($title.length > 0) {
              $title.after($anchor);
            }
          });
        },

        getPageTitle: function getPageTitle() {
          return Ember.$.trim(Ember.$('h1').eq(0).contents().filter(function () {
            return this.nodeType == 3;
          }).text().toLowerCase());
        },
        getSafeName: function getSafeName(text) {
          return text.replace(/\s+/g, '-').replace(/[^-,'A-Za-z0-9]+/g, '').toLowerCase();
        },

        getText: function getText($element) {
          $element = $element.find('a').not('.label, .anchor').length > 0 ? $element.find('a') : $element;
          var $text = $element.contents().filter(function () {
            return this.nodeType == 3;
          });
          return $text.length > 0 ? $text[0].nodeValue.trim() : $element.find('a').text().trim();
        },

        createMenu: function createMenu() {
          // grab each h3
          var html = '',
              pageTitle = handler.getPageTitle(),
              title = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1),
              $sticky,
              $rail;
          $sectionHeaders.each(function (index) {
            var $currentHeader = Ember.$(this),
                $nextElements = $currentHeader.nextUntil('h2'),
                $examples = $nextElements.find('.example:not(.another)').addBack().filter('.example:not(.another)'),
                activeClass = index === 0 ? 'active ' : '',
                text = handler.getText($currentHeader),
                safeName = handler.getSafeName(text),
                id = window.escape(safeName),
                $anchor = Ember.$('<a />').addClass('anchor').attr('id', id);
            html += '<div class="item">';
            if ($examples.length === 0) {
              html += '<a class="' + activeClass + 'title" href="#' + id + '"><b>' + Ember.$(this).text() + '</b></a>';
            } else {
              html += '<a class="' + activeClass + 'title"><i class="dropdown icon"></i> <b>' + Ember.$(this).text() + '</b></a>';
            }
            if ($examples.length > 0) {
              html += '<div class="' + activeClass + 'content menu">';
              $examples.each(function () {
                var $title = Ember.$(this).children('h4').eq(0),
                    text = handler.getText($title),
                    safeName = handler.getSafeName(text),
                    id = window.escape(safeName),
                    $anchor = Ember.$('<a />').addClass('anchor').attr('id', id);
                if ($title.length > 0) {
                  html += '<a class="item" href="#' + id + '">' + text + '</a>';
                }
              });
              html += '</div>';
            }
            html += '</div>';
          });
          $followMenu = Ember.$('<div />').addClass('ui vertical following fluid accordion text menu').html(html);
          /* Advert
          var $advertisement = $('<div />')
            .addClass('advertisement')
            .html('<script type="text/javascript" src="//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=semanticuicom" id="_carbonads_js"></script>')
          ;
          */
          $sticky = Ember.$('<div />').addClass('ui sticky').html($followMenu)
          //.prepend($advertisement)
          .prepend('<h4 class="ui header">' + title + '</h4>');
          $rail = Ember.$('<div />').addClass('ui dividing right rail').html($sticky).prependTo($container);
          requestAnimationFrame(function () {
            $sticky.sticky({
              silent: true,
              context: $container,
              container: Ember.$('html'),
              offset: 30
            });
            $followMenu.accordion({
              exclusive: false,
              animateChildren: false,
              onChange: function onChange() {
                Ember.$('.ui.sticky').sticky('refresh');
              }
            }).find('.menu a[href], .title[href]').on('click', handler.scrollTo);
          });
        },

        scrollTo: function scrollTo(event) {
          var id = Ember.$(this).attr('href').replace('#', ''),
              $element = Ember.$('#' + id),
              position = $element.offset().top + 10;
          $element.addClass('active');
          Ember.$('html, body').animate({
            scrollTop: position
          }, 500);
          location.hash = '#' + id;
          event.stopImmediatePropagation();
          event.preventDefault();
          return false;
        },

        less: {

          parseFile: function parseFile(content) {
            var variables = {},
                lines = content.match(/^\s*(@[\s|\S]+?;)/gm),
                name,
                value;
            if (lines) {
              Ember.$.each(lines, function (index, line) {
                // clear whitespace
                line = Ember.$.trim(line);
                // match variables only
                if (line[0] == '@') {
                  name = line.match(/^@(.+?):/);
                  value = line.match(/:\s*([\s|\S]+?;)/);
                  if (Ember.$.isArray(name) && name.length >= 2 && Ember.$.isArray(value) && value.length >= 2) {
                    name = name[1];
                    value = value[1];
                    variables[name] = value;
                  }
                }
              });
            }
            console.log(variables);
            return variables;
          },

          changeTheme: function changeTheme(theme) {
            var $themeDropdown = Ember.$(this),
                element = $themeDropdown.data('element'),
                urlData = {
              theme: _typeof(theme === 'string') ? theme.toLowerCase() : theme,
              type: $themeDropdown.data('type'),
              element: $themeDropdown.data('element')
            },
                variables = {
              theme: urlData.theme
            };
            variables[element] = urlData.theme;
            window.less.modifyVars(variables);

            $themeDropdown.api({
              on: 'now',
              debug: true,
              action: 'getVariables',
              dataType: 'text',
              urlData: urlData,
              onSuccess: function onSuccess(content) {
                window.less.modifyVars(handler.less.parseFile(content));
                $themeDropdown.api({
                  on: 'now',
                  action: 'getOverrides',
                  dataType: 'text',
                  urlData: urlData,
                  onSuccess: function onSuccess(content) {
                    if (Ember.$('style.override').length > 0) {
                      Ember.$('style.override').remove();
                    }
                    console.log(content);
                    Ember.$('<style>' + content + '</style>').addClass('override').appendTo('body');
                    $sticky.sticky('refresh');
                  }
                });
              }
            });
          }

        },

        create: {
          examples: function examples(json) {
            var types = json['Types'],
                text = json['Text'],
                states = json['States'],
                variations = json['Variations'],
                $element,
                html;
            Ember.$.each(types, function (name, type) {
              html += '<h2 class="ui dividing header">' + name + '</h2>';
              if (Ember.$.isPlainObject(type)) {
                Ember.$.each(type, function (name, subType) {
                  $element = Ember.$.zc(subType);
                  $element = handler.create.text($element, text);
                  html += '<h3 class="ui header">' + name + '</h3>';
                  html += handler.create.variations($element, variations);
                });
              } else {
                $element = Ember.$.zc(type);
                $element = handler.create.text($element);
                html += handler.create.variations($element, variations);
              }
            });
            // Each TYPE
            //   show type name
            //   html = koan (html)
            //   each text
            //     find label
            //     if(obj)
            //       replace random text
            //     else
            //       replace text
            //   end
            //   Each variation
            //     (if obj)
            //       each
            //         add class
            //     (else)
            //       add class
            //     label = property
            //     class = class
            //     show html
            //   end
            // end
          },
          element: function element(koan, type, text, variation) {},
          variations: function variations($element, _variations) {
            Ember.$.each(_variations, function (name, variation) {});
          },
          text: function text($element, _text) {
            Ember.$.each(_text, function (selector, text) {
              $element.find(selector).text(text);
            });
            return $element;
          }
        },

        openMusic: function openMusic() {
          var url = 'http://stratus.soundcloud.com/player?links=https://soundcloud.com/into-the-light/sets/sui-2&popup=true',
              newWindow = window.open(url, 'name', 'height=196,width=733');
          if (window.focus) {
            newWindow.focus();
          }
        },

        getIndent: function getIndent(text) {
          var lines = text.split("\n"),
              firstLine = lines[0] === '' ? lines[1] : lines[0],
              spacesPerIndent = 2,
              leadingSpaces = firstLine !== undefined ? firstLine.length - firstLine.replace(/^\s*/g, '').length : false,
              indent;
          if (!leadingSpaces) {
            return $pageTabs.length > 0 ? 6 : 4;
          }
          if (leadingSpaces !== 0) {
            indent = leadingSpaces;
          } else {
            // string has already been trimmed, get first indented line and subtract 2
            Ember.$.each(lines, function (index, line) {
              leadingSpaces = line.length - line.replace(/^\s*/g, '').length;
              if (leadingSpaces !== 0) {
                indent = leadingSpaces - spacesPerIndent;
                return false;
              }
            });
          }
          return indent || 4;
        },

        generateCode: function generateCode() {
          var $example = Ember.$(this).closest('.example'),
              $annotation = $example.find('.annotation'),
              $code = $annotation.find('.code'),
              $intro = $example.children().not('.ignored, h4:first-child').filter('.ui, i:not(.code)').eq(0).prevAll(),
              $ignored = Ember.$('i.code:last-child, .wireframe, .anchor, .code, .existing, .instructive, .language.label, .annotation, br, .ignore, .ignored'),
              $demo = $example.children().not($intro).not($ignored),
              code = '';
          if ($code.length === 0) {
            $demo.each(function () {
              var $this = Ember.$(this).clone(false),
                  $wireframe = $this.find('.wireframe').add($this.filter('.wireframe'));
              $wireframe.each(function () {
                var src = Ember.$(this).attr('src'),
                    image = src.search('image') !== -1,
                    paragraph = src.search('paragraph') !== -1;
                if (paragraph) {
                  Ember.$(this).replaceWith('<p></p>');
                } else if (image) {
                  Ember.$(this).replaceWith('<img>');
                }
              });

              // remove wireframe images
              $this.find('.wireframe').remove();

              if ($this.not('br').not('.wireframe')) {
                // allow inline styles only with this one class
                if ($this.is('.my-container')) {
                  code += $this.get(0).outerHTML + "\n";
                } else {
                  code += $this.removeAttr('style').get(0).outerHTML + "\n";
                }
              }
            });
          }
          $example.data('code', code);
          return code;
        },

        copyCode: function copyCode() {
          Ember.$(this).popup('change content', 'Copied to clipboard');
        },

        createCode: function createCode() {
          var $example = Ember.$(this).closest('.example'),
              $intro = $example.children().not('.ignored, h4:first-child').filter('.ui, i:not(.code)').eq(0).prevAll(),
              $annotation = $example.find('.annotation'),
              $code = $annotation.find('.code'),
              $html = $example.children('.html'),
              $ignoredContent = Ember.$('.ui.popup, i.code:last-child, .anchor, .code, .existing.segment, .instructive, .language.label, .annotation, .ignore, style, script, .ignored'),
              $demo = $example.children().not($intro).not($ignoredContent),
              code = $example.data('code') || Ember.$.proxy(handler.generateCode, this)(),
              $copyCode,
              $label;

          // process existing code first
          if ($code.hasClass('existing')) {
            $code.removeClass('existing');
            Ember.$.proxy(handler.initializeCode, $code)(true);
          }

          // create annotation wrapper
          if ($annotation.length === 0) {
            $annotation = Ember.$('<div/>').addClass('annotation').hide().insertAfter($demo.last());
          }

          if ($html.length === 0) {
            $html = Ember.$('<div class="html">').insertBefore($annotation);
            $label = Ember.$('<div class="ui top attached label">').html('Example <i data-content="Copy code" class="copy link icon"></i>');
            $copyCode = $label.find('i.copy');
            $copyCode.on('click', handler.copyCode).popup({
              variation: 'inverted',
              distanceAway: 6
            });
            $label.prependTo($html);
            new Clipboard($copyCode.get(0), {
              text: function text() {
                var code = $copyCode.closest('.example').data('code') || '';
                return handler.formatCode(code);
              }
            });
            if ($demo.length === 0) {
              $html.addClass('empty');
            } else {
              $demo.detach().prependTo($html);
            }
          }

          // create code inside annotation wrapper
          if ($example.find('.instructive').length === 0) {
            $code = Ember.$('<div/>').data('type', 'html').addClass('code').html(code).hide().appendTo($annotation);
            Ember.$.proxy(handler.initializeCode, $code)(true);
          }
          if ($annotation.hasClass('visible')) {
            $annotation.transition('hide');
            $html.removeClass('ui top attached segment');
          } else {
            $html.addClass('ui top attached segment');
            $intro.css('display', '');
            $annotation.transition('show');
          }
          setTimeout(function () {
            handler.refreshSticky();
          }, 400);
        },

        refreshSticky: function refreshSticky() {
          $sectionHeaders.visibility('refresh');
          $sectionExample.visibility('refresh');
          Ember.$('.ui.sticky').sticky('refresh');
          $footer.visibility('refresh');
          $visibilityExample.visibility('refresh');
        },

        createAnnotation: function createAnnotation() {
          if (!Ember.$(this).data('type')) {
            Ember.$(this).data('type', 'html');
          }
          Ember.$(this).wrap('<div class="annotation">').parent().hide();
        },

        makeCode: function makeCode() {
          if (window.hljs !== undefined) {
            $code.filter(':visible').each(handler.initializeCode);
            $existingCode.each(handler.createAnnotation);
          } else {
            console.log('Syntax highlighting not found');
          }
        },

        highlightClasses: function highlightClasses($code) {
          var $closestExample = $code.closest('.example'),
              $example = $closestExample.length === 0 ? $code.closest('.segment').prevAll('.example').not('.another').eq(0) : $closestExample.hasClass('another') ? $closestExample.prevAll('.example').not('.another').eq(0) : $closestExample,
              $header = $example.find('h4').eq(0),
              $attributes = $code.find('.attribute, .class'),
              $tags = $code.find('.title'),
              pageName = handler.getPageTitle(),
              name = handler.getText($header).toLowerCase(),
              classes = $example.data('class') || '',
              tags = $example.data('tag') || false,
              useContent = $example.data('use-content') || false;
          // Add title
          if (name) {
            if (name == pageName) {
              name = 'ui ' + name;
            }
            classes = classes === '' ? name : classes + ',' + name;
          }
          // Add common variations
          classes = classes.replace('text alignment', "left aligned, right aligned, justified, center aligned");
          classes = classes.replace('floated', "right floated,left floated,floated");
          classes = classes.replace('floating', "right floated,left floated,floated");
          classes = classes.replace('horizontally aligned', "left aligned, center aligned, right aligned, justified");
          classes = classes.replace('vertically aligned', "top aligned, middle aligned, bottom aligned");
          classes = classes.replace('vertically attached', "attached");
          classes = classes.replace('horizontally attached', "attached");
          classes = classes.replace('padded', "very padded, padded");
          classes = classes.replace('relaxed', "very relaxed, relaxed");
          classes = classes.replace('attached', "left attached,right attached,top attached,bottom attached,attached");
          classes = classes.replace('wide', "one wide,two wide,three wide,four wide,five wide,six wide,seven wide,eight wide,nine wide,ten wide,eleven wide,twelve wide,thirteen wide,fourteen wide,fifteen wide,sixteen wide");
          classes = classes.replace('count', "one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen");
          classes = classes.replace('column count', "one column,two column,three column,four column,five column,six column,seven column,eight column,nine column,ten column,eleven column,twelve column,thirteen column,fourteen column,fifteen column,sixteen column");
          classes = classes.replace('evenly divided', "one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen");
          classes = classes.replace('size', "mini,tiny,small,medium,large,big,huge,massive");
          classes = classes.replace('emphasis', "primary,secondary,tertiary");
          classes = classes.replace('colored', "red,orange,yellow,olive,green,teal,blue,violet,purple,pink,brown,grey,black");
          classes = classes !== '' ? classes.split(',') : [];
          // highlight tags if asked
          if (tags) {
            tags = tags !== '' ? tags.split(',') : [];
            $tags.each(function () {
              var $tag = Ember.$(this),
                  tagHTML = $tag.html(),
                  newHTML = false;
              Ember.$.each(tags, function (index, tag) {
                if (tagHTML == tag) {
                  newHTML = tagHTML.replace(tag, '<b>' + tag + '</b>');
                }
              });
              if (newHTML) {
                $tag.addClass('class').html(newHTML);
              }
            });
          }
          // highlight classes
          $attributes.each(function () {
            var $attribute = Ember.$(this),
                attributeHTML = $attribute.html(),
                $tag,
                $value,
                tagHTML,
                isUI,
                isPageElement,
                isOtherUI,
                isOtherIcon,
                classNames,
                classString,
                html,
                newHTML;
            // only parse classes
            if (attributeHTML.search('class') === -1) {
              return true;
            }
            $value = $attribute.next('.value, .string').eq(0);
            $tag = $attribute.prev('.title').eq(0);
            tagHTML = $tag.html();
            html = $value.html();
            classNames = html.replace(/\"/g, '').split(' ');

            isUI = html.search('ui') !== -1;
            isPageElement = html.search(pageName) > 0;
            isOtherUI = !isPageElement && isUI;
            isOtherIcon = !isPageElement && tagHTML === 'i' && html.search('icon') !== -1;
            // check if any class match
            Ember.$.each(classes, function (index, string) {
              var className = Ember.$.trim(string),
                  isClassMatch = html.search(className) !== -1;
              if (className === '') {
                return true;
              }
              // class match on current page element (or content if allowed)
              if (isClassMatch && (isPageElement || useContent)) {
                newHTML = html.replace(className, '<b title="Required Class">' + className + '</b>');
                return false;
              }
            });

            // generate links to other UI
            if (isOtherUI || isOtherIcon) {
              html = newHTML || html;
              classString = /^\"(.*)\"/g.exec(html);
              if (!classString || classString.length < 2) {
                return true;
              }
              classString = classString[1];
              Ember.$.each(classNames, function (index, string) {
                var className = string.replace('"', '');
                // yep..
                if (className == 'item') {
                  return;
                }
                if (metadata && metadata[className] && metadata[className].url) {
                  // we found a match
                  newHTML = html.replace(classString, '<a href="' + metadata[className].url + '">' + classString + '</a>');
                }
              });
            }

            if (newHTML) {
              $value.addClass('class').html(newHTML);
            }
          });
        },

        formatCode: function formatCode(code) {
          var indent = handler.getIndent(code) || 2,
              whiteSpace = new RegExp('\\n\\s{' + indent + '}', 'g');
          return Ember.$.trim(code).replace(whiteSpace, '\n');
        },

        initializeCode: function initializeCode(codeSample) {
          var $code = Ember.$(this).show(),
              $codeTag = Ember.$('<code />'),
              codeSample = codeSample || false,
              code = $code.html(),
              existingCode = $code.hasClass('existing'),
              evaluatedCode = $code.hasClass('evaluated'),
              contentType = $code.data('type') || 'html',
              title = $code.data('title') || false,
              less = $code.data('less') || false,
              demo = $code.data('demo') || false,

          // eval          = $code.data('eval')     || false,
          preview = $code.data('preview') || false,
              label = $code.data('label') || false,
              preserve = $code.data('preserve') || false,
              escape = $code.data('escape') || false,
              displayType = {
            html: 'HTML',
            javascript: 'Javascript',
            css: 'CSS',
            text: 'Command Line',
            sh: 'Command Line'
          },
              padding = 20,
              name = codeSample === true ? 'instructive bottom attached' : 'existing',
              formattedCode = code,
              styledCode,
              $example,
              $label,
              codeHeight;
          var entityMap = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            '&quot;': '"',
            '&#39;': "'",
            '&#x2F;': "/"
          };
          contentType = contentType.toLowerCase();

          function escapeHTML(string) {
            return Ember.$('<div>').html(string).text();
          }

          // escape html entities
          if (contentType != 'html' || escape) {
            code = escapeHTML(code);
          }

          // evaluate if specified
          // if(evaluatedCode) {
          //   window.eval(code);
          // }

          // should trim whitespace
          if (preserve) {
            formattedCode = code;
          } else {
            formattedCode = handler.formatCode(code);
          }

          // color code
          formattedCode = window.hljs.highlightAuto(formattedCode);

          // create <code> tag
          $codeTag.addClass($code.attr('class')).addClass(formattedCode.language).html(formattedCode.value);
          // replace <div> with <code>
          $code.replaceWith($codeTag);
          $code = $codeTag;
          $code.wrap('<div class="ui ' + name + ' segment"></div>').wrap('<pre></pre>');

          if (contentType == 'html') {
            // add class emphasis to used classes
            handler.highlightClasses($code);
          }

          // add label
          if (title) {
            Ember.$('<div>').addClass('ui attached top label').html('<span class="title">' + title + '</span>' + '<em>' + (displayType[contentType] || contentType) + '</em>').prependTo($code.closest('.segment'));
          }
          if (label) {
            Ember.$('<div>').addClass('ui pointing below ignored language label').html(displayType[contentType] || contentType).insertBefore($code.closest('.segment'));
          }
          // add apply less button
          if (less) {
            Ember.$('<a>').addClass('ui black pointing below ignored label').html('Apply Theme').on('click', function () {
              window.less.modifyVars(handler.less.parseFile(code));
            }).insertBefore($code.closest('.segment'));
          }
          // add run code button
          // if(demo) {
          //   $('<a>')
          //     .addClass('ui black pointing below ignored label')
          //     .html('Run Code')
          //     .on('click', function() {
          //       if(eval) {
          //         window.eval(eval);
          //       }
          //       else {
          //         window.eval(code);
          //       }
          //     })
          //     .insertBefore ( $code.closest('.segment') )
          //   ;
          // }
          // add preview if specified
          if (preview) {
            Ember.$(code).insertAfter($code.closest('.segment'));
          }

          $code.removeClass('hidden');
        },

        resetDownloads: function resetDownloads() {
          $downloads.find('.grid').hide().filter('.choice.grid').show();
        },

        selectAll: function selectAll() {
          this.setSelectionRange(0, this.value.length);
        },

        chooseStandalone: function chooseStandalone() {
          $downloads.find('.grid').hide().filter('.standalone.grid').show();
          $downloadPopup.popup('reposition');
        },

        chooseFramework: function chooseFramework() {
          $downloads.find('.grid').hide().filter('.framework.grid').show();
          $downloadPopup.popup('reposition');
        },

        swapStyle: function swapStyle() {
          var theme = Ember.$(this).data('theme');
          Ember.$(this).addClass('active').siblings().removeClass('active');
          Ember.$('head link.ui').each(function () {
            var href = Ember.$(this).attr('href'),
                subDirectory = href.split('/')[3],
                newLink = href.replace(subDirectory, theme);
            Ember.$(this).attr('href', newLink);
          });
        }
      };

      semantic.handler = handler;

      // add anchors to docs headers
      handler.createAnchors();

      // create sidebar sticky
      requestAnimationFrame(function () {

        $tocSticky.sticky({
          silent: true,
          container: Ember.$('html'),
          context: $fullHeightContainer
        });
      });

      // load page tabs
      if ($pageTabs.length > 0) {
        $pageTabs.tab({
          context: '.main.container',
          childrenOnly: true,
          history: true,
          onFirstLoad: function onFirstLoad() {
            handler.makeCode();

            $container = Ember.$('.fixed.column').length > 0 ? Ember.$(this).find('.examples') : Ember.$(this);
            Ember.$(this).find('> .rail .ui.sticky, .fixed .ui.sticky').sticky({
              context: $container,
              container: Ember.$('html'),
              silent: true,
              offset: 30
            });
            $sectionHeaders = $container.children('h2');
            $sectionExample = $container.find('.example');
            $exampleHeaders = $sectionExample.children('h4');
            // create code
            handler.tryCreateMenu();
            Ember.$(window).on('resize.menu', function () {
              handler.tryCreateMenu();
            });
          },
          onLoad: function onLoad() {
            $tocSticky.sticky('refresh');
            Ember.$(this).find('.ui.sticky').sticky('refresh');
          }
        });
      } else {
        handler.makeCode();
        handler.tryCreateMenu();
        Ember.$(window).on('resize.menu', function () {
          handler.tryCreateMenu();
        });
      }

      $shownExample.each(handler.createCode);
      $prerenderedExample.each(handler.generateCode);

      // main sidebar
      $menu.sidebar({
        dimPage: true,
        transition: 'overlay',
        mobileTransition: 'uncover'
      });

      // launch buttons
      $menu.sidebar('attach events', '.launch.button, .view-ui, .launch.item');

      handler.createIcon();

      if (expertiseLevel < 2 && Ember.$(window).width() > 640) {
        $popupExample.each(function () {
          Ember.$(this).popup({
            preserve: false,
            on: 'hover',
            variation: 'inverted',
            delay: {
              show: 500,
              hide: 100
            },
            position: 'top left',
            content: 'View Source',
            target: Ember.$(this).find('i.code')
          }).find('i.code').on('click', function () {
            Ember.$.cookie('expertiseLevel', 2, {
              expires: 365
            });
          });
        });
      }

      $menuMusic.on('click', handler.openMusic);

      $downloadPopup.popup({
        transition: 'horizontal flip',
        duration: 350,
        position: 'bottom center',
        on: 'click',
        onHidden: handler.resetDownloads
      });
      $downloadInput.on('mouseup', handler.selectAll);
      $downloadFramework.on('click', handler.chooseFramework);
      $downloadStandalone.on('click', handler.chooseStandalone);

      $themeDropdown.dropdown({
        allowTab: false,
        onChange: handler.less.changeTheme
      });

      if (Ember.$.fn.tablesort !== undefined && $sortTable.length > 0) {
        $sortTable.tablesort();
      }

      $helpPopup.popup({
        position: 'top left',
        variation: 'inverted'
      });

      $swap.on('click', handler.swapStyle);

      $menuPopup.add($languageDropdown).popup({
        position: 'bottom center',
        delay: {
          show: 100,
          hide: 50
        }
      });

      $pageDropdown.dropdown({
        on: 'hover',
        action: 'nothing',
        allowTab: false
      });

      $languageDropdown.dropdown({
        allowTab: false,
        on: 'click',
        fullTextSearch: 'exact',
        match: 'text',
        onShow: function onShow() {
          Ember.$(this).popup('hide');
        },
        onChange: handler.translatePage
      });

      //$.fn.api.settings.base = '//api.semantic-ui.com';
      Ember.$.extend(Ember.$.fn.api.settings.api, {
        categorySearch: '//api.semantic-ui.com/search/category/{query}',
        getOverrides: '/src/themes/{$theme}/{$type}s/{$element}.overrides',
        getVariables: '/src/themes/{$theme}/{$type}s/{$element}.variables',
        search: '//api.semantic-ui.com/search/{query}'
      });

      if (window.Transifex !== undefined) {
        window.Transifex.live.onTranslatePage(handler.showLanguageModal);
      }

      // if(typeof detectAdBlock === 'undefined') {
      //   handler.showBeg();
      // }
      // else {
      //   detectAdBlock.onDetected(handler.showBeg);
      // }

      // handler.getMetadata();
    }
  });
});
define('self-start-front-end/services/home', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  exports.default = Ember.Service.extend({
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      semantic.home = {};

      var $themeDropdown = Ember.$('.theme.dropdown'),
          $header = Ember.$('.masthead'),
          $ui = $header.find('h1 b'),
          $phrase = $header.find('h1 span'),
          $download = $header.find('.download'),
          $library = $header.find('.library'),
          $cursor = $header.find('.typed-cursor'),
          $version = $header.find('.version'),
          $themeButton = Ember.$('.theming .source.button'),
          $themeGrid = Ember.$('.theming .source.grid'),
          handler;

      handler = {
        getRandomInt: function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        introduction: function introduction() {
          var background = 'bg' + handler.getRandomInt(1, 14);
          // zoom out
          $header.addClass(background).removeClass('zoomed');
        },
        changeLogo: function changeLogo() {
          var $logo = Ember.$('.following .logo'),
              $nextSide = $logo.find('.' + Ember.$(this).data('site') + '.side'),
              directions = ['up', 'left', 'down', 'right'],
              direction = directions[Math.floor(Math.random() * directions.length)];
          if ($nextSide.length > 0) {
            clearTimeout(handler.timer);
            handler.timer = setTimeout(function () {
              $logo.shape('set next side', $nextSide).shape('flip ' + direction);
            }, 50);
          }
        },
        returnLogo: function returnLogo() {
          var $logo = Ember.$('.following .logo'),
              $nextSide = $logo.find('.ui.side');
          clearTimeout(handler.timer);
          handler.timer = setTimeout(function () {
            $logo.shape('set next side', $nextSide).shape('flip over');
          }, 500);
        },

        less: {

          parseFile: function parseFile(content) {
            var variables = {},
                lines = content.match(/^\s*(@[\s|\S]+?;)/gm),
                name,
                value;
            if (lines) {
              Ember.$.each(lines, function (index, line) {
                // clear whitespace
                line = Ember.$.trim(line);
                // match variables only
                if (line[0] == '@') {
                  name = line.match(/^@(.+?):/);
                  value = line.match(/:\s*([\s|\S]+?;)/);
                  if (Ember.$.isArray(name) && name.length >= 2 && Ember.$.isArray(value) && value.length >= 2) {
                    name = name[1];
                    value = value[1];
                    variables[name] = value;
                  }
                }
              });
            }
            console.log(variables);
            return variables;
          },

          changeTheme: function changeTheme(theme) {
            var $themeDropdown = Ember.$(this),
                $variableCode = Ember.$('.variable.code'),
                $overrideCode = Ember.$('.override.code'),
                $existingVariables = $variableCode.closest('.existing'),
                $existingOverrides = $overrideCode.closest('.existing'),
                variableURL = '/src/themes/{$theme}/{$type}s/{$element}.variables',
                overrideURL = '/src/themes/{$theme}/{$type}s/{$element}.overrides',
                urlData = {
              theme: _typeof(theme === 'string') ? theme.toLowerCase() : theme,
              type: $themeDropdown.data('type'),
              element: $themeDropdown.data('element')
            };
            if ($existingVariables.length > 0) {
              $variableCode = Ember.$('<div class="ui variable code" data-type="less" data-preserve="true" />');
              $variableCode.insertAfter($existingVariables);
              $existingVariables.remove();
              console.log($variableCode);
            }

            if ($existingOverrides.length > 0) {
              $overrideCode = Ember.$('<div class="ui override code" data-type="less" data-preserve="true" />');
              $overrideCode.insertAfter($existingOverrides);
              $existingOverrides.remove();
              console.log($overrideCode);
            }

            $themeDropdown.api({
              on: 'now',
              url: variableURL,
              dataType: 'text',
              urlData: urlData,
              onSuccess: function onSuccess(content) {
                window.less.modifyVars(handler.less.parseFile(content));
                $themeDropdown.api({
                  on: 'now',
                  url: overrideURL,
                  dataType: 'text',
                  urlData: urlData,
                  onSuccess: function onSuccess(content) {
                    if (Ember.$('style.override').length > 0) {
                      Ember.$('style.override').remove();
                    }
                    Ember.$('<style>' + content + '</style>').addClass('override').appendTo('body');
                    Ember.$('.sticky').sticky('refresh');

                    $overrideCode.html(content);
                    Ember.$.proxy(semantic.handler.initializeCode, $overrideCode[0])();
                  }
                });
                $variableCode.html(content);
                Ember.$.proxy(semantic.handler.initializeCode, $variableCode[0])();
              }
            });
          }
        },
        showThemeButton: function showThemeButton(value, text) {
          if (!$themeButton.transition('is visible')) {
            $themeButton.transition('scale in');
          }
          Ember.$.proxy(handler.less.changeTheme, this)(value);
        },
        createDemos: function createDemos() {
          Ember.$('.demo.menu .item, .demo.buttons .button').on('click', function () {
            if (!Ember.$(this).hasClass('dropdown')) {
              Ember.$(this).addClass('active').closest('.ui.menu, .ui.buttons').find('.item, .button').not(Ember.$(this)).removeClass('active');
            }
          });
          Ember.$('.example .message .close').on('click', function () {
            Ember.$(this).closest('.message').transition('scale out');
          });
        },
        toggleTheme: function toggleTheme() {
          Ember.$(this).toggleClass('active');
          $themeGrid.toggleClass('visible');
        }
      };

      // intro
      handler.introduction();

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

      Ember.$('.email.stripe form').form({
        fields: {
          email: {
            identifier: 'email',
            rules: [{
              type: 'empty',
              prompt: 'Please enter an e-mail'
            }, {
              type: 'email',
              prompt: 'Please enter a valid e-mail address'
            }]
          }
        }
      });

      $themeDropdown.dropdown('setting', 'transition', 'drop').dropdown('setting', 'duration', 350).dropdown('setting', 'action', 'activate').dropdown('setting', 'onChange', handler.showThemeButton);

      $themeButton.on('click', handler.toggleTheme);

      // demos
      Ember.$('.demo .checkbox').checkbox();
      Ember.$('.demo .accordion').accordion();
      Ember.$('.demo .dimmer').dimmer({
        on: 'hover'
      });
      Ember.$('.demo .ui.dropdown').dropdown();

      if (window.Transifex !== undefined) {
        window.Transifex.live.onTranslatePage(function (countryCode) {
          var fullName = Ember.$('.language.dropdown .item[data-value=' + countryCode + ']').eq(0).text();
          Ember.$('.language.dropdown > .text').html(fullName);
        });
      }

      Ember.$('.ui.sidebar').sidebar('setting', {
        transition: 'overlay'
      });

      handler.createDemos();
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
define('self-start-front-end/services/moment', ['exports', 'ember-moment/services/moment', 'self-start-front-end/config/environment'], function (exports, _moment, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get;
  exports.default = _moment.default.extend({
    defaultFormat: get(_environment.default, 'moment.outputFormat')
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
  exports.default = Ember.HTMLBars.template({ "id": "mg/9ojwE", "block": "{\"symbols\":[],\"statements\":[[4,\"admin-nav\",null,null,{\"statements\":[[0,\"\\n  \"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/admin.hbs" } });
});
define("self-start-front-end/templates/admin/accounts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "h/OLikkC", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"manage-admin-accounts\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/admin/accounts.hbs" } });
});
define("self-start-front-end/templates/admin/admin-welcome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nH1nBsft", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"admin-welcome\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/admin/admin-welcome.hbs" } });
});
define("self-start-front-end/templates/admin/forms", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wrrZSDOL", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"display-forms\",null,[[\"questionModel\",\"formModel\"],[[20,[\"model\",\"question\"]],[20,[\"model\",\"form\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/admin/forms.hbs" } });
});
define("self-start-front-end/templates/admin/manage-accounts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PprOZJr5", "block": "{\"symbols\":[],\"statements\":[[0,\"sdsdf\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/admin/manage-accounts.hbs" } });
});
define("self-start-front-end/templates/admin/manage-selections", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jKSh3R+l", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"config-selection\",null,[[\"model\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/admin/manage-selections.hbs" } });
});
define("self-start-front-end/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "i86ange8", "block": "{\"symbols\":[],\"statements\":[[2,\"<link integrity=\\\"\\\" rel=\\\"stylesheet\\\" href=\\\"/assets/css/reset.css\\\"> &lt;!&ndash; CSS reset &ndash;&gt;\"],[0,\"\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[9,\"href\",\"/assets/css/reset.css\"],[7],[8],[0,\" \"],[2,\" CSS reset \"],[0,\"\\n\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/application.hbs" } });
});
define("self-start-front-end/templates/appointment", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "f4rQuRz8", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"book-appointment\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/appointment.hbs" } });
});
define("self-start-front-end/templates/city", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gUSxBWer", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/city.hbs" } });
});
define("self-start-front-end/templates/client", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Q0mqFjxn", "block": "{\"symbols\":[],\"statements\":[[4,\"client-nav\",null,null,{\"statements\":[[0,\"  \"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/client.hbs" } });
});
define("self-start-front-end/templates/client/appointment", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ZLwOFy4N", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"client-appointment\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/client/appointment.hbs" } });
});
define("self-start-front-end/templates/client/exercise-menu", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "912bZK6N", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/client/exercise-menu.hbs" } });
});
define("self-start-front-end/templates/client/resources", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "edMXtqyh", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/client/resources.hbs" } });
});
define("self-start-front-end/templates/client/upload-photos", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6ohnnojc", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/client/upload-photos.hbs" } });
});
define("self-start-front-end/templates/client/welcome-client", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4szDrzki", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"client-welcome\",null,[[\"model\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/client/welcome-client.hbs" } });
});
define("self-start-front-end/templates/components/add-admin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u2mo7ycE", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-admin.hbs" } });
});
define("self-start-front-end/templates/components/add-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RqMmC4Dg", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  Add country\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newCountry\",\"small newCountry\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new country\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Country Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add country\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-country.hbs" } });
});
define("self-start-front-end/templates/components/add-exercises", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aBGTeTFQ", "block": "{\"symbols\":[\"Image\",\"file\",\"aS\",\"o\",\"Image\"],\"statements\":[[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"    \"],[6,\"table\"],[9,\"class\",\"ui single line table\"],[7],[0,\"\\n      \"],[6,\"thead\"],[7],[0,\"\\n      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"th\"],[7],[0,\"Image Name\"],[8],[0,\"\\n        \"],[6,\"th\"],[7],[0,\"Image\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"Images\"]]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[7],[0,\"\\n          \"],[6,\"td\"],[7],[1,[19,5,[\"name\"]],false],[8],[0,\"\\n          \"],[6,\"td\"],[7],[0,\"\\n            \"],[6,\"img\"],[9,\"class\",\"ui small image\"],[10,\"src\",[26,[[19,5,[\"imageData\"]]]]],[7],[8],[0,\"\\n            \"],[6,\"br\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui toggle checkbox\"],[7],[0,\"\\n              \"],[1,[25,\"input\",null,[[\"type\",\"checked\",\"change\"],[\"checkbox\",[20,[\"cbState\"]],[25,\"action\",[[19,0,[]],\"addTempImage\",[19,5,[]]],null]]]],false],[0,\"\\n              \"],[6,\"label\"],[7],[0,\"Add\"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui positive button\"],[7],[0,\"Save\"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui black deny button\"],[7],[0,\"Cancel\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n    \"],[6,\"h2\"],[9,\"id\",\"exercise\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Add New Exercise\"],[8],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Exercise Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Name\"]],\"Exercise Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Description\"],[8],[0,\"\\n        \"],[1,[25,\"textarea\",null,[[\"value\",\"cols\",\"rows\",\"placeholder\"],[[20,[\"Description\"]],\"80\",\"6\",\"Description\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Author Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"AuthName\"]],\"Author Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\\n        \"],[6,\"label\"],[7],[0,\"Objectives\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Objective\"]],\"Objective\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addObjective\"]],[7],[0,\"\\n            Add Objective\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[0,\"Current Objectives\"],[8],[0,\"\\n          \"],[6,\"ul\"],[9,\"align\",\"left\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"obj\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,4,[]],false],[0,\"\\n                  \"],[6,\"br\"],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Action Steps\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"ActionSteps\"]],\"Action Steps\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addActionStep\"]],[7],[0,\"\\n            Add Action Step\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[0,\"Current Action Steps\"],[8],[0,\"\\n          \"],[6,\"ol\"],[9,\"align\",\"left\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"actionStep\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,3,[]],false],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Location\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Location\"]],\"Location\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Frequency\"],[8],[0,\"\\n\"],[0,\"        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Frequency\"]],\"Frequency\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Duration\"],[8],[0,\"\\n\"],[0,\"        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Duration\"]],\"Duration\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Target Date\"],[8],[0,\"\\n\"],[0,\"        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"TargetDate\"]],\"Target Date\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Multimedia URL\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"MMURL\"]],\"Multi Media URL\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"queue\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"ui divided demo items\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"image\"],[7],[0,\"\\n\"],[4,\"if\",[[19,2,[\"isUploading\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"div\"],[9,\"class\",\"ui active inverted dimmer\"],[7],[0,\"\\n                    \"],[6,\"div\"],[9,\"class\",\"ui loader\"],[7],[8],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                  \"],[6,\"img\"],[10,\"src\",[26,[[19,2,[\"base64Image\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n\"],[4,\"if\",[[19,2,[\"isDisplayableImage\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"label\"],[7],[0,\"Image Name\"],[8],[0,\"\\n                    \"],[1,[25,\"input\",null,[[\"type\",\"value\"],[\"text\",[19,2,[\"name\"]]]]],false],[0,\"\\n                    \"],[6,\"button\"],[9,\"class\",\"ui red basic button\"],[3,\"action\",[[19,0,[]],\"deleteFile\",[19,2,[]]]],[7],[0,\"\\n                      Delete\\n                    \"],[8],[0,\"\\n                    \"],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                    \"],[6,\"p\"],[7],[0,\"Unsupported image\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[4,\"each\",[[20,[\"queue2\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"ui divided demo items\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"image\"],[7],[0,\"\\n                \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"imageData\"]]]]],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n                  \"],[6,\"label\"],[7],[0,\"Image Name\"],[8],[0,\"\\n                  \"],[1,[25,\"input\",null,[[\"type\",\"value\"],[\"text\",[19,1,[\"name\"]]]]],false],[0,\"\\n                  \"],[6,\"button\"],[9,\"class\",\"ui red basic button\"],[3,\"action\",[[19,0,[]],\"deleteFile\",[20,[\"file\"]]]],[7],[0,\"\\n                    Delete\\n                  \"],[8],[0,\"\\n                  \"],[6,\"br\"],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[6,\"div\"],[9,\"class\",\"ui fluid labeled input\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"ui fluid huge label\"],[10,\"style\",[18,\"labelStyle\"],null],[7],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"big cloud upload icon\"],[7],[8],[0,\"\\n            Click or Drop images into this area to upload images\\n          \"],[8],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"file\"],[9,\"value\",\"target.value\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectFile\"],null],null],[10,\"style\",[18,\"inputStyle\"],null],[10,\"accept\",[26,[[18,\"accept\"]]]],[10,\"multiple\",[18,\"multiple\"],null],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"Assign Images from Existing Images\"],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"inline\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui button\"],[9,\"type\",\"submit\"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui button\"],[9,\"type\",\"submit\"],[3,\"action\",[[19,0,[]],\"cancel\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"addExercise\"]],[7],[0,\"\\n    Add Exercise\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-exercises.hbs" } });
});
define("self-start-front-end/templates/components/add-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wVJyifr2", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"sixteen wide field\"],[7],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"fName\"]],\"Name of form\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"sixteen wide field\"],[7],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"fDescription\"]],\"Description of form\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui centered grid\"],[7],[0,\"\\n            \"],[6,\"button\"],[9,\"class\",\"ui fluid positive button\"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n            \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancel\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[6,\"br\"],[7],[8],[0,\"\\n \"],[6,\"button\"],[9,\"class\",\"fluid ui blue button\"],[9,\"style\",\"max-width: 20%; height: 50px;\"],[3,\"action\",[[19,0,[]],\"addForm\"]],[7],[0,\"\\n    Add Form\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-form.hbs" } });
});
define("self-start-front-end/templates/components/add-gender", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SLtfk0o+", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  Add gender\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newGender\",\"small newGender\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new Gender\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Gender Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add gender\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-gender.hbs" } });
});
define("self-start-front-end/templates/components/add-image", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "O8/tuwqC", "block": "{\"symbols\":[\"file\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n  \"],[6,\"h2\"],[9,\"id\",\"exercise\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"New Image\"],[8],[0,\"\\n\\n  \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"queue\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"ui divided demo items\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"image\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isUploading\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[9,\"class\",\"ui active inverted dimmer\"],[7],[0,\"\\n                  \"],[6,\"div\"],[9,\"class\",\"ui loader\"],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"base64Image\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"            \"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isDisplayableImage\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"label\"],[7],[0,\"Image Name\"],[8],[0,\"\\n                  \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[19,1,[\"name\"]],\"Exercise Name\"]]],false],[0,\"\\n                  \"],[6,\"button\"],[9,\"class\",\"ui red basic button\"],[3,\"action\",[[19,0,[]],\"deleteFile\",[19,1,[]]]],[7],[0,\"\\n                    Delete\\n                  \"],[8],[0,\"\\n                  \"],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                  \"],[6,\"p\"],[7],[0,\"Unsupported image\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[6,\"div\"],[9,\"class\",\"ui fluid labeled input\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"ui fluid huge label\"],[10,\"style\",[18,\"labelStyle\"],null],[7],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"big cloud upload icon\"],[7],[8],[0,\"\\n          Click or Drop files into this area to upload files\\n        \"],[8],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"file\"],[9,\"value\",\"target.value\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectFile\"],null],null],[10,\"style\",[18,\"inputStyle\"],null],[10,\"accept\",[26,[[18,\"accept\"]]]],[10,\"multiple\",[18,\"multiple\"],null],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"inline\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui button\"],[9,\"type\",\"submit\"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Add New Image(s)\"],[8],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui button\"],[9,\"type\",\"submit\"],[3,\"action\",[[19,0,[]],\"cancel\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-image.hbs" } });
});
define("self-start-front-end/templates/components/add-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mvXbA22+", "block": "{\"symbols\":[\"oneCountry\",\"oneGender\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  Add Client\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newPatient\",\"newPatient\"]],{\"statements\":[[0,\"  \"],[6,\"i\"],[9,\"class\",\"close icon\"],[7],[8],[0,\"\\n  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new Client\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"scrolling content\"],[7],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"id\",\"edit\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"submit\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n\\n      \"],[6,\"legend\"],[7],[0,\"Account Settings\"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"email\",\"email\",[20,[\"email\"]],\"Email\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"lock\",\"text\",[20,[\"encryptedPassword\"]],\"Temperary password\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n      \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],\"First name\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],\"Last Name\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[9,\"placeholder\",\"Date of birth\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n            \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectGender\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"                \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"gender\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n                  \"],[1,[19,2,[\"name\"]],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"card\",\"text\",[20,[\"healthCardNumber\"]],\"Health Card Number\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"phone\",\"text\",[20,[\"phoneNumber\"]],\"Phone number\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n\\n\\n\\n      \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"home\",\"text\",[20,[\"streetNumber\"]],\"Street Number\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"home\",\"text\",[20,[\"streetName\"]],\"Street Name\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"placeholder\",\"value\"],[\"bookmark\",\"text\",\"Unit Number\",[20,[\"apartment\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"flag\",\"text\",[20,[\"postalCode\"]],\"Postal/Zip code\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui three column grid\"],[9,\"id\",\"grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n            \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectCountry\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"                \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"country\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n                  \"],[1,[19,1,[\"name\"]],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"world\",\"text\",[20,[\"province\"]],\"Province/State\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"world\",\"text\",[20,[\"city\"]],\"City\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"fluid ui blue button\"],[9,\"style\",\"max-width: 100%; height: 50px;\"],[7],[0,\"\\n          Submit\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-patient.hbs" } });
});
define("self-start-front-end/templates/components/add-physiotherapist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4ju81uDM", "block": "{\"symbols\":[\"oneGender\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui fluid  button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  Add practitioner\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newPhysio\",\"newPhysio\"]],{\"statements\":[[0,\"  \"],[6,\"i\"],[9,\"class\",\"close icon\"],[7],[8],[0,\"\\n  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding New Practitioner\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"scrolling content\"],[7],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"submit\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n\\n      \"],[6,\"legend\"],[7],[0,\"Account Settings\"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"email\",\"email\",[20,[\"email\"]],\"Email\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"lock\",\"text\",[20,[\"encryptedPassword\"]],\"Temperary password\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n      \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],\"First name\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],\"Last Name\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[9,\"placeholder\",\"Date of hire\"],[10,\"value\",[18,\"selectedHiredDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignHiredDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[9,\"placeholder\",\"Date of release\"],[10,\"value\",[18,\"selectedFiredDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignFiredDate\"],[[\"value\"],[\"target.value\"]]],null],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectGender\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"gender\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n                \"],[1,[19,1,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"phone\",\"text\",[20,[\"phoneNumber\"]],\"Phone number\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"fluid ui blue button\"],[9,\"value\",\"submit\"],[9,\"style\",\"max-width: 100%; height: 50px;\"],[7],[0,\"\\n          Submit\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-physiotherapist.hbs" } });
});
define("self-start-front-end/templates/components/add-province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "k+U8wGmF", "block": "{\"symbols\":[\"country\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  Add province\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newProvince\",\"small newProvince\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new Province\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Province Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add province\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\\n        \"],[6,\"label\"],[7],[0,\"Country Name\"],[8],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"onChange\"],[\"search selection\",[25,\"action\",[[19,0,[]],\"setCountryId\"],null]]],{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[0,\"Select a country\"],[8],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"countries\"]]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"data-value\",[26,[[19,1,[\"id\"]]]]],[9,\"class\",\"item\"],[7],[0,\"\\n                \"],[1,[19,1,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-province.hbs" } });
});
define("self-start-front-end/templates/components/add-question", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GxdVJiQH", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui centered grid\"],[7],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[9,\"style\",\"margin-top: -16em;position: absolute;\"],[7],[0,\"\\n\\n\\n  \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"inline fields\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Question Type:\"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                    \"],[6,\"input\"],[9,\"name\",\"type\"],[9,\"type\",\"radio\"],[3,\"action\",[[19,0,[]],\"multipleChoice\"]],[7],[8],[0,\"\\n\\n                    \"],[6,\"label\"],[7],[0,\"Multiple Choice\"],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                    \"],[6,\"input\"],[9,\"name\",\"type\"],[9,\"type\",\"radio\"],[3,\"action\",[[19,0,[]],\"shortAns\"]],[7],[8],[0,\"\\n                    \"],[6,\"label\"],[7],[0,\"Short Answer\"],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                    \"],[6,\"input\"],[9,\"name\",\"type\"],[9,\"type\",\"radio\"],[3,\"action\",[[19,0,[]],\"rating\"]],[7],[8],[0,\"\\n                    \"],[6,\"label\"],[7],[0,\"Rating\"],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                    \"],[6,\"input\"],[9,\"name\",\"type\"],[9,\"type\",\"radio\"],[3,\"action\",[[19,0,[]],\"trueFalse\"]],[7],[8],[0,\"\\n                    \"],[6,\"label\"],[7],[0,\"True/False\"],[8],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n\\n\"],[4,\"if\",[[20,[\"rating\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"rquestion\"]],\"Question\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"rhelp\"]],\"Help\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"shortAns\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"saquestion\"]],\"Question\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"sahelp\"]],\"Help\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"trueFalse\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"tfquestion\"]],\"Question\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"tfhelp\"]],\"Help\"]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"multipleChoice\"]]],null,{\"statements\":[[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcquestion\"]],\"Question\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop1\"]],\"Option 1\"]]],false],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"option2\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop2\"]],\"Option 2\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"option3\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop3\"]],\"Option 3\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"option4\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop4\"]],\"Option 4\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"option5\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop5\"]],\"Option 5\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"option6\"]]],null,{\"statements\":[[0,\"            \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mcop6\"]],\"Option 6\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"addable\"]]],null,{\"statements\":[[0,\"        \"],[6,\"button\"],[9,\"class\",\"ui blue button\"],[3,\"action\",[[19,0,[]],\"addOption\"]],[7],[0,\"Add Option\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"removable\"]]],null,{\"statements\":[[0,\"        \"],[6,\"button\"],[9,\"class\",\"ui blue button\"],[3,\"action\",[[19,0,[]],\"removeOption\"]],[7],[0,\"Remove Option\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"mchelp\"]],\"Help\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui centered grid\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui fluid positive button\"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancel\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-question.hbs" } });
});
define("self-start-front-end/templates/components/add-rehabplan", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "DQ3VpAur", "block": "{\"symbols\":[\"oneExercise\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  Add Plan\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newPlan\",\"newPlan\"]],{\"statements\":[[0,\"  \"],[6,\"i\"],[9,\"class\",\"close icon\"],[7],[8],[0,\"\\n  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[9,\"href\",\"/assets/css/form-style.css\"],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new plan\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"scrolling content\"],[7],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"id\",\"edit\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"submit\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"star\",\"text\",[20,[\"Name\"]],\"Name\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"name\",\"value\",\"placeholder\",\"required\"],[\"message\",\"cd-textarea\",[20,[\"description\"]],\"Description\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"award\",\"text\",[20,[\"goal\"]],\"Goal\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectExercise\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"exerciseModel\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"exercise\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n                \"],[1,[19,1,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"fluid ui blue button\"],[9,\"style\",\"max-width: 100%; height: 50px;\"],[7],[0,\"\\n          Submit\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-rehabplan.hbs" } });
});
define("self-start-front-end/templates/components/admin-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MNzAbQ5p", "block": "{\"symbols\":[\"&default\"],\"statements\":[[2,\"<style>\"],[0,\"\\n\"],[2,\".ui.visible.left.sidebar ~ .fixed,\"],[0,\"\\n\"],[2,\".ui.visible.left.sidebar ~ .pusher {\"],[0,\"\\n\"],[2,\"-ebkit-transform: translate3d(260px, 0, 0); transform: translate3d(260px, 0, 0);\"],[0,\"\\n\"],[2,\"}\"],[0,\"\\n\"],[2,\"</style>\"],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"id\",\"example\"],[9,\"class\",\"index\"],[7],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"full height\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"following bar\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui large secondary network menu inverted\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui logo shape\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"sides\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"active ui side\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"admin\"],null,{\"statements\":[[0,\"                    \"],[6,\"img\"],[9,\"class\",\"ui image selfStart\"],[9,\"src\",\"/assets/images/home/Header.png\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"right menu inverted\"],[7],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"/admin/accounts\"],[9,\"class\",\"item\"],[7],[0,\"Accounts\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"../exercises\"],[9,\"class\",\"item\"],[7],[0,\"Exercise\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"../rehabplans\"],[9,\"class\",\"item\"],[7],[0,\"Menu Builder\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"/admin/forms\"],[9,\"class\",\"item\"],[7],[0,\"Forms\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"/admin/manage-selections\"],[9,\"class\",\"item\"],[7],[0,\"Configure\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"id\",\"login\"],[9,\"href\",\"../\"],[9,\"class\",\"item\"],[7],[0,\"Log out\"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[11,1],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/admin-nav.hbs" } });
});
define("self-start-front-end/templates/components/admin-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hZ3ZdYCH", "block": "{\"symbols\":[\"admin\",\"column\",\"column\",\"attribute\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"margin-top: -18em;z-index:  2;position: relative;margin-left: 200px !important;\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -30px;\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"left thirteen wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n      \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"\\n        Admins\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"right two wide column\"],[9,\"style\",\"padding-left: 50px;\"],[7],[0,\"\\n      \"],[1,[18,\"add-admin\"],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui left aligned seven wide column\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two fields\"],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"selected\",\"onChange\"],[\"selection\",[20,[\"queryPath\"]],[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"queryPath\"]]],null]],null]]],{\"statements\":[[0,\"            \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[1,[20,[\"modelAttributes\",\"firstObject\",\"name\"]],false],[8],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[9,\"class\",\"item\"],[10,\"data-value\",[26,[[19,4,[\"key\"]]]]],[7],[0,\"\\n                  \"],[1,[19,4,[\"name\"]],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"            \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"type\",\"placeholder\",\"value\"],[\"text\",\"Search...\",[20,[\"query\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"style\",\"display: inline\"],[7],[0,\"\\n    \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n      \"],[6,\"tbody\"],[7],[0,\"\\n      \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n        \"],[6,\"th\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\" \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"          \"],[6,\"th\"],[10,\"class\",[19,3,[\"class\"]],null],[3,\"action\",[[19,0,[]],\"sortColumn\",[19,3,[\"key\"]],[19,3,[\"dir\"]]]],[7],[1,[19,3,[\"name\"]],false],[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"              \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"              \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"\"],null]],null,{\"statements\":[[0,\"              \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[6,\"th\"],[9,\"class\",\"center aligned two wide  column\"],[7],[0,\"Actions\"],[8],[0,\"\\n        \"],[2,\"<th class=\\\"left aligned one wide  column\\\"></th>\"],[0,\"\\n\\n      \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"id\",\"myWindow\"],[9,\"style\",\"height:600px; overflow-y: scroll; overflow-x: hidden;\"],[7],[0,\"\\n    \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n      \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"adminsModel\"]]],null,{\"statements\":[[0,\"\\n        \"],[6,\"tr\"],[7],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n            \"],[6,\"img\"],[9,\"src\",\"/assets/images/nav/single-01.svg\"],[9,\"class\",\"ui mini rounded image\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"\\n\"],[0,\"\\n            \"],[6,\"td\"],[10,\"class\",[19,2,[\"class\"]],null],[7],[0,\"\\n              \"],[1,[25,\"get\",[[19,1,[]],[19,2,[\"key\"]]],null],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column \"],[7],[0,\"\\n            \"],[1,[25,\"edit-admin\",null,[[\"adminsData\"],[[19,1,[]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n            \"],[6,\"p\"],[7],[1,[25,\"delete-admin\",null,[[\"ID\",\"flagDelete\"],[[19,1,[\"id\"]],[20,[\"flagDelete\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/admin-table.hbs" } });
});
define("self-start-front-end/templates/components/admin-welcome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+4ZIKchj", "block": "{\"symbols\":[],\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg3\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"library\"],[7],[0,\"Welcome Stephanie\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui center aligned grid\"],[7],[0,\"\\n\\n          \"],[2,\"<a href=\\\"/appointment\\\"  class=\\\"ui large inverted download button\\\" >\"],[0,\"\\n          \"],[2,\"Book Appointment\"],[0,\"\\n          \"],[2,\"</a>\"],[0,\"\\n\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/admin-welcome.hbs" } });
});
define("self-start-front-end/templates/components/as-calendar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "H+FjSGB7", "block": "{\"symbols\":[\"day\",\"timetable\",\"occurrence\",\"@onRemoveOccurrence\",\"@onUpdateOccurrence\",\"&default\"],\"statements\":[[4,\"if\",[[20,[\"showHeader\"]]],null,{\"statements\":[[0,\"  \"],[1,[25,\"as-calendar/header\",null,[[\"title\",\"model\",\"onNavigateWeek\"],[[20,[\"title\"]],[20,[\"model\"]],[25,\"action\",[[19,0,[]],\"onNavigateWeek\"],null]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"as-calendar/timetable\",null,[[\"model\",\"timeZone\",\"timeZoneOptions\",\"showTimeZoneSearch\",\"timeSlotHeight\",\"defaultTimeZoneQuery\",\"onSelectTime\",\"onChangeTimeZone\"],[[20,[\"model\"]],[20,[\"timeZone\"]],[20,[\"timeZoneOptions\"]],[20,[\"showTimeZoneSearch\"]],[20,[\"timeSlotHeight\"]],[20,[\"defaultTimeZoneQuery\"]],[25,\"action\",[[19,0,[]],\"addOccurrence\"],null],[25,\"action\",[[19,0,[]],\"changeTimeZone\"],null]]],{\"statements\":[[0,\"  \"],[6,\"ul\"],[9,\"class\",\"occurrences\"],[7],[0,\"\\n\"],[4,\"each\",[[19,1,[\"occurrences\"]]],null,{\"statements\":[[0,\"      \"],[6,\"li\"],[7],[0,\"\\n\"],[4,\"if\",[[22,6]],null,{\"statements\":[[0,\"          \"],[11,6,[[19,3,[]],[19,2,[]],[19,0,[]]]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[1,[25,\"as-calendar/timetable/occurrence\",null,[[\"model\",\"timeSlotHeight\",\"timetable\",\"timeSlotDuration\",\"onUpdate\",\"onRemove\"],[[19,3,[]],[20,[\"timeSlotHeight\"]],[19,2,[]],[20,[\"timeSlotDuration\"]],[25,\"action\",[[19,0,[]],[19,5,[]]],null],[25,\"action\",[[19,0,[]],[19,4,[]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"\\n\"],[4,\"if\",[[19,1,[\"occurrencePreview\"]]],null,{\"statements\":[[0,\"      \"],[6,\"li\"],[7],[0,\"\\n        \"],[1,[25,\"as-calendar/occurrence\",null,[[\"class\",\"model\",\"timeSlotHeight\",\"timeSlotDuration\"],[\"as-calendar-occurrence--preview\",[19,1,[\"occurrencePreview\"]],[20,[\"timeSlotHeight\"]],[20,[\"timeSlotDuration\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar.hbs" } });
});
define("self-start-front-end/templates/components/as-calendar/header", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wyEUc5Xs", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"h1\"],[9,\"class\",\"as-calendar-header__title\"],[7],[1,[18,\"title\"],false],[8],[0,\"\\n\\n\"],[11,1,[[19,0,[]]]],[0,\"\\n\\n\"],[6,\"nav\"],[9,\"class\",\"as-calendar-header__nav\"],[7],[0,\"\\n  \"],[6,\"ul\"],[9,\"class\",\"as-calendar-header__nav-group\"],[7],[0,\"\\n    \"],[6,\"li\"],[9,\"class\",\"as-calendar-header__nav-group-item\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"as-calendar-header__nav-group-action as-calendar-header__nav-group-action--previous-week\"],[3,\"action\",[[19,0,[]],\"navigateWeek\",-1]],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"li\"],[9,\"class\",\"as-calendar-header__nav-group-item\"],[7],[0,\"\\n      \"],[6,\"button\"],[10,\"disabled\",[18,\"isInCurrentWeek\"],null],[9,\"class\",\"as-calendar-header__nav-group-action as-calendar-header__nav-group-action--current-week\"],[3,\"action\",[[19,0,[]],\"goToCurrentWeek\"]],[7],[0,\"This Week\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"li\"],[9,\"class\",\"as-calendar-header__nav-group-item\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"as-calendar-header__nav-group-action as-calendar-header__nav-group-action--next-week\"],[3,\"action\",[[19,0,[]],\"navigateWeek\",1]],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar/header.hbs" } });
});
define("self-start-front-end/templates/components/as-calendar/occurrence", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vkg6Js31", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[9,\"class\",\"as-calendar-occurrence__container\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"isBooked\"]]],null,{\"statements\":[[4,\"if\",[[22,1]],null,{\"statements\":[[0,\"      \"],[11,1],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"h1\"],[9,\"class\",\"as-calendar-occurrence__title\"],[10,\"style\",[18,\"titleStyle\"],null],[7],[1,[18,\"title\"],false],[8],[0,\"\\n      \"],[6,\"h1\"],[7],[0,\" \"],[1,[18,\"startingTime\"],false],[0,\" - \"],[1,[18,\"dayEndingTime\"],false],[8],[0,\"\\n      \"],[6,\"h1\"],[7],[0,\"testing true isBooked\"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,1]],null,{\"statements\":[[0,\"      \"],[11,1],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"h1\"],[9,\"class\",\"as-calendar-occurrence__title\"],[10,\"style\",[18,\"titleStyle\"],null],[7],[1,[18,\"title\"],false],[8],[0,\"\\n      \"],[6,\"h1\"],[7],[0,\" \"],[1,[18,\"startingTime\"],false],[0,\" - \"],[1,[18,\"dayEndingTime\"],false],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar/occurrence.hbs" } });
});
define("self-start-front-end/templates/components/as-calendar/time-zone-option", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yZ8f2QDq", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"description\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar/time-zone-option.hbs" } });
});
define("self-start-front-end/templates/components/as-calendar/time-zone-select", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "EreDUHiK", "block": "{\"symbols\":[\"option\",\"@onChangeTimeZone\"],\"statements\":[[4,\"rl-dropdown-container\",null,[[\"dropdownExpanded\"],[[20,[\"showResults\"]]]],{\"statements\":[[4,\"rl-dropdown-toggle\",null,null,{\"statements\":[[0,\"    \"],[6,\"span\"],[7],[1,[18,\"selectedOptionAbbreviation\"],false],[8],[0,\"\\n    \"],[6,\"i\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"rl-dropdown\",null,[[\"closeOnChildClick\"],[\".results\"]],{\"statements\":[[4,\"if\",[[20,[\"showResults\"]]],[[\"use\",\"containerless\"],[\"crossFade\",true]],{\"statements\":[[4,\"if\",[[20,[\"showSearch\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"search\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[6,\"i\"],[7],[8],[8],[0,\"\\n\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"key-up\",\"placeholder\"],[\"text\",[20,[\"inputQuery\"]],\"inputQueryChanged\",\"Search timezones\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"results\"],[7],[0,\"\\n        \"],[6,\"ul\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"arrangedOptions\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[7],[0,\"\\n              \"],[1,[25,\"as-calendar/time-zone-option\",null,[[\"option\",\"select\",\"selectedOption\",\"tagName\",\"onSelect\"],[[19,1,[]],[19,0,[]],[20,[\"selectedOption\"]],\"a\",[25,\"action\",[[19,0,[]],[19,2,[]]],null]]]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar/time-zone-select.hbs" } });
});
define("self-start-front-end/templates/components/as-calendar/timetable", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hRH7zobJ", "block": "{\"symbols\":[\"day\",\"timeSlot\",\"day\",\"&default\",\"@onChangeTimeZone\",\"@onSelectTime\"],\"statements\":[[6,\"div\"],[9,\"class\",\"as-calendar-timetable__row as-calendar-timetable__row--highlighted\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"as-calendar-timetable__first-column\"],[7],[0,\"\\n    \"],[1,[25,\"as-calendar/time-zone-select\",null,[[\"value\",\"options\",\"defaultQuery\",\"showSearch\",\"onChangeTimeZone\"],[[20,[\"timeZone\"]],[20,[\"timeZoneOptions\"]],[20,[\"defaultTimeZoneQuery\"]],[20,[\"showTimeZoneSearch\"]],[25,\"action\",[[19,0,[]],[19,5,[]]],null]]]],false],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"as-calendar-timetable__columns\"],[7],[0,\"\\n    \"],[6,\"ul\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"days\"]]],null,{\"statements\":[[0,\"        \"],[6,\"li\"],[10,\"class\",[26,[\"as-calendar-timetable__column-item \",[25,\"if\",[[19,3,[\"isToday\"]],\"as-calendar-timetable__column-item--highlighted\"],null]]]],[7],[0,\"\\n          \"],[1,[25,\"moment-format\",[[19,3,[\"value\"]],\"ddd D MMM\"],null],false],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"as-calendar-timetable__row\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"as-calendar-timetable__first-column\"],[7],[0,\"\\n    \"],[6,\"ul\"],[9,\"class\",\"as-calendar-timetable__slot-labels\"],[10,\"style\",[18,\"timeSlotLabelListStyle\"],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"labeledTimeSlots\"]]],null,{\"statements\":[[0,\"        \"],[6,\"li\"],[9,\"class\",\"as-calendar-timetable__slot-label\"],[10,\"style\",[18,\"timeSlotLabelStyle\"],null],[7],[0,\"\\n          \"],[1,[25,\"moment-format\",[[19,2,[\"value\"]],\"h A\"],null],false],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"as-calendar-timetable__columns\"],[7],[0,\"\\n\"],[4,\"as-calendar/timetable/content\",null,[[\"timeSlotHeight\",\"model\",\"timetable\",\"onSelectTime\"],[[20,[\"timeSlotHeight\"]],[20,[\"model\"]],[19,0,[]],[25,\"action\",[[19,0,[]],[19,6,[]]],null]]],{\"statements\":[[0,\"      \"],[11,4,[[19,1,[]],[19,0,[]]]],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar/timetable.hbs" } });
});
define("self-start-front-end/templates/components/as-calendar/timetable/content", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nbRbm0f1", "block": "{\"symbols\":[\"day\",\"index\",\"timeSlot\",\"&default\"],\"statements\":[[6,\"ul\"],[9,\"class\",\"as-calendar-timetable__slots\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"timeSlots\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[9,\"class\",\"as-calendar-timetable__slot-item\"],[10,\"style\",[18,\"timeSlotStyle\"],null],[7],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[8],[0,\"\\n\\n\"],[6,\"ul\"],[9,\"class\",\"as-calendar-timetable__days\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"days\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[9,\"data-test-day\",\"\"],[10,\"data-test-day-id\",[26,[[19,2,[]]]]],[10,\"class\",[26,[\"as-calendar-timetable__day \",[25,\"if\",[[19,1,[\"isToday\"]],\"as-calendar-timetable__day--today\"],null]]]],[7],[0,\"\\n      \"],[11,4,[[19,1,[]],[19,0,[]]]],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1,2]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar/timetable/content.hbs" } });
});
define("self-start-front-end/templates/components/as-calendar/timetable/occurrence", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9RzR5UGU", "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"if\",[[20,[\"isBooked\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"as-calendar-occurrence__container1\"],[7],[0,\"\\n\"],[4,\"if\",[[22,1]],null,{\"statements\":[[0,\"    \"],[11,1],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"h1\"],[9,\"class\",\"as-calendar-occurrence__title\"],[10,\"style\",[18,\"titleStyle\"],null],[7],[1,[18,\"title\"],false],[8],[0,\"\\n    \"],[6,\"h1\"],[7],[0,\" \"],[1,[18,\"startingTime\"],false],[0,\" - \"],[1,[18,\"dayEndingTime\"],false],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"unless\",[[20,[\"isInteracting\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"isRemovable\"]]],null,{\"statements\":[[0,\"      \"],[6,\"a\"],[9,\"class\",\"as-calendar-occurrence__remove\"],[3,\"action\",[[19,0,[]],\"remove\"],[[\"bubbles\"],[false]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"isResizable\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[9,\"class\",\"as-calendar-occurrence__resize-handle\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"as-calendar-occurrence__container\"],[7],[0,\"\\n\"],[4,\"if\",[[22,1]],null,{\"statements\":[[0,\"    \"],[11,1],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"h1\"],[9,\"class\",\"as-calendar-occurrence__title\"],[10,\"style\",[18,\"titleStyle\"],null],[7],[1,[18,\"title\"],false],[8],[0,\"\\n    \"],[6,\"h1\"],[7],[0,\" \"],[1,[18,\"startingTime\"],false],[0,\" - \"],[1,[18,\"dayEndingTime\"],false],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"unless\",[[20,[\"isInteracting\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"isRemovable\"]]],null,{\"statements\":[[0,\"      \"],[6,\"a\"],[9,\"class\",\"as-calendar-occurrence__remove\"],[3,\"action\",[[19,0,[]],\"remove\"],[[\"bubbles\"],[false]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"isResizable\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[9,\"class\",\"as-calendar-occurrence__resize-handle\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"  \"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar/timetable/occurrence.hbs" } });
});
define("self-start-front-end/templates/components/assign-rehabplan", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PWBdjOaP", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  Assign\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"i\"],[9,\"class\",\"close icon\"],[7],[8],[0,\"\\n  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[9,\"href\",\"/assets/css/form-style.css\"],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Assign \"],[1,[20,[\"plansData\",\"planName\"]],false],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you want to assign this rehabilitation plan?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:.6em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:.6em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/assign-rehabplan.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "cuZ+/hz4", "block": "{\"symbols\":[\"timeslot\",\"phsio\"],\"statements\":[[0,\"\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[9,\"href\",\"/assets/css/form-style.css\"],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[9,\"style\",\"padding-right: 10em; padding-left: 10em\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n\\n\\n    \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n      \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"value\",[18,\"selectphysio\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateValue\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n        \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"getphysio\"]]],null,{\"statements\":[[0,\"          \"],[6,\"option\"],[10,\"value\",[19,2,[\"id\"]],null],[7],[0,\"\\n            \"],[1,[19,2,[\"givenName\"]],false],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\\n\\n\"],[1,[25,\"as-calendar\",null,[[\"title\",\"occurrences\",\"defaultTimeZoneQuery\",\"showTimeZoneSearch\",\"dayStartingTime\",\"dayEndingTime\",\"timeSlotDuration\",\"onAddOccurrence\",\"onUpdateOccurrence\",\"onRemoveOccurrence\",\"onClickOccurrence\"],[\"Schedule\",[20,[\"occurrences\"]],\"Toronto|New York\",false,\"8:00\",\"20:00\",\"00:30\",[25,\"action\",[[19,0,[]],\"calendarAddOccurrence\"],null],[25,\"action\",[[19,0,[]],\"calendarUpdateOccurrence\"],null],[25,\"action\",[[19,0,[]],\"calendarRemoveOccurrence\"],null],[25,\"action\",[[19,0,[]],\"calendarUpdateOccurrence\"],null]]]],false],[0,\"\\n\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],\"bk\"]],{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"scrolling content\"],[7],[0,\"\\n\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\" practitioner \"],[8],[0,\"\\n      \"],[6,\"h2\"],[7],[1,[18,\"familyName\"],false],[0,\" \"],[1,[18,\"givenName\"],false],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Type\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"layer\"],[10,\"value\",[18,\"selectAppointmentType\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateTime\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"true\"],[7],[0,\"\\n          \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select type\"],[8],[0,\"\\n          \"],[6,\"option\"],[9,\"value\",\"i\"],[7],[0,\"\\n            Initial Assessment\\n          \"],[8],[0,\"\\n          \"],[6,\"option\"],[9,\"value\",\"t\"],[7],[0,\"\\n            Treatment\\n          \"],[8],[0,\"\\n\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Reason\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"star\",\"text\",[20,[\"Reason\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Other\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"user\",\"text\",[20,[\"Other\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Time Slot\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"date\"],[10,\"value\",[18,\"selectedTime\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"setselectedtime\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"true\"],[7],[0,\"\\n          \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select TimeSlot\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"timeSlots\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,1,[\"time\"]],null],[7],[0,\"\\n              \"],[1,[19,1,[\"value\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancel_appointment\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui fluid positive button\"],[3,\"action\",[[19,0,[]],\"book_appointment\"]],[7],[0,\"Submit\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/book-appointment.hbs" } });
});
define("self-start-front-end/templates/components/client-appointment", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LkBjmVfQ", "block": "{\"symbols\":[\"timeslot\",\"phsio\"],\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Book appointments\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[9,\"href\",\"/assets/css/form-style.css\"],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[9,\"style\",\"padding-right: 10em; padding-left: 10em\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n\\n    \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n      \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"value\",[18,\"selectphysio\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateValue\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n        \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"getphysio\"]]],null,{\"statements\":[[0,\"          \"],[6,\"option\"],[10,\"value\",[19,2,[\"id\"]],null],[7],[0,\"\\n            \"],[1,[19,2,[\"givenName\"]],false],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[1,[25,\"as-calendar\",null,[[\"title\",\"occurrences\",\"defaultTimeZoneQuery\",\"dayStartingTime\",\"dayEndingTime\",\"timeSlotDuration\",\"onAddOccurrence\",\"onUpdateOccurrence\",\"onRemoveOccurrence\"],[\"Schedule\",[20,[\"occurrences\"]],\"Toronto|New York\",\"8:00\",\"20:00\",\"00:30\",[25,\"action\",[[19,0,[]],\"calendarAddOccurrence\"],null],[25,\"action\",[[19,0,[]],\"calendarUpdateOccurrence\"],null],[25,\"action\",[[19,0,[]],\"calendarRemoveOccurrence\"],null]]]],false],[0,\"\\n\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],\"bk\"]],{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"scrolling content\"],[7],[0,\"\\n\\n      \"],[6,\"fieldset\"],[7],[0,\"\\n        \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\" Physiotherapist\"],[8],[0,\"\\n        \"],[6,\"p\"],[7],[1,[18,\"familyName\"],false],[0,\" \"],[1,[18,\"givenName\"],false],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[0,\"\\n\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Type\"],[8],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"selectedAppointment\"],[10,\"value\",[18,\"selectAppointmentType\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateTime\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n            \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select type\"],[8],[0,\"\\n            \"],[6,\"option\"],[9,\"value\",\"i\"],[7],[0,\"\\n              Initial Assessment\\n            \"],[8],[0,\"\\n            \"],[6,\"option\"],[9,\"value\",\"t\"],[7],[0,\"\\n              Treatment\\n            \"],[8],[0,\"\\n\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Reason\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"star\",\"text\",[20,[\"Reason\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Other\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"user\",\"text\",[20,[\"Other\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Time Slot\"],[8],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"value\",[18,\"selectedTime\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"setselectedtime\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n            \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select TimeSlot\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"timeSlots\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",[19,1,[\"time\"]],null],[7],[0,\"\\n                \"],[1,[19,1,[\"value\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[7],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancel_appointment\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui fluid positive button\"],[3,\"action\",[[19,0,[]],\"book_appointment\"]],[7],[0,\"Submit\"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/client-appointment.hbs" } });
});
define("self-start-front-end/templates/components/client-file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+9jHxb+I", "block": "{\"symbols\":[\"plan\",\"column\",\"column\",\"attribute\"],\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[1,[20,[\"model\",\"givenName\"]],false],[0,\" \"],[1,[20,[\"model\",\"familyName\"]],false],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"class\",\"background\"],[9,\"style\",\"padding-left: 2em;padding-right: 15em;padding-top: 10em;\"],[7],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui vertical pointing menu\"],[9,\"style\",\"width: 12rem;\"],[7],[0,\"\\n    \"],[6,\"a\"],[9,\"class\",\"active item\"],[7],[0,\"\\n      Menu Builder\\n    \"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"\\n      Assessment\\n    \"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"\\n      Notes\\n    \"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"\\n      Photos\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"margin-top: -18em;z-index:  2;position: relative;margin-left: 200px !important;\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -30px;\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"left thirteen wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"\\n            Menu Builder\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"right two wide column\"],[9,\"style\",\"padding-left: 30px;\"],[7],[0,\"\\n          \"],[1,[25,\"add-rehabplan\",null,[[\"flagAdd\"],[[20,[\"flagAdd\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui left aligned seven wide column\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"two fields\"],[7],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"selected\",\"onChange\"],[\"selection\",[20,[\"queryPath\"]],[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"queryPath\"]]],null]],null]]],{\"statements\":[[0,\"                \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[1,[20,[\"modelAttributes\",\"firstObject\",\"name\"]],false],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"div\"],[9,\"class\",\"item\"],[10,\"data-value\",[26,[[19,4,[\"key\"]]]]],[7],[0,\"\\n                      \"],[1,[19,4,[\"name\"]],false],[0,\"\\n                    \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"                \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n                \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"type\",\"placeholder\",\"value\"],[\"text\",\"Search...\",[20,[\"query\"]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"style\",\"display: inline\"],[7],[0,\"\\n        \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n          \"],[6,\"tbody\"],[7],[0,\"\\n          \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n            \"],[6,\"th\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\" \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"              \"],[6,\"th\"],[10,\"class\",[19,3,[\"class\"]],null],[3,\"action\",[[19,0,[]],\"sortColumn\",[19,3,[\"key\"]],[19,3,[\"dir\"]]]],[7],[1,[19,3,[\"name\"]],false],[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"            \"],[6,\"th\"],[9,\"class\",\"center aligned five wide  column\"],[7],[0,\"Actions\"],[8],[0,\"\\n            \"],[2,\"<th class=\\\"left aligned one wide  column\\\"></th>\"],[0,\"\\n\\n          \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"id\",\"myWindow\"],[9,\"style\",\"height:500px; overflow-y: scroll; overflow-x: hidden;\"],[7],[0,\"\\n        \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n          \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"plansModel\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"tr\"],[7],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"\\n\\n                \"],[6,\"td\"],[10,\"class\",[19,2,[\"class\"]],null],[7],[0,\"\\n                  \"],[1,[25,\"get\",[[19,1,[]],[19,2,[\"key\"]]],null],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"right aligned three wide column \"],[7],[0,\"\\n                  \"],[1,[25,\"assign-rehabplan\",null,[[\"plansData\",\"model\"],[[19,1,[]],[20,[\"model\"]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column \"],[7],[0,\"\\n                \"],[1,[25,\"edit-rehabplan\",null,[[\"plansData\"],[[19,1,[]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[1,[25,\"delete-rehabplan\",null,[[\"ID\",\"flagDelete\"],[[19,1,[\"id\"]],[20,[\"flagDelete\"]]]]],false],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/client-file.hbs" } });
});
define("self-start-front-end/templates/components/client-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "veZQj26J", "block": "{\"symbols\":[\"&default\"],\"statements\":[[2,\"<style>\"],[0,\"\\n\"],[2,\".ui.visible.left.sidebar ~ .fixed,\"],[0,\"\\n\"],[2,\".ui.visible.left.sidebar ~ .pusher {\"],[0,\"\\n\"],[2,\"-ebkit-transform: translate3d(260px, 0, 0); transform: translate3d(260px, 0, 0);\"],[0,\"\\n\"],[2,\"}\"],[0,\"\\n\"],[2,\"</style>\"],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"id\",\"example\"],[9,\"class\",\"index\"],[7],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"full height\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"following bar\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui large secondary network menu inverted\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui logo shape\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"sides\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"active ui side\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"client\"],null,{\"statements\":[[0,\"                    \"],[6,\"img\"],[9,\"class\",\"ui image selfStart\"],[9,\"src\",\"/assets/images/home/Header.png\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"right menu inverted\"],[7],[0,\"\\n            \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[6,\"div\"],[9,\"id\",\"SkypeButton_Call\"],[7],[8],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"../images\"],[9,\"class\",\"item\"],[7],[0,\"Upload Photos\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"/client/exercise-menu\"],[9,\"class\",\"item\"],[7],[0,\"Exercise Menu\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"/client/resources\"],[9,\"class\",\"item\"],[7],[0,\"Resources\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"/client/appointment\"],[9,\"class\",\"item\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"id\",\"login\"],[9,\"href\",\"../\"],[9,\"class\",\"item\"],[7],[0,\"Log out\"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[11,1],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/client-nav.hbs" } });
});
define("self-start-front-end/templates/components/client-welcome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "eyFyxSo4", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg3\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[7],[0,\"Client Page\"],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[7],[1,[18,\"message\"],false],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui center aligned grid\"],[7],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/client-welcome.hbs" } });
});
define("self-start-front-end/templates/components/config-selection", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yGIF2qgF", "block": "{\"symbols\":[\"province\",\"country\",\"column\",\"column\",\"attribute\",\"gender\"],\"statements\":[[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg5\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Configure Selections\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:200px\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[3,\"action\",[[19,0,[]],\"countrySelect\"]],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"Add Country\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:200px\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[3,\"action\",[[19,0,[]],\"provinceSelect\"]],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          Add Province\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:200px\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n        Add City\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:200px\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[3,\"action\",[[19,0,[]],\"genderSelect\"]],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"Add Gender\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:200px\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Client Quote\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[3,\"action\",[[19,0,[]],\"quoteSelect\"]],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"Add quote\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"genderSelected\"]]],null,{\"statements\":[[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"padding-bottom: 1em;\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -30px;\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"left thirteen wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"Genders\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"right two wide column\"],[9,\"style\",\"padding-left: 50px;\"],[7],[0,\"\\n          \"],[1,[18,\"add-gender\"],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n      \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n        \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned fourteen wide column\"],[7],[0,\"Name\"],[8],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"center aligned two wide column\"],[7],[0,\"Actions\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n      \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"gender\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"td\"],[9,\"class\",\"left aligned fourteen wide column\"],[7],[0,\"\\n              \"],[1,[19,6,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[1,[25,\"edit-gender\",null,[[\"ID\"],[[19,6,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[1,[25,\"delete-gender\",null,[[\"ID\"],[[19,6,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[6]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"countrySelected\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"padding-bottom: 1em;\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -30px;\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"left thirteen wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"Countries\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"right two wide column\"],[9,\"style\",\"padding-left: 50px;\"],[7],[0,\"\\n          \"],[1,[18,\"add-country\"],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui left aligned seven wide column\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"two fields\"],[7],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"selected\",\"onChange\"],[\"selection\",[20,[\"queryPath\"]],[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"queryPath\"]]],null]],null]]],{\"statements\":[[0,\"                \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[1,[20,[\"modelAttributes\",\"firstObject\",\"name\"]],false],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"div\"],[9,\"class\",\"item\"],[10,\"data-value\",[26,[[19,5,[\"key\"]]]]],[7],[0,\"\\n                      \"],[1,[19,5,[\"name\"]],false],[0,\"\\n                    \"],[8],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"                \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n                \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"type\",\"placeholder\",\"value\"],[\"text\",\"Search...\",[20,[\"query\"]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"style\",\"display: inline\"],[7],[0,\"\\n      \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n        \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"            \"],[6,\"th\"],[10,\"class\",[19,4,[\"class\"]],null],[3,\"action\",[[19,0,[]],\"sortColumn\",[19,4,[\"key\"]],[19,4,[\"dir\"]]]],[7],[1,[19,4,[\"name\"]],false],[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,4,[\"dir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"                \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,4,[\"dir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"                \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,4,[\"dir\"]],\"\"],null]],null,{\"statements\":[[0,\"                \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"          \"],[6,\"td\"],[9,\"class\",\"center aligned two wide column\"],[7],[0,\"Actions\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"id\",\"myWin\"],[9,\"style\",\"height:600px; overflow-y: scroll; overflow-x: hidden;\"],[7],[0,\"\\n      \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"countriesModel\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"\\n              \"],[6,\"td\"],[10,\"class\",[19,3,[\"class\"]],null],[7],[0,\"\\n                \"],[1,[25,\"get\",[[19,2,[]],[19,3,[\"key\"]]],null],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"            \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[1,[25,\"edit-country\",null,[[\"ID\"],[[19,2,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[1,[25,\"delete-country\",null,[[\"ID\",\"flagDelete\"],[[19,2,[\"id\"]],[20,[\"flagDelete\"]]]]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"provinceSelected\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"padding-bottom: 1em;\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -30px;\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"left thirteen wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"Provinces\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"right two wide column\"],[9,\"style\",\"padding-left: 50px;\"],[7],[0,\"\\n          \"],[1,[18,\"add-province\"],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n      \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n        \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned fourteen wide column\"],[7],[0,\"Name\"],[8],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"center aligned two wide column\"],[7],[0,\"Actions\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n      \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"province\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[7],[0,\"\\n            \"],[6,\"td\"],[9,\"class\",\"left aligned fourteen wide column\"],[7],[0,\"\\n              \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[1,[25,\"edit-province\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[1,[25,\"delete-province\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"quoteSelected\"]]],null,{\"statements\":[[0,\"    \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[9,\"href\",\"/assets/css/form-style.css\"],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n    \"],[6,\"h1\"],[7],[1,[20,[\"model\",\"admin\",\"message\"]],false],[8],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[9,\"style\",\"padding-right: 10em; padding-left: 10em\"],[3,\"action\",[[19,0,[]],\"submit\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"message\",\"text\",[20,[\"message\"]],\"Quote\",true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"fluid ui blue button\"],[9,\"value\",\"submit\"],[9,\"style\",\"max-width: 100%; height: 50px;\"],[7],[0,\"\\n        Submit\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/config-selection.hbs" } });
});
define("self-start-front-end/templates/components/confirm-booking", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Q/QR1tNW", "block": "{\"symbols\":[],\"statements\":[[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Reason\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"star\",\"text\",[20,[\"Reason\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Other\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"user\",\"text\",[20,[\"Other\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date\"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancelbookingappointment\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/confirm-booking.hbs" } });
});
define("self-start-front-end/templates/components/delete-admin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "O36faFGf", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-admin.hbs" } });
});
define("self-start-front-end/templates/components/delete-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u4VxxzqA", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/trash-simple.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-country.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "gbgMp9r1", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/trash-simple.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-gender.hbs" } });
});
define("self-start-front-end/templates/components/delete-image", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aj0i9Qj5", "block": "{\"symbols\":[],\"statements\":[[6,\"button\"],[9,\"class\",\"ui icon red basic button\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n\"],[0,\"  Delete\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[7],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\" warning sign icon\"],[7],[8],[0,\"\\n    Please Confirm\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you want to delete this Image?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui red cancel inverted button\"],[7],[0,\"\\n\"],[0,\"      No\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui green ok inverted button\"],[7],[0,\"\\n\"],[0,\"      Yes\\n    \"],[8],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-image.hbs" } });
});
define("self-start-front-end/templates/components/delete-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JovcNOqS", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/trash-simple.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:.6em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:.6em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-patient.hbs" } });
});
define("self-start-front-end/templates/components/delete-physiotherapist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7Q0mXn6B", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/trash-simple.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:.6em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:.6em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-physiotherapist.hbs" } });
});
define("self-start-front-end/templates/components/delete-province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Bv2JDYKc", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/trash-simple.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-province.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "aSB1wtOX", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/trash-simple.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:.6em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:.6em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-rehabplan.hbs" } });
});
define("self-start-front-end/templates/components/delete-status", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jCwNEmuY", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-status.hbs" } });
});
define("self-start-front-end/templates/components/display-assessment", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "XNoRsxsI", "block": "{\"symbols\":[\"q\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"assessmentModel\",\"questions\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"get-answers\",null,[[\"question\",\"assessment\",\"qNumber\",\"assessid\"],[[19,1,[]],[20,[\"assessmentModel\"]],[19,2,[]],[20,[\"assessmentModel\",\"id\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"Submit\"]],[7],[0,\"\\n    Submit\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/display-assessment.hbs" } });
});
define("self-start-front-end/templates/components/display-forms", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Epgzlx5h", "block": "{\"symbols\":[\"form\"],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Manage Forms\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[9,\"style\",\"padding-left: 2em;padding-right: 15em;padding-top: 10em;\"],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui vertical pointing menu\"],[9,\"style\",\"width: 12rem;\"],[7],[0,\"\\n    \"],[6,\"a\"],[10,\"class\",[26,[[18,\"formState\"],\" item\"]]],[3,\"action\",[[19,0,[]],\"form\"]],[7],[0,\"\\n      Forms\\n    \"],[8],[0,\"\\n    \"],[6,\"a\"],[10,\"class\",[26,[[18,\"questionState\"],\" item\"]]],[3,\"action\",[[19,0,[]],\"question\"]],[7],[0,\"\\n      Questions\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"formView\"]]],null,{\"statements\":[[0,\"  \"],[1,[18,\"add-form\"],false],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"margin-top: 18em;z-index:  2;position: relative;margin-left: 200px !important;\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -10px;\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"left thirteen wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n      \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"Forms\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"right two wide column\"],[9,\"style\",\"padding-left: 50px;\"],[7],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n    \"],[6,\"tbody\"],[7],[0,\"\\n    \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n      \"],[6,\"td\"],[9,\"class\",\"left aligned seven wide column\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"td\"],[9,\"class\",\"left aligned seven wide column\"],[7],[0,\"Description\"],[8],[0,\"\\n      \"],[6,\"td\"],[9,\"class\",\"center aligned two wide column\"],[7],[0,\"Actions\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n  \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n    \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"formModel\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"left aligned seven wide column\"],[7],[0,\"\\n          \"],[1,[19,1,[\"name\"]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"left aligned seven wide column\"],[7],[0,\"\\n          \"],[1,[19,1,[\"description\"]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"right aligned two wide column\"],[7],[0,\"\\n          \"],[6,\"p\"],[7],[1,[25,\"edit-form\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"left aligned two wide column\"],[7],[0,\"\\n          \"],[6,\"p\"],[7],[1,[25,\"delete-form\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"left aligned five wide column\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"formDisplay\",[25,\"query-params\",null,[[\"id\"],[[19,1,[\"id\"]]]]]],null,{\"statements\":[[0,\"              \"],[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon green button\"],[7],[0,\"View Form\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"left aligned five wide column\"],[7],[0,\"\\n          \"],[6,\"p\"],[7],[1,[25,\"manage-form\",null,[[\"ID\",\"questions\",\"form\",\"fName\"],[[19,1,[\"id\"]],[19,1,[\"questions\"]],[19,1,[]],[19,1,[\"name\"]]]]],false],[0,\"  \"],[8],[0,\"  \\n        \"],[8],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"left aligned five wide column\"],[7],[0,\"\\n          \"],[6,\"p\"],[7],[1,[25,\"show-form-questions\",null,[[\"ID\",\"questions\",\"thisForm\"],[[19,1,[\"id\"]],[19,1,[\"questions\"]],[19,1,[]]]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"questionView\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"manage-questions\",null,[[\"model\"],[[20,[\"questionModel\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/display-forms.hbs" } });
});
define("self-start-front-end/templates/components/display-questions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QtiAV6X/", "block": "{\"symbols\":[\"q\"],\"statements\":[[6,\"script\"],[9,\"type\",\"text/javascript\"],[7],[0,\"$(document).ready(function(){$(\\\".rating\\\").rating();});\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\"],[6,\"ol\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"formModel\",\"questions\"]]],null,{\"statements\":[[0,\"    \"],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[19,1,[\"sa\"]]],null,{\"statements\":[[0,\"        \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui input focus\"],[7],[0,\"\\n            \"],[6,\"li\"],[7],[1,[25,\"input\",null,[[\"type\",\"value\"],[\"text\",[20,[\"the\"]]]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,1,[\"ra\"]]],null,{\"statements\":[[0,\"        \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n         \"],[6,\"li\"],[7],[6,\"div\"],[9,\"class\",\"ui large heart rating\"],[9,\"data-max-rating\",\"10\"],[7],[8],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,1,[\"tf\"]]],null,{\"statements\":[[0,\"    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n     \"],[6,\"li\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"inline fields\"],[7],[0,\"\\n           \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"tf\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[0,\"True\"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n               \"],[6,\"input\"],[9,\"name\",\"tf\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n               \"],[6,\"label\"],[7],[0,\"False\"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"  \\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,1,[\"mc\"]]],null,{\"statements\":[[0,\"    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"grouped fields\"],[7],[0,\"\\n          \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],0],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],1],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],2],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"],[4,\"if\",[[25,\"number-of-mc\",[[19,1,[\"optionNumber\"]],3],null]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],3],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"number-of-mc\",[[19,1,[\"optionNumber\"]],4],null]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],4],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"number-of-mc\",[[19,1,[\"optionNumber\"]],5],null]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[7],[8],[0,\"\\n                \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[19,1,[\"optionString\"]],5],null],false],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/display-questions.hbs" } });
});
define("self-start-front-end/templates/components/edit-admin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SKbl3Krq", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-admin.hbs" } });
});
define("self-start-front-end/templates/components/edit-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UjkDLuT/", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer; \"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/pencil.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit country: \\\"\"],[1,[18,\"name\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Country Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add country\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-country.hbs" } });
});
define("self-start-front-end/templates/components/edit-exercises", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+4bDBm6R", "block": "{\"symbols\":[\"file\",\"image\",\"aS\",\"o\"],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular icon green button\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\" pencil icon\"],[7],[0,\" \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n\\n    \"],[6,\"h2\"],[9,\"id\",\"rehabPlan\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Edit Exercise \"],[1,[18,\"Name\"],false],[8],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Exercise Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Name\"]],\"Exercise Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[2,\"Description\"],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Description\"],[8],[0,\"\\n        \"],[1,[25,\"textarea\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Description\"]],\"Description\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Author Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"AuthName\"]],\"Author Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Objectives\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Objective\"]],\"Objective\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addObjective\"]],[7],[0,\"\\n            Add \"],[6,\"br\"],[7],[8],[0,\" Objective\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"align\",\"center\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Current Objectives\"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"ul\"],[9,\"align\",\"left\"],[10,\"value\",[18,\"obj\"],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"obj\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,4,[]],false],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModelDelete\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Action Steps\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"ActionSteps\"]],\"Action Steps\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addActionStep\"]],[7],[0,\"\\n            Add \"],[6,\"br\"],[7],[8],[0,\" Action Step\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"align\",\"center\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Current Action Steps\"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"ol\"],[9,\"align\",\"left\"],[10,\"value\",[18,\"actionStep\"],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"actionStep\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,3,[]],false],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"delete\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Location\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Location\"]],\"Location\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Frequency\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui left icon action input\"],[7],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"hourglass half icon\"],[7],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Frequency\"]],\"Frequency\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Duration\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui left icon action input\"],[7],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"calendar icon\"],[7],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Duration\"]],\"Duration\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Target Date\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui left icon action input\"],[7],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"add to calendar icon\"],[7],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"TargetDate\"]],\"Target Date\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Multimedia URL\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"MMURL\"]],\"Multi Media URL\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"secQueue\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"ui items\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"ui small image\"],[7],[0,\"\\n                \"],[6,\"img\"],[10,\"src\",[26,[[19,2,[\"imageData\"]]]]],[7],[8],[0,\"\\n                \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n                  \"],[6,\"label\"],[7],[0,\"Image Name\"],[8],[0,\" \"],[6,\"br\"],[7],[8],[0,\"\\n                  \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[19,2,[\"name\"]],[19,2,[\"name\"]]]]],false],[0,\" \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n                  \"],[6,\"button\"],[9,\"class\",\"ui red basic button\"],[3,\"action\",[[19,0,[]],\"deleteFile\",[19,2,[]]]],[7],[0,\"\\n                    Delete\\n                  \"],[8],[0,\"\\n                  \"],[6,\"br\"],[7],[8],[0,\" \"],[6,\"br\"],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"queue\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"ui divided demo items\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"image\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isUploading\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"div\"],[9,\"class\",\"ui active inverted dimmer\"],[7],[0,\"\\n                    \"],[6,\"div\"],[9,\"class\",\"ui loader\"],[7],[8],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                  \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"base64Image\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isDisplayableImage\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"label\"],[7],[0,\"Image Name\"],[8],[0,\" \"],[6,\"br\"],[7],[8],[0,\"\\n                    \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[19,1,[\"name\"]],\"Exercise Name\"]]],false],[0,\"\\n                    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n                    \"],[6,\"button\"],[9,\"class\",\"ui red basic button\"],[3,\"action\",[[19,0,[]],\"deleteNewFile\",[19,1,[]]]],[7],[0,\"\\n                      Delete\\n                    \"],[8],[0,\"\\n                    \"],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                    \"],[6,\"p\"],[7],[0,\"Unsupported image\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[6,\"div\"],[9,\"class\",\"ui fluid labeled input\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"ui fluid huge label\"],[10,\"style\",[18,\"labelStyle\"],null],[7],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"big cloud upload icon\"],[7],[8],[0,\"\\n            Click or Drop files into this area to upload files\\n          \"],[8],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"file\"],[9,\"value\",\"target.value\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectFile\"],null],null],[10,\"style\",[18,\"inputStyle\"],null],[10,\"accept\",[26,[[18,\"accept\"]]]],[10,\"multiple\",[18,\"multiple\"],null],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[2,\"footer for save / cancel\"],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui positive button\"],[7],[0,\"Save\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui black deny button\"],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-exercises.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "ucc4QbGV", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer; \"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/pencil.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit Gender: \\\"\"],[1,[18,\"name\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Gender Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add gender\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-gender.hbs" } });
});
define("self-start-front-end/templates/components/edit-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gYfYwh2g", "block": "{\"symbols\":[\"oneCountry\",\"oneGender\"],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer; \"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/pencil.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"i\"],[9,\"class\",\"close icon\"],[7],[8],[0,\"\\n  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Edit Client\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"scrolling content\"],[7],[0,\"\\n\\n  \"],[6,\"form\"],[9,\"id\",\"edit\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"submit\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n      \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"pateintsData\",\"givenName\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"pateintsData\",\"familyName\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date of Birth\"],[8],[0,\"\\n        \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectGender\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"pateintsData\",\"gender\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n                \"],[1,[19,2,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Health Card Number\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"card\",\"text\",[20,[\"pateintsData\",\"healthCardNumber\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n    \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Number\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"pateintsData\",\"streetNumber\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Street Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"pateintsData\",\"streetName\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Unit\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"bookmark\",\"text\",[20,[\"pateintsData\",\"apartment\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Postal/ZIP Code\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"flag\",\"text\",[20,[\"pateintsData\",\"postalCode\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui three column grid\"],[9,\"id\",\"grid\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"h4\"],[7],[0,\"Country\"],[8],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectCountry\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"pateintsData\",\"country\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n                \"],[1,[19,1,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"h4\"],[7],[0,\"Province\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"world\",\"text\",[20,[\"pateintsData\",\"province\"]],\"Province/State\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"h4\"],[7],[0,\"City\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"world\",\"text\",[20,[\"pateintsData\",\"city\"]],\"City\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n    \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"pateintsData\",\"phoneNumber\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"pateintsData\",\"email\"]],true]]],false],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"fluid ui blue button\"],[9,\"style\",\"max-width: 100%; height: 50px;\"],[7],[0,\"\\n        Submit\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-patient.hbs" } });
});
define("self-start-front-end/templates/components/edit-physiotherapist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tlk1BVPu", "block": "{\"symbols\":[\"oneGender\"],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer; \"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/pencil.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"i\"],[9,\"class\",\"close icon\"],[7],[8],[0,\"\\n  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[9,\"href\",\"/assets/css/form-style.css\"],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Edit Practitioner\"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"scrolling content\"],[7],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"id\",\"edit\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"submit\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n      \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"physiosData\",\"givenName\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"physiosData\",\"familyName\"]],true]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date Hired\"],[8],[0,\"\\n          \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedHiredDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignHiredDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n          \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date Released\"],[8],[0,\"\\n          \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedFiredDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignFiredDate\"],[[\"value\"],[\"target.value\"]]],null],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectGender\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"physiosData\",\"gender\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n                \"],[1,[19,1,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n      \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"physiosData\",\"phoneNumber\"]],true]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"physiosData\",\"email\"]],true]]],false],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"fluid ui blue button\"],[9,\"value\",\"submit\"],[9,\"style\",\"max-width: 100%; height: 50px;\"],[7],[0,\"\\n          Submit\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-physiotherapist.hbs" } });
});
define("self-start-front-end/templates/components/edit-province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WfUqu/Bx", "block": "{\"symbols\":[\"country\"],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer; \"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"/assets/images/pencil.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit Province: \\\"\"],[1,[18,\"name\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Province Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add province\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Country Name\"],[8],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"onChange\"],[\"search selection\",[25,\"action\",[[19,0,[]],\"setCountryId\"],null]]],{\"statements\":[[0,\"            \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[0,\"Select a country\"],[8],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"countries\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"data-value\",[26,[[19,1,[\"id\"]]]]],[9,\"class\",\"item\"],[7],[0,\"\\n                  \"],[1,[19,1,[\"name\"]],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"            \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-province.hbs" } });
});
define("self-start-front-end/templates/components/edit-rehabplan", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "R/5r2Jjs", "block": "{\"symbols\":[],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon green button\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"edit icon\"],[7],[8],[0,\"\\n  Edit\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"h2\"],[9,\"id\",\"rehabPlan\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Edit Rehabilitation Plan  \"],[1,[18,\"planName\"],false],[8],[0,\"\\n\\n  \"],[6,\"form\"],[9,\"class\",\"ui form\"],[9,\"style\",\"padding: 5%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large user icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"seven wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"planName\"]],\"Rehab plan name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"seven wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"physioID\"]],\"Author Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[2,\"Description\"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large comment icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"description\"]],\"Description\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[2,\"goal\"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large trophy icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"goal\"]],\"Goal\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[2,\"icon\"],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large wait icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"timeToComplete\"]],\"Time\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n    \"],[2,\"Exercise\"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"fields\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide field\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"id\",\"icon\"],[9,\"class\",\"black large world icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide field\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"exercises\"]],\"Exercise\"]]],false],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[2,\"assessment Test\"],[0,\"\\n    \"],[2,\"<div class=\\\"fields\\\">\"],[0,\"\\n    \"],[2,\"<div class=\\\"two wide field\\\">\"],[0,\"\\n    \"],[2,\"<i id=\\\"icon\\\" class=\\\"black large comment icon\\\"></i>\"],[0,\"\\n    \"],[2,\"</div>\"],[0,\"\\n    \"],[2,\"<div class=\\\"fourteen wide field\\\">\"],[0,\"\\n\"],[0,\"    \"],[2,\"</div>\"],[0,\"\\n    \"],[2,\"</div>\"],[0,\"\\n    \"],[2,\"<br>\"],[0,\"\\n    \"],[2,\"footer for save / cancel\"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui black deny button\"],[7],[0,\"\\n        Cancel\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[7],[0,\"\\n        Save\\n        \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-rehabplan.hbs" } });
});
define("self-start-front-end/templates/components/get-answers", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Da6tBefL", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"question\",\"sa\"]]],null,{\"statements\":[[0,\"    \"],[6,\"label\"],[7],[1,[20,[\"question\",\"questionText\"]],false],[8],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui input focus\"],[7],[0,\"\\n      \"],[6,\"li\"],[7],[1,[25,\"input\",null,[[\"type\",\"value\",\"focus-out\"],[\"text\",[20,[\"SAanswer\"]],\"saSave\"]]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"question\",\"ra\"]]],null,{\"statements\":[[0,\"    \"],[6,\"label\"],[7],[1,[20,[\"question\",\"questionText\"]],false],[8],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[1,[25,\"ui-rating\",null,[[\"class\",\"maxRating\",\"onRate\"],[\"heart\",10,[25,\"action\",[[19,0,[]],\"ratingSave\"],[[\"rateValue\"],[[20,[\"value\"]]]]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"question\",\"tf\"]]],null,{\"statements\":[[0,\"    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"li\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"inline fields\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[1,[20,[\"question\",\"questionText\"]],false],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[1,[25,\"ui-radio\",null,[[\"name\",\"label\",\"value\",\"current\",\"onChange\"],[\"tf\",\"True\",\"True\",[20,[\"tf\"]],[25,\"action\",[[19,0,[]],\"TFtrue\"],null]]]],false],[0,\"\\n\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[1,[25,\"ui-radio\",null,[[\"name\",\"label\",\"value\",\"current\",\"onChange\"],[\"tf\",\"False\",\"False\",[20,[\"tf\"]],[25,\"action\",[[19,0,[]],\"TFfalse\"],null]]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"question\",\"mc\"]]],null,{\"statements\":[[0,\"    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"grouped fields\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[1,[20,[\"question\",\"questionText\"]],false],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[9,\"value\",\"mcop2\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"mcop1Save\"],null],null],[7],[8],[0,\"\\n          \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[20,[\"question\",\"optionString\"]],0],null],false],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"mcop2Save\"],null],null],[7],[8],[0,\"\\n          \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[20,[\"question\",\"optionString\"]],1],null],false],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"mcop3Save\"],null],null],[7],[8],[0,\"\\n          \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[20,[\"question\",\"optionString\"]],2],null],false],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"],[4,\"if\",[[25,\"number-of-mc\",[[20,[\"question\",\"optionNumber\"]],3],null]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n            \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"mcop4Save\"],null],null],[7],[8],[0,\"\\n            \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[20,[\"question\",\"optionString\"]],3],null],false],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"number-of-mc\",[[20,[\"question\",\"optionNumber\"]],4],null]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n            \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"mcop5Save\"],null],null],[7],[8],[0,\"\\n            \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[20,[\"question\",\"optionString\"]],4],null],false],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"number-of-mc\",[[20,[\"question\",\"optionNumber\"]],5],null]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui radio checkbox\"],[7],[0,\"\\n            \"],[6,\"input\"],[9,\"name\",\"mc\"],[9,\"type\",\"radio\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"mcop6Save\"],null],null],[7],[8],[0,\"\\n            \"],[6,\"label\"],[7],[1,[25,\"mc-display\",[[20,[\"question\",\"optionString\"]],5],null],false],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/get-answers.hbs" } });
});
define("self-start-front-end/templates/components/list-forms", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hrA53tgW", "block": "{\"symbols\":[\"form\"],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon red button\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n  Add Assessment Test\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\"],[0,\"      \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"formsModel\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n            \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"AddTest\",[19,1,[]],[20,[\"plan\"]]]],[7],[0,\"Add \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[7],[0,\"\\n      Done\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/list-forms.hbs" } });
});
define("self-start-front-end/templates/components/manage-admin-accounts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QDFosdNz", "block": "{\"symbols\":[\"patient\",\"column\",\"column\",\"attribute\"],\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Manage Accounts\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"class\",\"background\"],[9,\"style\",\"padding-left: 2em;padding-right: 15em;padding-top: 10em;\"],[7],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui vertical pointing menu\"],[9,\"style\",\"width: 12rem;\"],[7],[0,\"\\n    \"],[6,\"a\"],[10,\"class\",[26,[[18,\"clientState\"],\" item\"]]],[3,\"action\",[[19,0,[]],\"client\"]],[7],[0,\"\\n      Clients\\n    \"],[8],[0,\"\\n    \"],[6,\"a\"],[10,\"class\",[26,[[18,\"practState\"],\" item\"]]],[3,\"action\",[[19,0,[]],\"pract\"]],[7],[0,\"\\n      Practitioners\\n    \"],[8],[0,\"\\n    \"],[6,\"a\"],[10,\"class\",[26,[[18,\"adminState\"],\" item\"]]],[3,\"action\",[[19,0,[]],\"admin\"]],[7],[0,\"\\n      Admins\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"clientView\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"margin-top: -18em;z-index:  2;position: relative;margin-left: 200px !important;\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -30px;\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"left thirteen wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n        \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"\\n            Clients\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"right two wide column\"],[9,\"style\",\"padding-left: 30px;\"],[7],[0,\"\\n        \"],[1,[25,\"add-patient\",null,[[\"flagAdd\"],[[20,[\"flagAdd\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui left aligned seven wide column\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"two fields\"],[7],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"selected\",\"onChange\"],[\"selection\",[20,[\"queryPath\"]],[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"queryPath\"]]],null]],null]]],{\"statements\":[[0,\"              \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[1,[20,[\"modelAttributes\",\"firstObject\",\"name\"]],false],[8],[0,\"\\n              \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"div\"],[9,\"class\",\"item\"],[10,\"data-value\",[26,[[19,4,[\"key\"]]]]],[7],[0,\"\\n                    \"],[1,[19,4,[\"name\"]],false],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"              \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n              \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n              \"],[1,[25,\"input\",null,[[\"type\",\"placeholder\",\"value\"],[\"text\",\"Search...\",[20,[\"query\"]]]]],false],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"style\",\"display: inline\"],[7],[0,\"\\n      \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n        \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n          \"],[6,\"th\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\" \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"              \"],[6,\"th\"],[10,\"class\",[19,3,[\"class\"]],null],[3,\"action\",[[19,0,[]],\"sortColumn\",[19,3,[\"key\"]],[19,3,[\"dir\"]]]],[7],[1,[19,3,[\"name\"]],false],[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[6,\"th\"],[9,\"class\",\"center aligned two wide  column\"],[7],[0,\"Actions\"],[8],[0,\"\\n          \"],[2,\"<th class=\\\"left aligned one wide  column\\\"></th>\"],[0,\"\\n\\n        \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"id\",\"myWindow\"],[9,\"style\",\"height:500px; overflow-y: scroll; overflow-x: hidden;\"],[7],[0,\"\\n      \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n        \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"patientsModel\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n                \"],[6,\"img\"],[9,\"src\",\"/assets/images/nav/single-01.svg\"],[9,\"class\",\"ui mini rounded image\"],[3,\"action\",[[19,0,[]],\"toggleDetail\",[19,1,[\"id\"]]]],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"\\n\"],[0,\"\\n                \"],[6,\"td\"],[10,\"class\",[19,2,[\"class\"]],null],[7],[0,\"\\n                  \"],[1,[25,\"get\",[[19,1,[]],[19,2,[\"key\"]]],null],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column \"],[7],[0,\"\\n                \"],[1,[25,\"edit-patient\",null,[[\"pateintsData\"],[[19,1,[]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[1,[25,\"delete-patient\",null,[[\"ID\",\"flagDelete\"],[[19,1,[\"id\"]],[20,[\"flagDelete\"]]]]],false],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"practView\"]]],null,{\"statements\":[[0,\"    \"],[1,[18,\"physio-table\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"adminView\"]]],null,{\"statements\":[[0,\"    \"],[1,[18,\"admin-table\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/manage-admin-accounts.hbs" } });
});
define("self-start-front-end/templates/components/manage-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "swhm66rc", "block": "{\"symbols\":[\"question\"],\"statements\":[[0,\"\\n\"],[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon green button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\nAdd Questions\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n           \"],[6,\"h2\"],[7],[0,\" \"],[1,[18,\"fName\"],false],[0,\" \"],[8],[0,\"\\n           \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"questionsModel\"]]],null,{\"statements\":[[0,\"                        \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n                         \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n                        \"],[8],[0,\"\\n\\n                        \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n                         \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"addQuestion\",[19,1,[]],[20,[\"form\"]],[19,1,[\"id\"]]]],[7],[0,\" Add \"],[8],[0,\"\\n                        \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"           \"],[8],[0,\"\\n           \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n         \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n         \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[7],[0,\"\\n         Done\\n         \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/manage-form.hbs" } });
});
define("self-start-front-end/templates/components/manage-patients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dtpzywtH", "block": "{\"symbols\":[\"patient\",\"column\",\"column\",\"attribute\"],\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Manage Clients\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"class\",\"background\"],[9,\"style\",\"padding-left: 5em;padding-right: 5em;padding-top:  10em;\"],[7],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"margin-top: -100px;\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -30px;\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"left thirteen wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"\\n            Clients\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"right two wide column\"],[9,\"style\",\"padding-left: 30px;\"],[7],[0,\"\\n          \"],[1,[18,\"add-patient\"],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui left aligned seven wide column\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"two fields\"],[7],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"selected\",\"onChange\"],[\"selection\",[20,[\"queryPath\"]],[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"queryPath\"]]],null]],null]]],{\"statements\":[[0,\"                \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[1,[20,[\"modelAttributes\",\"firstObject\",\"name\"]],false],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"div\"],[9,\"class\",\"item\"],[10,\"data-value\",[26,[[19,4,[\"key\"]]]]],[7],[0,\"\\n                      \"],[1,[19,4,[\"name\"]],false],[0,\"\\n                    \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"                \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n                \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"type\",\"placeholder\",\"value\"],[\"text\",\"Search...\",[20,[\"query\"]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"style\",\"display: inline\"],[7],[0,\"\\n        \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n          \"],[6,\"tbody\"],[7],[0,\"\\n          \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n            \"],[6,\"th\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\" \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"              \"],[6,\"th\"],[10,\"class\",[19,3,[\"class\"]],null],[3,\"action\",[[19,0,[]],\"sortColumn\",[19,3,[\"key\"]],[19,3,[\"dir\"]]]],[7],[1,[19,3,[\"name\"]],false],[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"\"],null]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"            \"],[6,\"th\"],[9,\"class\",\"center aligned two wide  column\"],[7],[0,\"Actions\"],[8],[0,\"\\n            \"],[2,\"<th class=\\\"left aligned one wide  column\\\"></th>\"],[0,\"\\n\\n          \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"id\",\"myWindow\"],[9,\"style\",\"height:500px; overflow-y: scroll; overflow-x: hidden;\"],[7],[0,\"\\n        \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n          \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"patientsModel\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n                \"],[6,\"img\"],[9,\"src\",\"/assets/images/nav/single-01.svg\"],[9,\"class\",\"ui mini rounded image\"],[3,\"action\",[[19,0,[]],\"toggleDetail\",[19,1,[\"id\"]]]],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"\\n\"],[0,\"\\n                \"],[6,\"td\"],[10,\"class\",[19,2,[\"class\"]],null],[7],[0,\"\\n                  \"],[1,[25,\"get\",[[19,1,[]],[19,2,[\"key\"]]],null],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column \"],[7],[0,\"\\n                \"],[1,[25,\"edit-patient\",null,[[\"pateintsData\"],[[19,1,[]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[1,[25,\"delete-patient\",null,[[\"ID\",\"flagDelete\"],[[19,1,[\"id\"]],[20,[\"flagDelete\"]]]]],false],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"tr\"],[7],[0,\"\\n              \"],[6,\"th\"],[9,\"colspan\",\"8\"],[7],[0,\"\\n\"],[4,\"liquid-spacer\",null,[[\"growDuration\"],[500]],{\"statements\":[[4,\"if\",[[25,\"eq\",[[20,[\"isShowing\"]],[19,1,[\"id\"]]],null]],null,{\"statements\":[[0,\"                    \"],[1,[25,\"show-patient\",null,[[\"model\"],[[19,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"              \"],[8],[0,\"\\n            \"],[6,\"tr\"],[7],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/manage-patients.hbs" } });
});
define("self-start-front-end/templates/components/manage-questions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "96BZ4XNw", "block": "{\"symbols\":[\"question\"],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"margin-top: 18em;z-index:  2;position: relative;margin-left: 200px !important;\"],[7],[0,\"\\n  \"],[1,[18,\"add-question\"],false],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -30px;\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"left thirteen wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n      \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"Questions\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"right two wide column\"],[9,\"style\",\"padding-left: 50px;\"],[7],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n    \"],[6,\"tbody\"],[7],[0,\"\\n    \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n      \"],[6,\"td\"],[9,\"class\",\"left aligned seven wide column\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[6,\"td\"],[9,\"class\",\"left aligned seven wide column\"],[7],[0,\"Question type\"],[8],[0,\"\\n      \"],[6,\"td\"],[9,\"class\",\"center aligned two wide column\"],[7],[0,\"Actions\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n  \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n    \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"left aligned seven wide column\"],[7],[0,\"\\n          \"],[1,[19,1,[\"questionText\"]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"left aligned seven wide column\"],[7],[0,\"\\n          \"],[1,[19,1,[\"type\"]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column\"],[7],[0,\"\\n          \"],[6,\"p\"],[7],[1,[25,\"modify-question\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column\"],[7],[0,\"\\n          \"],[6,\"p\"],[7],[1,[25,\"delete-question\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/manage-questions.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "C1wW5RHz", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[9,\"id\",\"window\"],[7],[0,\"\\n\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"id\",\"example\"],[9,\"class\",\"index\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"full height\"],[7],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",[26,[\"following bar \",[18,\"stickyValue\"]]]],[9,\"id\",\"header\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"ui large secondary network menu inverted\"],[9,\"id\",\"menu\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"ui logo shape\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"sides\"],[7],[0,\"\\n                  \"],[6,\"div\"],[9,\"class\",\"active ui side\"],[7],[0,\"\\n                    \"],[4,\"link-to\",[\"home\"],null,{\"statements\":[[6,\"img\"],[9,\"class\",\"ui image selfStart\"],[9,\"src\",\"assets/images/home/Header.png\"],[7],[8]],\"parameters\":[]},null],[0,\"\\n                  \"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n\\n            \"],[6,\"div\"],[10,\"class\",[26,[\"right menu \",[18,\"invertedValue\"]]]],[7],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item scroll\"],[9,\"href\",\"#about\"],[7],[0,\"About\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"How it Works\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"Services\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"Assessment\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"Blog\"],[8],[0,\"\\n              \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"Contact\"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"loggedOut\"]]],null,{\"statements\":[[0,\"                \"],[6,\"a\"],[9,\"id\",\"login\"],[9,\"class\",\"item\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"Log in\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[6,\"a\"],[9,\"class\",\"item\"],[3,\"action\",[[19,0,[]],\"logout\"]],[7],[0,\"Logout\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[11,1],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"login\",\"login tiny\"]],{\"statements\":[[0,\"\\n\"],[4,\"if\",[[20,[\"loggingIn\"]]],null,{\"statements\":[[0,\"\\n    \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n    \"],[6,\"h2\"],[9,\"class\",\"ui fluid centered header\"],[9,\"style\",\"border-radius: 0.28571429rem;\"],[7],[0,\"Sign in\"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"id\",\"ui container\"],[9,\"style\",\"height: 355px; padding-left:5%; padding-right: 5%; padding-top: 2%\"],[7],[0,\"\\n      \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"submit\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"email\",\"email\",[20,[\"Email\"]],\"Email\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"lock\",\"password\",[20,[\"PWord\"]],\"Password\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"checkbox\"],[9,\"id\",\"cd-checkbox-1\"],[7],[8],[0,\"\\n          \"],[6,\"label\"],[9,\"for\",\"cd-checkbox-1\"],[7],[0,\"Remember me\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"fluid ui blue button\"],[9,\"style\",\"max-width: 100%; height: 50px;\"],[7],[0,\"Login\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"cursor: pointer; text-align: center;  text-decoration: underline; padding-top: 65px\"],[3,\"action\",[[19,0,[]],\"forgotPassword\"]],[7],[0,\"forgot your password?\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n    \"],[6,\"h2\"],[9,\"class\",\"ui fluid centered header\"],[9,\"style\",\"border-radius: 0.28571429rem;\"],[7],[0,\"Sign in\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"id\",\"ui container\"],[9,\"style\",\"height: 260px; padding-left:5%; padding-right: 5%; padding-top: 3%\"],[7],[0,\"\\n    \"],[6,\"p\"],[9,\"style\",\"text-align: center;\"],[7],[0,\"Lost your password? Please enter your email address. You will receive a link to create a new password.\"],[8],[0,\"\\n      \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"submit\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"email\",\"email\",[20,[\"Email\"]],\"Email\",true]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"fluid ui blue button\"],[9,\"style\",\"max-width: 100%; height: 50px;\"],[9,\"value\",\"Submit\"],[7],[0,\"Reset Password\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"cursor: pointer; text-align: center;  text-decoration: underline; padding-top: 65px\"],[3,\"action\",[[19,0,[]],\"login\"]],[7],[0,\"Back to log-in\"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/nav-bar.hbs" } });
});
define("self-start-front-end/templates/components/parse-question", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ws/Z1fuT", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\\n   \\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/parse-question.hbs" } });
});
define("self-start-front-end/templates/components/physio-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "AysRSHAa", "block": "{\"symbols\":[\"&default\"],\"statements\":[[2,\"<style>\"],[0,\"\\n\"],[2,\".ui.visible.left.sidebar ~ .fixed,\"],[0,\"\\n\"],[2,\".ui.visible.left.sidebar ~ .pusher {\"],[0,\"\\n\"],[2,\"-ebkit-transform: translate3d(260px, 0, 0); transform: translate3d(260px, 0, 0);\"],[0,\"\\n\"],[2,\"}\"],[0,\"\\n\"],[2,\"</style>\"],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"id\",\"example\"],[9,\"class\",\"index\"],[7],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"full height\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"following bar\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui large secondary network menu inverted\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui logo shape\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"sides\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"active ui side\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"practitioner\"],null,{\"statements\":[[0,\"                    \"],[6,\"img\"],[9,\"class\",\"ui image selfStart\"],[9,\"src\",\"/assets/images/home/Header.png\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"right menu inverted\"],[7],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"/practitioner/clients\"],[9,\"class\",\"item\"],[7],[0,\"Clients\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"/practitioner/rehabplans\"],[9,\"class\",\"item\"],[7],[0,\"Menu Builder\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"href\",\"/practitioner/appointment\"],[9,\"class\",\"item\"],[7],[0,\"Appointments\"],[8],[0,\"\\n            \"],[6,\"a\"],[9,\"id\",\"login\"],[9,\"class\",\"item\"],[10,\"onClick\",[25,\"action\",[[19,0,[]],\"logout\"],null],null],[7],[0,\"Log out\"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[11,1],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/physio-nav.hbs" } });
});
define("self-start-front-end/templates/components/physio-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "DUX742Ko", "block": "{\"symbols\":[\"physio\",\"column\",\"column\",\"attribute\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui very padded container segment\"],[9,\"id\",\"top\"],[9,\"style\",\"margin-top: -18em;z-index:  2;position: relative;margin-left: 200px !important;\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui grid\"],[9,\"style\",\"margin-top: -30px;\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"left twelve wide column\"],[9,\"style\",\"margin-top: -5px;\"],[7],[0,\"\\n      \"],[6,\"p\"],[9,\"style\",\"padding-top: 13px;color:  white;font-size: 1.5em;font-weight: bolder;\"],[7],[0,\"\\n        Practitioners\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"right four wide column\"],[9,\"style\",\"padding-left: 45px;\"],[7],[0,\"\\n      \"],[1,[25,\"add-physiotherapist\",null,[[\"flagAdd\"],[[20,[\"flagAdd\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui left aligned seven wide column\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two fields\"],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"selected\",\"onChange\"],[\"selection\",[20,[\"queryPath\"]],[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"queryPath\"]]],null]],null]]],{\"statements\":[[0,\"            \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[1,[20,[\"modelAttributes\",\"firstObject\",\"name\"]],false],[8],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[9,\"class\",\"item\"],[10,\"data-value\",[26,[[19,4,[\"key\"]]]]],[7],[0,\"\\n                  \"],[1,[19,4,[\"name\"]],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"            \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"type\",\"placeholder\",\"value\"],[\"text\",\"Search...\",[20,[\"query\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"div\"],[9,\"style\",\"display: inline\"],[7],[0,\"\\n    \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"style\",\"border: none;border-color: white;\"],[7],[0,\"\\n      \"],[6,\"tbody\"],[7],[0,\"\\n      \"],[6,\"tr\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"\\n        \"],[6,\"th\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\" \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"          \"],[6,\"th\"],[10,\"class\",[19,3,[\"class\"]],null],[3,\"action\",[[19,0,[]],\"sortColumn\",[19,3,[\"key\"]],[19,3,[\"dir\"]]]],[7],[1,[19,3,[\"name\"]],false],[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"              \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"              \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[19,3,[\"dir\"]],\"\"],null]],null,{\"statements\":[[0,\"              \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[6,\"th\"],[9,\"class\",\"center aligned two wide  column\"],[7],[0,\"Actions\"],[8],[0,\"\\n        \"],[2,\"<th class=\\\"left aligned one wide  column\\\"></th>\"],[0,\"\\n\\n      \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"id\",\"myWindow\"],[9,\"style\",\"height:600px; overflow-y: scroll; overflow-x: hidden;\"],[7],[0,\"\\n    \"],[6,\"table\"],[9,\"class\",\"ui fixed table\"],[9,\"id\",\"tb\"],[9,\"style\",\"margin: 0 0;border: none;\"],[7],[0,\"\\n      \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"practsModel\"]]],null,{\"statements\":[[0,\"\\n        \"],[6,\"tr\"],[7],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n            \"],[6,\"img\"],[9,\"src\",\"/assets/images/nav/single-01.svg\"],[9,\"class\",\"ui mini rounded image\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"\\n\"],[0,\"\\n            \"],[6,\"td\"],[10,\"class\",[19,2,[\"class\"]],null],[7],[0,\"\\n              \"],[1,[25,\"get\",[[19,1,[]],[19,2,[\"key\"]]],null],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"right aligned one wide column \"],[7],[0,\"\\n            \"],[1,[25,\"edit-physiotherapist\",null,[[\"physiosData\"],[[19,1,[]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n            \"],[6,\"p\"],[7],[1,[25,\"delete-physiotherapist\",null,[[\"ID\",\"flagDelete\"],[[19,1,[\"id\"]],[20,[\"flagDelete\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/physio-table.hbs" } });
});
define("self-start-front-end/templates/components/physio-welcome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "VG+06MVi", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg3\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[7],[0,\"Practitioner Page\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui center aligned grid\"],[7],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/physio-welcome.hbs" } });
});
define("self-start-front-end/templates/components/register-user", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RQF1PdSF", "block": "{\"symbols\":[],\"statements\":[[6,\"a\"],[9,\"class\",\"ui large inverted download button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  Register\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"register\",\"register\"]],{\"statements\":[[0,\"\\n  \"],[6,\"h2\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Register\"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"id\",\"ui container\"],[9,\"style\",\"height: 320px; padding-left:10%; padding-right: 10%; padding-top: 2%\"],[7],[0,\"\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"User Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"UName\"]],\"User Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Email\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Email\"]],\"Email\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Password\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"password\",[20,[\"PWord\"]],\"Password\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"inline\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui green button \"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui button \"],[3,\"action\",[[19,0,[]],\"deny\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/register-user.hbs" } });
});
define("self-start-front-end/templates/components/rl-dropdown-container", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "V78jEbtW", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1,[[20,[\"dropdownExpanded\"]]]],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/rl-dropdown-container.hbs" } });
});
define("self-start-front-end/templates/components/show-form-questions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qi6oow7x", "block": "{\"symbols\":[\"oneQuestion\",\"q\",\"index\"],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon green button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\nChange Order\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"h3\"],[7],[0,\"Questions: \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"questions\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide column\"],[7],[0,\"\\n        \"],[6,\"li\"],[7],[0,\"  \"],[1,[19,1,[\"questionText\"]],false],[0,\" \"],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"two wide column right aligned\"],[7],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon red button\"],[3,\"action\",[[19,0,[]],\"removeQuestion\",[19,1,[]],[20,[\"thisForm\"]],[19,1,[\"id\"]],[20,[\"thisForm\",\"id\"]]]],[7],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"Remove\"],[8],[0,\"\\n        \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n          \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"orderChange\",[19,1,[]],[20,[\"thisForm\"]],[20,[\"thisForm\",\"id\"]]],null],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"questions\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",[19,3,[]],null],[10,\"selected\",[25,\"is-equal\",[[19,1,[]],[19,2,[]]],null],null],[7],[0,\"\\n                \"],[1,[25,\"index-plus-one\",[[19,3,[]]],null],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[2,3]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n     \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[3,\"action\",[[19,0,[]],\"save\",[20,[\"thisForm\"]],[20,[\"thisForm\",\"id\"]]]],[7],[0,\"\\n      Done\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/show-form-questions.hbs" } });
});
define("self-start-front-end/templates/components/show-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YYZ+xrJR", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"ui container\"],[9,\"style\",\"height: 150px;width: 950px;padding-top: 50px;\"],[7],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"max-width: 230px;\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Documents\"],[8],[0,\"\\n      \"],[2,\"<div class=\\\"meta\\\">Friend</div>\"],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"max-width: 230px;\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Accounting\"],[8],[0,\"\\n      \"],[2,\"<div class=\\\"meta\\\">Friend</div>\"],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"max-width: 230px;\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Messages\"],[8],[0,\"\\n      \"],[2,\"<div class=\\\"meta\\\">Friend</div>\"],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"max-width: 200px;\"],[7],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n        \"],[6,\"a\"],[9,\"class\",\"header\"],[7],[4,\"link-to\",[\"practitioner.client-file\",[20,[\"model\",\"id\"]]],null,{\"statements\":[[0,\"Client's Files\"]],\"parameters\":[]},null],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"meta\"],[7],[1,[20,[\"model\",\"givenName\"]],false],[0,\" \"],[1,[20,[\"model\",\"familyName\"]],false],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/show-patient.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "OmFy6BwF", "block": "{\"symbols\":[\"file\"],\"statements\":[[4,\"each\",[[20,[\"queue\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui divided demo items\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"image\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isUploading\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"ui active inverted dimmer\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui loader\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"base64Image\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n\"],[0,\"        \"],[6,\"div\"],[9,\"class\",\"meta\"],[7],[0,\"\\n          \"],[6,\"span\"],[7],[0,\"Size: \"],[1,[19,1,[\"size\"]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isDisplayableImage\"]]],null,{\"statements\":[[0,\"            \"],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"p\"],[7],[0,\"Unsupported image\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"        \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"notInAddExercise\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"extra\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"isDisplayableImage\"]]],null,{\"statements\":[[0,\"              \"],[6,\"button\"],[9,\"class\",\"ui icon green basic button\"],[3,\"action\",[[19,0,[]],\"saveFile\",[19,1,[]]]],[7],[0,\"\\n                \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[6,\"button\"],[9,\"class\",\"ui icon red basic button\"],[3,\"action\",[[19,0,[]],\"deleteFile\",[19,1,[]]]],[7],[0,\"\\n              \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[1]},{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui fluid labeled input\"],[7],[0,\"\\n    \"],[6,\"label\"],[9,\"class\",\"ui fluid huge label\"],[10,\"style\",[18,\"labelStyle\"],null],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"big cloud upload icon\"],[7],[8],[0,\"\\n      Click or Drop files into this area to upload files\\n    \"],[8],[0,\"\\n    \"],[6,\"input\"],[9,\"type\",\"file\"],[9,\"value\",\"target.value\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectFile\"],null],null],[10,\"style\",[18,\"inputStyle\"],null],[10,\"accept\",[26,[[18,\"accept\"]]]],[10,\"multiple\",[18,\"multiple\"],null],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/upload-file.hbs" } });
});
define("self-start-front-end/templates/components/user-info", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ereszmnh", "block": "{\"symbols\":[\"oneCountry\",\"oneGender\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"id\",\"example\"],[9,\"class\",\"index\"],[7],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"full height\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"following bar\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui large secondary network menu inverted\"],[9,\"id\",\"mini-nav\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui logo shape\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"sides\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"active ui side\"],[7],[0,\"\\n                  \"],[6,\"a\"],[9,\"href\",\"/\"],[7],[0,\"\\n                    \"],[6,\"img\"],[9,\"src\",\"assets/images/mini-logo2.png\"],[7],[8],[0,\"\\n                    \"],[6,\"span\"],[7],[0,\"\\n                      \"],[6,\"i\"],[9,\"class\",\"angle left icon\"],[7],[8],[0,\"\\n                      Go back to home page\\n                    \"],[8],[0,\"\\n                  \"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"masthead segment bg4\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n          \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n            \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Registration\"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui centered very padded segment container\"],[9,\"style\",\"border: none; box-shadow: none; background-color: white;margin-top: -320px;position: relative;z-index:  2;\"],[7],[0,\"\\n        \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[0,\"\\n\\n        \"],[2,\"<div class=\\\"ui attached segment\\\">\"],[0,\"\\n          \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[0,\"          \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[9,\"style\",\"margin: 0 0; padding-right: 15%; padding-left: 15%\"],[3,\"action\",[[19,0,[]],\"submit\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n            \"],[6,\"legend\"],[7],[0,\"Account Information\"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n              \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"email\",\"email\",[20,[\"email\"]],\"email\",true]]],false],[0,\"\\n            \"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n              \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"lock\",\"password\",[20,[\"encryptedPassword\"]],\"Password\",true]]],false],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n            \"],[6,\"legend\"],[7],[0,\"Personal Information\"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                  \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],\"First Name\",true]]],false],[0,\"\\n                \"],[8],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                  \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],\"Last Name\",true]]],false],[0,\"\\n                \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n                  \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectGender\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"true\"],[7],[0,\"\\n                    \"],[6,\"option\"],[9,\"selected\",\"selected\"],[7],[0,\"\\n                      Select Gender\\n                    \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"                      \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"gender\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n                        \"],[1,[19,2,[\"name\"]],false],[0,\"\\n                      \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"                  \"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n              \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"phone\",\"text\",[20,[\"phoneNumber\"]],\"Phone Number\",true]]],false],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n            \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"home\",\"text\",[20,[\"streetNumber\"]],\"Street Number\",true]]],false],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"home\",\"text\",[20,[\"streetName\"]],\"Street Name\",true]]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"ui two column grid\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"placeholder\",\"value\"],[\"home\",\"text\",\"Unit Number\",[20,[\"apartment\"]]]]],false],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"flag\",\"text\",[20,[\"postalCode\"]],\"Postal/Zip Code\",true]]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"ui three column grid\"],[9,\"id\",\"grid\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n                  \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectCountry\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"true\"],[7],[0,\"\\n                    \"],[6,\"option\"],[9,\"selected\",\"selected\"],[7],[0,\"\\n                      Select Country\\n                    \"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"                      \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"country\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n                        \"],[1,[19,1,[\"name\"]],false],[0,\"\\n                      \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"                  \"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"world\",\"text\",[20,[\"province\"]],\"Province/State\",true]]],false],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"column \"],[9,\"style\",\"margin: 1em 0;\"],[7],[0,\"\\n                \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"world\",\"text\",[20,[\"city\"]],\"City\",true]]],false],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[0,\"By creating an account you agree to our \"],[6,\"a\"],[9,\"style\",\"color: blue; cursor: pointer; text-decoration: underline;\"],[7],[0,\"Terms & Privacy.\"],[8],[8],[0,\"\\n              \"],[6,\"br\"],[7],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"ui centered grid\"],[7],[0,\"\\n                \"],[6,\"button\"],[9,\"class\",\"ui blue button\"],[9,\"style\",\"height: 50px;\"],[9,\"value\",\"Submit\"],[7],[0,\"Submit\"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n          \"],[8],[0,\"\\n\"],[0,\"\\n\"],[0,\"\\n        \"],[2,\"</div>\"],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/user-info.hbs" } });
});
define("self-start-front-end/templates/components/user-login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Z5hxyboC", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n\"],[6,\"a\"],[9,\"id\",\"login\"],[9,\"class\",\"item\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"Log in\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"login\",\"login\"]],{\"statements\":[[0,\"  \"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n  \"],[6,\"h2\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Login\"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"id\",\"ui container\"],[9,\"style\",\"height: 250px; padding-left:5%; padding-right: 5%; padding-top: 2%\"],[7],[0,\"\\n  \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Email\"]],\"Email\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Password\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"password\",[20,[\"PWord\"]],\"Password\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"inline\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui blue button \"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Login\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/user-login.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "cn6ZO3Px", "block": "{\"symbols\":[\"phsio\"],\"statements\":[[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[9,\"style\",\"padding-right: 10em; padding-left: 10em\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Change Appointment Schedule\"],[8],[0,\"\\n\\n      \"],[2,\"this should be gone after token implementation\"],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"value\",[18,\"selectphysio\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateValue\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n          \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"getphysio\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,1,[\"id\"]],null],[7],[0,\"\\n              \"],[1,[19,1,[\"givenName\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[1,[25,\"as-calendar\",null,[[\"title\",\"occurrences\",\"defaultTimeZoneQuery\",\"dayStartingTime\",\"dayEndingTime\",\"timeSlotDuration\",\"onAddOccurrence\",\"onUpdateOccurrence\",\"onRemoveOccurrence\"],[\"View Schedule\",[20,[\"occurrences\"]],\"Toronto|New York\",\"8:00\",\"20:00\",\"00:30\",[25,\"action\",[[19,0,[]],\"calendarAddOccurrence\"],null],[25,\"action\",[[19,0,[]],\"calendarUpdateOccurrence\"],null],[25,\"action\",[[19,0,[]],\"calendarRemoveOccurrence\"],null]]]],false],[0,\"\\n\\n\\n  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"save\"]],[7],[0,\"\\n    Save\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"viewschedule\"]],[7],[0,\"\\n    View schedule (physio)\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/view-schedule.hbs" } });
});
define("self-start-front-end/templates/components/welcome-page", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "oPf6WgOJ", "block": "{\"symbols\":[],\"statements\":[[2,\"&lt;!&ndash; PRELOADER &ndash;&gt;\"],[0,\"\\n\"],[2,\"<div id=\\\"preloader\\\"><div><em></em><em></em><em></em><em></em></div></div>\"],[0,\"\\n\"],[2,\"&lt;!&ndash; //PRELOADER &ndash;&gt;\"],[0,\"\\n\"],[4,\"nav-bar\",null,null,{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg1\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"library\"],[7],[0,\"Self Start\"],[8],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"tagline\"],[7],[0,\"\\n            Guiding your health and well–being\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui hidden divider\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui center aligned grid\"],[7],[0,\"\\n\\n          \"],[2,\"<a href=\\\"/appointment\\\"  class=\\\"ui large inverted download button\\\" >\"],[0,\"\\n            \"],[2,\"Book Appointment\"],[0,\"\\n          \"],[2,\"</a>\"],[0,\"\\n          \"],[6,\"a\"],[9,\"href\",\"/register\"],[9,\"class\",\"ui large inverted download button\"],[7],[0,\"\\n            Register\\n          \"],[8],[0,\"\\n          \"],[6,\"a\"],[9,\"href\",\"/#\"],[9,\"class\",\"ui large inverted basic button\"],[7],[0,\"Ask a Physio\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui vertical stripe intro segment\"],[9,\"id\",\"about\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui stackable very relaxed stacked aligned grid container\"],[7],[0,\"\\n      \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 4em;position: relative;left: 30px;\"],[7],[0,\"About Us\"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n          \"],[6,\"img\"],[9,\"class\",\"ui image\"],[9,\"src\",\"assets/images/home/Steph-4491-1200x1800.jpg\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"twelve wide column\"],[7],[0,\"\\n          \"],[6,\"br\"],[7],[8],[0,\"\\n          \"],[6,\"h1\"],[9,\"class\",\"ui header\"],[7],[0,\"Stephanie Marcotte\"],[8],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"color: grey;font-size: 1.4em;margin-top: -15px;\"],[7],[0,\"\\n           Practitioner\\n          \"],[8],[0,\"\\n          \"],[6,\"p\"],[7],[0,\"I believe movement is life.\"],[6,\"br\"],[7],[8],[0,\"\\n            I believe you can heal your body with functional movement patterns.\"],[6,\"br\"],[7],[8],[0,\"\\n            I believe it is never to late to create change in a body & it can happen fast.\"],[6,\"br\"],[7],[8],[0,\"\\n            I believe your body knows what it needs.\"],[6,\"br\"],[7],[8],[0,\"\\n            I believe every system in your body relies on a functional musculoskeletal system.\\n            \"],[2,\"All systems in the body work on movement:<br><br>\"],[0,\"\\n          \"],[2,\"<ul>\"],[0,\"\\n            \"],[2,\"<li>the heart beats</li>\"],[0,\"\\n            \"],[2,\"<li>the lungs breath</li>\"],[0,\"\\n            \"],[2,\"<li>the stomach grinds</li>\"],[0,\"\\n            \"],[2,\"<li>the colon transports</li>\"],[0,\"\\n            \"],[2,\"<li>the blood flows</li>\"],[0,\"\\n            \"],[2,\"<li>the nerves conduct</li>\"],[0,\"\\n            \"],[2,\"<li>the muscles contract</li>\"],[0,\"\\n          \"],[2,\"</ul><br>\"],[0,\"\\n          \"],[2,\"Dis-ease in the body begins when movement is impaired. Restore your proper design for movement and your pain will cease. No fancy machinery or magic pills required; your body already has everything it needs to heal.<br><br>\"],[0,\"\\n          \"],[2,\"I believe you need to trust yourself.<br>\"],[0,\"\\n          \"],[2,\"I believe you need to take responsibility for your present state of health.<br>\"],[0,\"\\n          \"],[2,\"I believe you can become free of your pain.\"],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[2,\"<div class=\\\"stackable very relaxed ui grid container\\\">\"],[0,\"\\n    \"],[2,\"</div>\"],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"feature alternate ui stripe vertical segment\"],[7],[0,\"\\n\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/welcome-page.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "RSpnxkLD", "block": "{\"symbols\":[\"Exercise\"],\"statements\":[[6,\"div\"],[9,\"id\",\"content\"],[7],[0,\"\\n  \"],[1,[25,\"add-exercises\",null,[[\"Images\"],[[20,[\"model\",\"image\"]]]]],false],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"table\"],[9,\"class\",\"ui single line table\"],[7],[0,\"\\n\\n    \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Exercise Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Description\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"exercise\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,1,[\"description\"]],false],[8],[0,\"\\n        \"],[6,\"td\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"four wide column right aligned\"],[7],[0,\"\\n            \"],[1,[25,\"edit-exercises\",null,[[\"ID\",\"images\"],[[19,1,[\"id\"]],[19,1,[\"images\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"four wide column left aligned\"],[7],[0,\"\\n            \"],[1,[25,\"delete-exercises\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/exercise.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "+Wf2Q54B", "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/forms.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "j3MaXjSb", "block": "{\"symbols\":[\"Image\"],\"statements\":[[6,\"div\"],[9,\"id\",\"content\"],[7],[0,\"\\n  \"],[1,[18,\"add-image\"],false],[0,\"'\\n\\n  \"],[6,\"table\"],[9,\"class\",\"ui single line table\"],[7],[0,\"\\n    \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Image Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Image\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Delete\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\",\"image\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"td\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n        \"],[6,\"td\"],[7],[0,\"\\n          \"],[6,\"img\"],[9,\"class\",\"ui small image\"],[10,\"src\",[26,[[19,1,[\"imageData\"]]]]],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"td\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"four wide column right aligned\"],[7],[0,\"\\n            \"],[1,[25,\"delete-image\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"],[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/images.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "r6mpjdPr", "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/new-rehabplans.hbs" } });
});
define("self-start-front-end/templates/patient-file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "HVZ+0QUh", "block": "{\"symbols\":[],\"statements\":[[4,\"admin-nav\",null,null,{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n        \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Client File\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui secondary menu\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"header item\"],[7],[0,\"Brand\"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"class\",\"active item\"],[7],[0,\"\\n      Home\\n    \"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"\\n      Messages\\n    \"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"\\n      Friends\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"right menu\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"text\"],[9,\"placeholder\",\"Search...\"],[7],[8],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"search link icon\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"a\"],[9,\"class\",\"ui item\"],[7],[0,\"\\n        Logout\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui divider\"],[7],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui secondary vertical pointing fluid menu\"],[7],[0,\"\\n        \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"\\n          Home\\n        \"],[8],[0,\"\\n        \"],[6,\"a\"],[9,\"class\",\"item\"],[7],[0,\"\\n          Messages\\n        \"],[8],[0,\"\\n        \"],[6,\"a\"],[9,\"class\",\"item active\"],[7],[0,\"\\n          Friends\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"twelve wide column\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"input\"],[9,\"type\",\"text\"],[9,\"name\",\"first-name\"],[9,\"placeholder\",\"First name\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"textarea\"],[9,\"placeholder\",\"Some example text...\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/patient-file.hbs" } });
});
define("self-start-front-end/templates/patients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5zesIcjy", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"manage-patients\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/patients.hbs" } });
});
define("self-start-front-end/templates/physiotherapists", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1FT7h3uN", "block": "{\"symbols\":[\"physiotherapest\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Physiotherapists\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"givenName\"]],false],[0,\" \"],[1,[19,1,[\"familyName\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-physiotherapist\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%; cursor: pointer;\"],[9,\"title\",\"Edit\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"update-physiotherapist\",[19,1,[\"id\"]]],null,{\"statements\":[[0,\"                \"],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[8],[0,\"\\n\\n\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"id\",\"add\"],[9,\"class\",\"container\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"new-physiotherapist\"],null,{\"statements\":[[0,\"    \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"plus icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/physiotherapists.hbs" } });
});
define("self-start-front-end/templates/practitioner", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Av/WC81o", "block": "{\"symbols\":[],\"statements\":[[4,\"physio-nav\",null,null,{\"statements\":[[0,\"  \"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/practitioner.hbs" } });
});
define("self-start-front-end/templates/practitioner/appointment", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ayEt7FHO", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Appointments\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[18,\"book-appointment\"],false],[0,\"\\n\\n\"],[1,[18,\"view-schedule\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/practitioner/appointment.hbs" } });
});
define("self-start-front-end/templates/practitioner/assessment-display", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UUmMYCrv", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Assessment Display\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[25,\"display-assessment\",null,[[\"assessID\"],[[20,[\"id\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/practitioner/assessment-display.hbs" } });
});
define("self-start-front-end/templates/practitioner/client-file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MB3dkWvc", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"client-file\",null,[[\"model\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/practitioner/client-file.hbs" } });
});
define("self-start-front-end/templates/practitioner/clients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2i2sZ7nA", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"manage-patients\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/practitioner/clients.hbs" } });
});
define("self-start-front-end/templates/practitioner/new-rehabplans", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BSfWCIIU", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Add Plan\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[18,\"add-rehabplan\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/practitioner/new-rehabplans.hbs" } });
});
define("self-start-front-end/templates/practitioner/physio-welcome", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lJWVYL2U", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"physio-welcome\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/practitioner/physio-welcome.hbs" } });
});
define("self-start-front-end/templates/practitioner/rehabplans", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bpW62CfR", "block": "{\"symbols\":[\"assessmentTest\",\"Rehabplan\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[9,\"href\",\"/assets/css/table-style.css\"],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"masthead segment bg2\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"introduction\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"ui inverted header\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"library\"],[9,\"style\",\"font-size: 1.25em\"],[7],[0,\"Menu Builder\"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"id\",\"content\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui search\"],[9,\"style\",\"margin-left: 70%\"],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"input\"],[9,\"class\",\"prompt\"],[9,\"type\",\"text\"],[9,\"placeholder\",\"Search Rehabilitation plan\"],[7],[8],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n    \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n        \"],[6,\"ul\"],[7],[0,\"\\n          \"],[6,\"li\"],[9,\"style\",\"text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Rehabilitation Plan\"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"model\",\"rehabPlan\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"li\"],[7],[0,\"\\n              \"],[1,[19,2,[\"planName\"]],false],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right;  padding-top: .5%;\"],[7],[1,[25,\"delete-rehabplan\",null,[[\"ID\"],[[19,2,[\"id\"]]]]],false],[8],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;  padding-top: .5%;\"],[7],[1,[25,\"edit-rehabplan\",null,[[\"ID\"],[[19,2,[\"id\"]]]]],false],[8],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 30%; \"],[7],[1,[19,2,[\"description\"]],false],[0,\" \"],[8],[0,\"\\n            \"],[8],[0,\"\\n            \"],[1,[25,\"list-forms\",null,[[\"ID\",\"plan\"],[[19,2,[\"id\"]],[19,2,[]]]]],false],[0,\"\\n\\n\"]],\"parameters\":[2]},null],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"model\",\"assessmentTest\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"id\",\"assessmentTest\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"practitioner.assessment-display\",[25,\"query-params\",null,[[\"id\"],[[19,1,[\"id\"]]]]]],null,{\"statements\":[[0,\"        \"],[6,\"button\"],[9,\"class\",\"ui button\"],[7],[0,\"View Assessment Test\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\\n\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"id\",\"add\"],[9,\"class\",\"container\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"practitioner.new-rehabplans\"],null,{\"statements\":[[0,\"    \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"plus icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/practitioner/rehabplans.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "KWzRCN/+", "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/questions.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "UAlA6dsf", "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/rehabplans.hbs" } });
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
  require("self-start-front-end/app")["default"].create({"name":"self-start-front-end","version":"0.0.0+5669efeb"});
}
//# sourceMappingURL=self-start-front-end.map
