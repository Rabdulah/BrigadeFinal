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
          detachable: false,

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
define('self-start-front-end/components/add-exercises', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    // didRender() {

    //     this._super(...arguments);
    //     let newObj = this.get('Objective');
    //     this.get('obj').push(newObj);
    // },

    isEditing: false,
    routing: Ember.inject.service('-routing'),

    obj: [],

    actionStep: [],

    modalName: Ember.computed(function () {
      return 'delete-exercises' + this.get('ID');
    }),

    actions: {
      openModal: function openModal() {
        console.log("adsdasdkjasdjakjsdkajsdkajd");
        // Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        Ember.$('.ui').modal({
          closable: false,
          detachable: false,
          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
            //   this.get('DS').find('exercise' , this.get('ID')).then((exercise)=>{
            //       exercise.destroyRecord().then(() =>{
            //       return true;
            //   });
            //   })
            return true;
          }
        }).modal('show');
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
        this.get('routing').transitionTo('exercise');
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
          targetDate: this.get('TargetDate')
          //rehabilitationPlan:this.get('rehabPlan'),
        });

        exercise.save().then(function () {

          _this.get('routing').transitionTo('exercise');
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
          detachable: false,

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

        var patient = this.get('DS').createRecord('patient', {
          familyName: self.get('familyName'),
          givenName: self.get('givenName'),
          email: self.get('email'),
          streetName: self.get('streetName'),
          streetNumber: self.get('streetNumber'),
          apartment: self.get('apartment'),
          country: self.get('country'),
          provinces: self.get('provinces'),
          cities: self.get('cities'),
          dateOfBirth: self.get('selectedDate'),
          healthCardNumber: self.get('healthCardNumber'),
          occupation: self.get('occupation'),
          gender: self.get('gender'),
          maritalStatus: self.get('maritalStatus'),
          phoneNumber: self.get('phoneNumber'),
          postalCode: self.get('postalCode')

        });
        patient.save().then(function () {
          _this.get('routing').transitionTo('patients');
        });

        this.set('familyName', '');
        this.set('givenName', '');
        this.set('email', '');
        this.set('streetName', '');
        this.set('streetNumber', '');
        this.set('apartment', '');
        this.set('country', '');
        this.set('provinces', '');
        this.set('cities', '');
        this.set('healthCardNumber', '');
        this.set('gender', '');
        this.set('maritalStatus', '');
        this.set('dateOfBirth', '');
        this.set('occupation', '');
        this.set('phoneNumber', '');
        this.set('postalCode', '');
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
          optionString: optStr
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

    init: function init() {
      this._super();
      // const rehabplantemp = this.get('DS').createRecord('rehabilitationplan');
      // rehabplantemp.save();
      // console.log(rehabplantemp);
    },

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
define('self-start-front-end/components/add-status', ['exports'], function (exports) {
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

        Ember.$('.ui.small.newStatus.modal').modal({
          closable: false,
          detachable: false,

          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {

            var newStatus = _this.get('DS').createRecord('maritalStatus', {
              name: _this.get('name')
            });
            newStatus.save().then(function () {
              return true;
            });
          }
        }).modal('show');
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

    didRender: function didRender() {
      this._super.apply(this, arguments);
      Ember.$(document).ready(function ($) {
        var is_bouncy_nav_animating = false;
        //open bouncy navigation
        $('.cd-bouncy-nav-trigger').on('click', function () {
          triggerBouncyNav(true);
        });
        //close bouncy navigation
        $('.cd-bouncy-nav-modal .cd-close').on('click', function () {
          triggerBouncyNav(false);
        });
        $('.cd-bouncy-nav-modal').on('click', function (event) {
          if ($(event.target).is('.cd-bouncy-nav-modal')) {
            triggerBouncyNav(false);
          }
        });

        function triggerBouncyNav($bool) {
          //check if no nav animation is ongoing
          if (!is_bouncy_nav_animating) {
            is_bouncy_nav_animating = true;

            //toggle list items animation
            $('.cd-bouncy-nav-modal').toggleClass('fade-in', $bool).toggleClass('fade-out', !$bool).find('li:last-child').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
              $('.cd-bouncy-nav-modal').toggleClass('is-visible', $bool);
              if (!$bool) $('.cd-bouncy-nav-modal').removeClass('fade-out');
              is_bouncy_nav_animating = false;
            });

            //check if CSS animations are supported...
            if ($('.cd-bouncy-nav-trigger').parents('.no-csstransitions').length > 0) {
              $('.cd-bouncy-nav-modal').toggleClass('is-visible', $bool);
              is_bouncy_nav_animating = false;
            }
          }
        }
      });
    }
  });
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
define('self-start-front-end/components/book-appointment', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    routing: Ember.inject.service('-routing'),
    isEditing: false,

    getphysio: Ember.computed(function () {
      return this.get('DS').findAll('physiotherapist');
    }),

    actions: {
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
        this.set('selectphysio', physio);
      },
      assignDate: function assignDate(date) {
        this.set('selectedDate', date);
      },
      cancel: function cancel() {
        return true;
      },


      save: function save() {
        var self = this;
        //temp client until we get token
        var client = '5a80e1663ddc7324643209cd';
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
              self.get('DS').findRecord('physiotherapist', physio).then(function (a) {
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
          detachable: false,
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
      return 'Delete-exercise' + this.get('ID');
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
          detachable: false,
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

    modalName: Ember.computed(function () {
      return 'Delete-patient' + this.get('ID');
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

            _this.get('DS').find('patient', _this.get('ID')).then(function (patient) {
              patient.set('name', '');
              patient.save().then(function () {
                patient.destroyRecord();
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
          detachable: false,

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
define('self-start-front-end/components/edit-exercises', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),

    exerciseData: null,

    // obj: [],

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

    modalName: Ember.computed(function () {
      return 'editExercise' + this.get('ID');
    }),

    actions: _defineProperty({
      openModal: function openModal() {
        var _this = this;

        this.set('exerciseData', this.get('DS').peekRecord('exercise', this.get('ID')));

        Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
          closable: false,
          transition: 'horizontal flip',
          detachable: false,
          onDeny: function onDeny() {
            return true;
          },

          onApprove: function onApprove() {
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
      }
    }, 'openModal', function openModal() {
      var _this2 = this;

      this.set('exerciseData', this.get('DS').peekRecord('exercise', this.get('ID')));

      Ember.$('.ui.' + this.get('modalName') + '.modal').modal({
        closable: false,
        transition: 'horizontal flip',
        detachable: false,
        onDeny: function onDeny() {
          return true;
        },

        onApprove: function onApprove() {
          _this2.get('DS').findRecord('exercise', _this2.get('ID')).then(function (rec) {
            rec.set('name', _this2.get('Name'));
            rec.set('description', _this2.get('Description'));
            rec.set('authorName', _this2.get('AuthName'));
            rec.set('objective', _this2.get('Objective'));
            rec.set('actionStep', _this2.get('ActionSteps'));
            rec.set('location', _this2.get('Location'));
            rec.set('frequency', _this2.get('Frequency'));
            rec.set('duration', _this2.get('Duration'));
            rec.set('targetDate', _this2.get('TargetDate'));
            rec.set('MMURL', _this2.get('MMURL'));
            // rec.set('exercises', this.get('exercises'));
            // rec.set('assessmentTests', this.get('assessmentTests'));
            rec.save().then(function () {
              return true;
            });
          });
        }
      }).modal('show');
    })
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
          detachable: false,

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
    pateintsData: null,
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
      return 'editPatient' + this.get('ID');
    }),

    actions: {
      assignDate: function assignDate(date) {
        this.set('selectedDate', date);
      },


      save: function save() {
        var _this = this;

        this.get('DS').findRecord('patient', this.get('pateintsData').id).then(function (rec) {
          rec.set('familyName', _this.get('pateintsData.familyName'));
          rec.set('givenName', _this.get('pateintsData.givenName'));
          rec.set('email', _this.get('pateintsData.email'));
          rec.set('streetName', _this.get('pateintsData.streetName'));
          rec.set('streetNumber', _this.get('pateintsData.streetNumber'));
          rec.set('apartment', _this.get('pateintsData.apartment'));
          rec.set('country', _this.get('country'));
          rec.set('provinces', _this.get('provinces'));
          rec.set('cities', _this.get('cities'));
          rec.set('healthCardNumber', _this.get('pateintsData.healthCardNumber'));
          rec.set('gender', _this.get('gender'));
          rec.set('maritalStatus', _this.get('maritalStatus'));
          rec.set('dateOfBirth', _this.get('selectedDate'));
          rec.set('occupation', _this.get('pateintsData.occupation'));
          rec.set('phoneNumber', _this.get('pateintsData.phoneNumber'));
          rec.set('postalCode', _this.get('pateintsData.postalCode'));

          rec.save().then(function () {
            _this.get('routing').transitionTo('patients');
          });
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
    routing: Ember.inject.service('-routing'),
    rehabilitationplansData: null,
    tagName: '',

    modalName: Ember.computed(function () {
      return 'editRehabilitationplan' + this.get('ID');
    }),

    actions: {
      save: function save() {
        var _this = this;

        this.get('DS').findRecord('rehabilitationplan', this.get('rehabilitationplansData').id).then(function (rec) {
          rec.set('planName', _this.get('rehabilitationplansData.planName'));
          rec.set('description', _this.get('rehabilitationplansData.description'));
          rec.set('physioID', _this.get('rehabilitationplansData.physioID'));
          rec.set('goal', _this.get('rehabilitationplansData.goal'));
          rec.set('timeToComplete', _this.get('rehabilitationplansData.timeToComplete'));
          2;

          rec.save().then(function () {
            _this.get('routing').transitionTo('rehabplans');
          });
        });
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
define('self-start-front-end/components/get-exercises', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    init: function init() {
      this._super();
      // let a = this.get('DS').find('rehabilitationplan', this.get('ID'));
      // console.log(a);
    },

    DS: Ember.inject.service('store'),

    modalName: Ember.computed(function () {
      return 'get-exercises' + this.get('ID');
    }),
    exerciseModel: Ember.computed(function () {
      return this.get('DS').findAll('exercise');
    }),

    edit: false,

    actions: {
      addExercise: function addExercise(oneExercise, eid) {
        console.log(eid);
        this.get('DS').findRecord('rehabilitationplan', this.get('ID')).then(function (a) {
          a.get('exercises').pushObject(oneExercise);
          oneExercise.get('rehabilitationplan').pushObject(a);
          a.save().then(function () {});
        });

        this.get('DS').findRecord('exercise', eid).then(function (rec) {
          console.log("find record");
          rec.save().then(function () {});
        });
      },
      manageExercise: function manageExercise() {
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
    init: function init() {
      this._super();
      //let a = this.get('DS').find('form', this.get('ID'));
      //console.log(a.get('name'));
    },

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
    tagName: '',
    didRender: function didRender() {
      this._super.apply(this, arguments);

      Ember.$(document).ready(function ($) {
        //open-close submenu on mobile
        $('.cd-main-nav').on('click', function (event) {
          if ($(event.target).is('.cd-main-nav')) $(this).children('ul').toggleClass('is-visible');
        });
      });
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
define('self-start-front-end/components/rehab-exercise', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    DS: Ember.inject.service('store'),
    actions: {
      removeExercise: function removeExercise(exercise, rehabplan, eid, rid) {

        console.log(exercise.id);
        console.log(rehabplan.id);

        rehabplan.get('exercises').removeObject(exercise);
        exercise.get('rehabilitationplan').removeObject(rehabplan);

        this.get('DS').findRecord('rehabilitationplan', rid).then(function (rec) {

          rec.save().then(function () {});
        });

        this.get('DS').findRecord('exercise', eid).then(function (rec) {
          rec.save().then(function () {});
        });
      }
    }
  });
});
define('self-start-front-end/components/rehabplan-actions-table', ['exports', 'mixins/table-common'], function (exports, _tableCommon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_tableCommon.default, {
    columns: Ember.computed(function () {
      return [{
        label: 'First Name',
        valuePath: 'planName',
        width: '150px'
      }, {
        label: 'Last Name',
        valuePath: 'description',
        width: '150px'
      }, {
        label: 'Address',
        valuePath: 'physioID'
      }, {
        label: 'Actions',
        width: '100px',
        sortable: false,
        cellComponent: 'user-actions'
      }];
    }),

    actions: {
      deleteUser: function deleteUser(row) {
        var confirmed = window.confirm('Are you sure you want to delete ' + row.get('firstName') + ' ' + row.get('lastName') + '?');

        if (confirmed) {
          this.get('table').removeRow(row);
          row.get('content').deleteRecord();
        }
      },
      notifyUser: function notifyUser(row) {
        window.alert(row.get('firstName') + ' ' + row.get('lastName') + ' has been notified.');
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
        actions: {
            removeQuestion: function removeQuestion(q, f, qid, fid) {
                f.get('questions').removeObject(q);
                q.get('forms').removeObject(f);

                this.get('DS').findRecord('form', this.get('fid')).then(function (rec) {
                    rec.save().then(function () {});
                });

                this.get('DS').findRecord('question', this.get('qid')).then(function (rec) {
                    rec.save().then(function () {});
                });
            }
        }
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
        this.set('selectedphysio', this.get('DS').peekRecord('physiotherapist', physio));
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
    appointments_filter: null,
    isEditing: false,

    getphysio: Ember.computed(function () {
      return this.get('DS').findAll('physiotherapist');
    }),

    // selectedphysio: computed(function () {
    //   return this.get('selectedphysio').then(function (physio){
    //     physio.get('appointments').filter(function(item){
    //       let schedule  = item.get('date');
    //       let cur_time = new Date();
    //       console.log(cur_time);
    //       return schedule > cur_time;
    //     });
    //   });
    //
    // }),


    actions: {
      viewschedule: function viewschedule() {
        this.set('isEditing', true);
      },
      updateValue: function updateValue(physio) {
        this.set('selectedphysio', this.get('DS').peekRecord('physiotherapist', physio));
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
define('self-start-front-end/helpers/is-after', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/is-after'], function (exports, _environment, _isAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isAfter.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
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
define('self-start-front-end/helpers/is-before', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/is-before'], function (exports, _environment, _isBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isBefore.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/is-between', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/is-between'], function (exports, _environment, _isBetween) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isBetween.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('self-start-front-end/helpers/is-same-or-after', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/is-same-or-after'], function (exports, _environment, _isSameOrAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isSameOrAfter.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/is-same-or-before', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/is-same-or-before'], function (exports, _environment, _isSameOrBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isSameOrBefore.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/is-same', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/is-same'], function (exports, _environment, _isSame) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isSame.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
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
define('self-start-front-end/helpers/moment-add', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/moment-add'], function (exports, _environment, _momentAdd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentAdd.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/moment-calendar', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _environment, _momentCalendar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentCalendar.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
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
define('self-start-front-end/helpers/moment-format', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _environment, _momentFormat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentFormat.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/moment-from-now', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _environment, _momentFromNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentFromNow.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/moment-from', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/moment-from'], function (exports, _environment, _momentFrom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentFrom.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/moment-subtract', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/moment-subtract'], function (exports, _environment, _momentSubtract) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentSubtract.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/moment-to-date', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/moment-to-date'], function (exports, _environment, _momentToDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentToDate.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/moment-to-now', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _environment, _momentToNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentToNow.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
  });
});
define('self-start-front-end/helpers/moment-to', ['exports', 'self-start-front-end/config/environment', 'ember-moment/helpers/moment-to'], function (exports, _environment, _momentTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentTo.default.extend({
    globalAllowEmpty: !!Ember.get(_environment.default, 'moment.allowEmpty')
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
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function () {
      return _unix.unix;
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
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function () {
      return _unix.unix;
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
    image: _emberData.default.hasMany('image', { async: true }),
    // rehabilitationPlan:DS.belongsTo('rehabilitationplan',{ async: true })
    rehabilitationplan: _emberData.default.hasMany('rehabilitationplan')
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
    imageData: _emberData.default.attr()
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
    provinces: _emberData.default.attr(),
    cities: _emberData.default.attr(),
    dateOfBirth: _emberData.default.attr(),
    healthCardNumber: _emberData.default.attr(),
    occupation: _emberData.default.attr(),
    maritalStatus: _emberData.default.attr(),
    gender: _emberData.default.attr(),
    phoneNumber: _emberData.default.attr(),
    postalCode: _emberData.default.attr(),
    appointments: _emberData.default.hasMany('appointment', { async: true })

  });
});
define('self-start-front-end/models/physiotherapist', ['exports', 'ember-data'], function (exports, _emberData) {
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
    dateFinished: _emberData.default.attr(),

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

    this.route('country');
    this.route('province');
    this.route('manage-selections');
    this.route('gender');
    this.route('city');
    this.route('marital-status');

    this.route('update-patient', { path: 'patient/:patient_id' });
    this.route('new-patient');
    this.route('new-rehabplans');
    this.route('exercise');
    this.route('new-exercise');
    this.route('edit-rehablinker', { path: 'rehabilitationplan/:rehabilitationplan_id' });
    this.route('appointment');
    this.route('physiotherapist');
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
define('self-start-front-end/routes/country', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('country');
    }
  });
});
define('self-start-front-end/routes/edit-rehablinker', ['exports'], function (exports) {
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
define('self-start-front-end/routes/forms', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function model() {
            return Ember.RSVP.hash({
                form: this.store.findAll('form'),
                question: this.store.findAll('question'),
                questionOrder: this.store.findAll('question-order')
            });
        },
        afterModel: function afterModel() {
            this.store.findAll('question');
        }
    });
});
define('self-start-front-end/routes/gender', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('gender');
    }
  });
});
define('self-start-front-end/routes/home', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/manage-selections', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/marital-status', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('maritalStatus');
    }
  });
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
  exports.default = Ember.Route.extend({});
});
define('self-start-front-end/routes/new-rehabplans', ['exports'], function (exports) {
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
  }
  // model() {
  //   return RSVP.hash({
  //     appointments: this.store.findAll('appointment'),
  //     patient : this.store.findAll('patient'),
  //   });
  // },
  );
});
define('self-start-front-end/routes/physiotherapist', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return Ember.RSVP.hash({
        appointments: this.store.findAll('appointment'),
        physiotherapist: this.store.findAll('physiotherapist')
      });
    }
  }

  // afterModel(){
  //   return this.store.findAll('physiotherapist');
  // }
  );
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
define('self-start-front-end/services/media', ['exports', 'ember-responsive/media'], function (exports, _media) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _media.default;
});
define('self-start-front-end/services/moment', ['exports', 'self-start-front-end/config/environment', 'ember-moment/services/moment'], function (exports, _environment, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _moment.default.extend({
    defaultFormat: Ember.get(_environment.default, 'moment.outputFormat')
  });
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
define("self-start-front-end/templates/admin", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "f4M7X32U", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"id\",\"content\"],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[4,\"ui-accordion\",null,null,{\"statements\":[[0,\"    \"],[6,\"tbody\"],[7],[0,\"\\n        \"],[6,\"a\"],[9,\"class\",\"ui primary basic button\"],[7],[4,\"link-to\",[\"questions\"],null,{\"statements\":[[0,\"Manage Questions\"]],\"parameters\":[]},null],[8],[0,\"\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"a\"],[9,\"class\",\"ui primary basic button\"],[7],[4,\"link-to\",[\"forms\"],null,{\"statements\":[[0,\"Manage Forms\"]],\"parameters\":[]},null],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[8],[0,\"  \"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/admin.hbs" } });
});
define("self-start-front-end/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zCUF1jJy", "block": "{\"symbols\":[],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/reset.css\"]]],[7],[8],[0,\" \"],[2,\" CSS reset \"],[0,\"\\n\\n\"],[4,\"nav-bar\",null,null,{\"statements\":[[0,\"\\n    \"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/application.hbs" } });
});
define("self-start-front-end/templates/appointment", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "N44SovwD", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"book-appointment\"],false],[0,\"\\n\\n\"],[1,[18,\"view-schedule\"],false],[0,\"\\n\\n\"],[1,[18,\"view-appointment\"],false],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/appointment.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "1i+hmhKB", "block": "{\"symbols\":[\"aS\",\"o\"],\"statements\":[[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n  \"],[6,\"h2\"],[9,\"id\",\"exercise\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Add New Exercise\"],[8],[0,\"\\n\\n  \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Exercise Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Name\"]],\"Exercise Name\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Description\"],[8],[0,\"\\n      \"],[1,[25,\"textarea\",null,[[\"value\",\"cols\",\"rows\",\"placeholder\"],[[20,[\"Description\"]],\"80\",\"6\",\"Description\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Author Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"AuthName\"]],\"Author Name\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\\n      \"],[6,\"label\"],[7],[0,\"Objectives\"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Objective\"]],\"Objective\"]]],false],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addObjective\"]],[7],[0,\"\\n          Add Objective\\n          \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Current Objectives\"],[8],[0,\"\\n        \"],[6,\"ul\"],[9,\"align\",\"left\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"obj\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[0,\"\\n                \"],[1,[19,2,[]],false],[0,\"\\n                \"],[6,\"br\"],[7],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Action Steps\"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"ActionSteps\"]],\"Action Steps\"]]],false],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addActionStep\"]],[7],[0,\"\\n          Add Action Step\\n          \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Current Action Steps\"],[8],[0,\"\\n        \"],[6,\"ol\"],[9,\"align\",\"left\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"actionStep\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[0,\"\\n                \"],[1,[19,1,[]],false],[0,\"\\n                \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Location\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Location\"]],\"Location\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Frequency\"],[8],[0,\"\\n\"],[0,\"      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Frequency\"]],\"Frequency\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Duration\"],[8],[0,\"\\n\"],[0,\"      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Duration\"]],\"Duration\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Target Date\"],[8],[0,\"\\n\"],[0,\"      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"TargetDate\"]],\"Target Date\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[6,\"label\"],[7],[0,\"Multimedia URL\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"MMURL\"]],\"Multi Media URL\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n      \"],[1,[18,\"simple-example\"],false],[0,\"\\n      \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"inline\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui button\"],[9,\"type\",\"submit\"],[3,\"action\",[[19,0,[]],\"submit\"]],[7],[0,\"Submit\"],[8],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"ui button\"],[9,\"type\",\"submit\"],[3,\"action\",[[19,0,[]],\"cancel\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\" warning sign icon\"],[7],[8],[0,\"\\n    Please Confirm\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you want to delete this comment?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui red cancel inverted button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n      No\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui green ok inverted button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n      Yes\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-exercises.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "KDkxesgu", "block": "{\"symbols\":[\"oneCountry\",\"oneStatus\",\"oneGender\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date of Birth\"],[8],[0,\"\\n      \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"gender\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,3,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"gender\",\"name\"]],[19,3,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,3,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Marital Status\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"maritalStatus\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"maritalStatusModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"maritalStatus\",\"name\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,2,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Occupation\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"company\",\"text\",[20,[\"occupation\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Health Card Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"card\",\"text\",[20,[\"healthCardNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Street Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Unit\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"bookmark\",\"text\",[20,[\"apartment\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Postal/ZIP Code\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"flag\",\"text\",[20,[\"postalCode\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Country\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"country\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"country\",\"name\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"phoneNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-patient.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "BIs3r3DM", "block": "{\"symbols\":[\"o\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Rehabilitation Plan\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"star\",\"text\",[20,[\"Name\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Author\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"authorName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-textarea\"],[7],[0,\"Description\"],[8],[0,\"\\n      \"],[1,[25,\"textarea\",null,[[\"class\",\"name\",\"value\",\"required\"],[\"message\",\"cd-textarea\",[20,[\"description\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Goal\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"award\",\"text\",[20,[\"goal\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Time\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"video\",\"text\",[20,[\"timeToComplete\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Exercises\"],[8],[0,\"\\n      \"],[1,[18,\"get-exercises\"],false],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Current Exercises\"],[8],[0,\"\\n        \"],[6,\"ul\"],[9,\"align\",\"left\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"obj\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[0,\"\\n                \"],[1,[19,1,[]],false],[0,\"\\n                \"],[6,\"br\"],[7],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-rehabplan.hbs" } });
});
define("self-start-front-end/templates/components/add-status", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u7T6jaFU", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"cd-button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Add Status\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newStatus\",\"small newStatus\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new Status\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Status Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add status\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-status.hbs" } });
});
define("self-start-front-end/templates/components/admin-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cSid61bF", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1],[0,\"\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/nav-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"cd-bouncy-nav-modal\"],[7],[0,\"\\n\\n  \"],[6,\"nav\"],[7],[0,\"\\n    \"],[6,\"ul\"],[9,\"class\",\"cd-bouncy-nav\"],[7],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"id\",\"patient\"],[7],[4,\"link-to\",[\"patients\"],null,{\"statements\":[[0,\"Patient Info\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"id\",\"country\"],[7],[4,\"link-to\",[\"manage-selections\"],null,{\"statements\":[[0,\"Configure form\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"id\",\"plan\"],[7],[4,\"link-to\",[\"rehabplans\"],null,{\"statements\":[[0,\"Rehabilitation Plans\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"id\",\"questions\"],[7],[4,\"link-to\",[\"questions\"],null,{\"statements\":[[0,\"Questions\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"id\",\"forms\"],[7],[4,\"link-to\",[\"forms\"],null,{\"statements\":[[0,\"Forms\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"id\",\"exercise\"],[7],[4,\"link-to\",[\"exercise\"],null,{\"statements\":[[0,\"Exercises\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 1</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 2</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 3</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 4</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 5</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 6</a></li>\"],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"a\"],[9,\"href\",\"#0\"],[9,\"class\",\"cd-close\"],[7],[0,\"Close modal\"],[8],[0,\"\\n\"],[8],[0,\" \"],[2,\" cd-bouncy-nav-modal \"],[0,\"\\n\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/admin-nav.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "YamFOLN7", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[9,\"class\",\"as-calendar-occurrence__container\"],[7],[0,\"\\n\"],[4,\"if\",[[22,1]],null,{\"statements\":[[0,\"    \"],[11,1],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"h1\"],[9,\"class\",\"as-calendar-occurrence__title\"],[10,\"style\",[18,\"titleStyle\"],null],[7],[1,[18,\"title\"],false],[8],[0,\"\\n\"]],\"parameters\":[]}],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar/occurrence.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "end+gUPf", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[9,\"class\",\"as-calendar-occurrence__container\"],[7],[0,\"\\n\"],[4,\"if\",[[22,1]],null,{\"statements\":[[0,\"    \"],[11,1],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"h1\"],[9,\"class\",\"as-calendar-occurrence__title\"],[10,\"style\",[18,\"titleStyle\"],null],[7],[1,[18,\"title\"],false],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"unless\",[[20,[\"isInteracting\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"isRemovable\"]]],null,{\"statements\":[[0,\"      \"],[6,\"a\"],[9,\"class\",\"as-calendar-occurrence__remove\"],[3,\"action\",[[19,0,[]],\"remove\"],[[\"bubbles\"],[false]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"isResizable\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[9,\"class\",\"as-calendar-occurrence__resize-handle\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/as-calendar/timetable/occurrence.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "6X8qTP5z", "block": "{\"symbols\":[\"phsio\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n\\n\\n    \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n    \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n      \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"value\",[18,\"selectphysio\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateValue\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n        \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"getphysio\"]]],null,{\"statements\":[[0,\"          \"],[6,\"option\"],[10,\"value\",[19,1,[\"id\"]],null],[7],[0,\"\\n            \"],[1,[19,1,[\"givenName\"]],false],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Reason\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"star\",\"text\",[20,[\"Reason\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Other\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"user\",\"text\",[20,[\"Other\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date\"],[8],[0,\"\\n      \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"button\"],[9,\"class\",\"ui fluid negative button\"],[3,\"action\",[[19,0,[]],\"cancelbookingappointment\"]],[7],[0,\"Cancel\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"bookAppointment\"]],[7],[0,\"\\n    Book appointment\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/book-appointment.hbs" } });
});
define("self-start-front-end/templates/components/delete-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WVF2jG+c", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-country.hbs" } });
});
define("self-start-front-end/templates/components/delete-exercises", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3sciseYl", "block": "{\"symbols\":[],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon red button\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n  Delete\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-exercises.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "asTutV1/", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-gender.hbs" } });
});
define("self-start-front-end/templates/components/delete-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8eml+y8N", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-patient.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "+zCZnyUE", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-rehabplan.hbs" } });
});
define("self-start-front-end/templates/components/delete-status", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jCwNEmuY", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-status.hbs" } });
});
define("self-start-front-end/templates/components/edit-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "b5tBSpmB", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit country: \\\"\"],[1,[18,\"name\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Country Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add country\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:.2em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:.2em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-country.hbs" } });
});
define("self-start-front-end/templates/components/edit-exercises", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "t2rOcmeW", "block": "{\"symbols\":[\"aS\",\"o\"],\"statements\":[[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon green button\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"edit icon\"],[7],[8],[0,\"\\n  Edit\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui fluid raised very padded text container segment\"],[7],[0,\"\\n\\n    \"],[6,\"h2\"],[9,\"id\",\"rehabPlan\"],[9,\"class\",\"ui fluid centered header\"],[7],[0,\"Edit Exercise \"],[1,[18,\"Name\"],false],[8],[0,\"\\n\\n    \"],[6,\"form\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Exercise Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Name\"]],\"Exercise Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[2,\"Description\"],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Description\"],[8],[0,\"\\n        \"],[1,[25,\"textarea\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Description\"]],\"Description\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Author Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"AuthName\"]],\"Author Name\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Objectives\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Objective\"]],\"Objective\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addObjective\"]],[7],[0,\"\\n            Add \"],[6,\"br\"],[7],[8],[0,\" Objective\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"align\",\"center\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Current Objectives\"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"ul\"],[9,\"align\",\"left\"],[10,\"value\",[18,\"obj\"],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"obj\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,2,[]],false],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModelDelete\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Action Steps\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui action input\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"ActionSteps\"]],\"Action Steps\"]]],false],[0,\"\\n          \"],[6,\"button\"],[9,\"class\",\"ui white right labeled icon button\"],[3,\"action\",[[19,0,[]],\"addActionStep\"]],[7],[0,\"\\n            Add \"],[6,\"br\"],[7],[8],[0,\" Action Step\\n            \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"align\",\"center\"],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Current Action Steps\"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"ol\"],[9,\"align\",\"left\"],[10,\"value\",[18,\"actionStep\"],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"actionStep\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[7],[0,\"\\n                \"],[6,\"p\"],[7],[0,\"\\n                  \"],[1,[19,1,[]],false],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                  \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"delete\"]],[7],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Location\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Location\"]],\"Location\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Frequency\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Frequency\"]],\"Frequency\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Duration\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"Duration\"]],\"Duration\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Target Date\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"TargetDate\"]],\"Target Date\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Multimedia URL\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[20,[\"MMURL\"]],\"Multi Media URL\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[1,[18,\"simple-example\"],false],[0,\"\\n        \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[2,\"footer for save / cancel\"],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui positive button\"],[7],[0,\"Save\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui black deny button\"],[7],[0,\"Cancel\"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-exercises.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "qQDPZM3P", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit Gender: \\\"\"],[1,[18,\"name\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Gender Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add gender\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:.2em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:.2em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-gender.hbs" } });
});
define("self-start-front-end/templates/components/edit-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "D1Z+7Yg2", "block": "{\"symbols\":[\"oneCountry\",\"oneStatus\",\"oneGender\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"pateintsData\",\"givenName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"pateintsData\",\"familyName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date of Birth\"],[8],[0,\"\\n      \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"gender\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,3,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"pateintsData\",\"gender\"]],[19,3,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,3,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Marital Status\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"maritalStatus\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"maritalStatusModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"pateintsData\",\"maritalStatus\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,2,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Occupation\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"company\",\"text\",[20,[\"pateintsData\",\"occupation\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Health Card Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"card\",\"text\",[20,[\"pateintsData\",\"healthCardNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"pateintsData\",\"streetNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Street Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"pateintsData\",\"streetName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Unit\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"bookmark\",\"text\",[20,[\"pateintsData\",\"apartment\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Postal/ZIP Code\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"flag\",\"text\",[20,[\"pateintsData\",\"postalCode\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Country\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"country\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"pateintsData\",\"country\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"pateintsData\",\"phoneNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"pateintsData\",\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-patient.hbs" } });
});
define("self-start-front-end/templates/components/edit-rehabplan", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5JfMbc69", "block": "{\"symbols\":[\"o\"],\"statements\":[[0,\"\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\"\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[7],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Rehabilitation Plan Info\"],[8],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Rehabilitation plan name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"star\",\"text\",[20,[\"rehabilitationplansData\",\"planName\"]],\"Rehab plan name\",true]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Author Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"user\",\"text\",[20,[\"rehabilitationplansData\",\"physioID\"]],\"Author Name\",true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[2,\"Description\"],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-textarea\"],[7],[0,\"Description\"],[8],[0,\"\\n      \"],[1,[25,\"textarea\",null,[[\"class\",\"name\",\"value\",\"placeholder\",\"required\"],[\"message\",\"cd-textarea\",[20,[\"rehabilitationplansData\",\"description\"]],\"Description\",true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n\\n    \"],[2,\"goal\"],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Goal\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"award\",\"text\",[20,[\"rehabilitationplansData\",\"goal\"]],\"Goal\",true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Time\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"placeholder\",\"required\"],[\"video\",\"text\",[20,[\"rehabilitationplansData\",\"timeToComplete\"]],\"Time\",true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Exercises\"],[8],[0,\"\\n      \"],[1,[25,\"get-exercises\",null,[[\"ID\",\"exercises\",\"formName\"],[[20,[\"rehabilitationplansData\",\"id\"]],[20,[\"rehabilitationplansData\",\"exercises\"]],[20,[\"rehabilitationplansData\",\"planName\"]]]]],false],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui inverted segment\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Current Exercises\"],[8],[0,\"\\n        \"],[1,[25,\"rehab-exercise\",null,[[\"exercises\",\"thisForm\"],[[20,[\"rehabilitationplansData\",\"exercises\"]],[20,[\"rehabilitationplansData\"]]]]],false],[0,\"\\n\\n        \"],[6,\"ul\"],[9,\"align\",\"left\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"obj\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[7],[0,\"\\n              \"],[6,\"p\"],[7],[0,\"\\n                \"],[1,[19,1,[]],false],[0,\"\\n                \"],[6,\"br\"],[7],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Edit\"],[9,\"class\",\"gray write icon\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[8],[0,\"\\n                \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n\\n\"],[4,\"link-to\",[\"rehabplans\"],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[9,\"class\",\"ui black deny button\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[3,\"action\",[[19,0,[]],\"save\"]],[7],[0,\"\\n      Save\\n      \"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-rehabplan.hbs" } });
});
define("self-start-front-end/templates/components/edit-status", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6+lvGQAV", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit Status: \\\"\"],[1,[18,\"name\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Marital Status\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add status\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:.2em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:.2em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-status.hbs" } });
});
define("self-start-front-end/templates/components/get-exercises", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wOKTf3t8", "block": "{\"symbols\":[\"oneExercise\"],\"statements\":[[0,\"\\n\"],[6,\"button\"],[9,\"class\",\"ui mini circular labeled icon green button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"edit icon\"],[7],[8],[0,\"\\n  Add Exercise\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui search\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n      \"],[6,\"input\"],[9,\"class\",\"prompt\"],[9,\"type\",\"text\"],[9,\"placeholder\",\"Search Exercise\"],[7],[8],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"ui items\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"exerciseModel\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui small image\"],[7],[0,\"\\n        \"],[2,\"<img src=\\\"/images/wireframe/image.png\\\">\"],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n        \"],[1,[19,1,[\"name\"]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"description\"],[7],[0,\"\\n        \"],[6,\"p\"],[7],[1,[19,1,[\"description\"]],false],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"extra\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"ui right floated button\"],[3,\"action\",[[19,0,[]],\"addExercise\",[19,1,[]],[19,1,[\"id\"]]]],[7],[0,\"\\n          Add\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[7],[0,\"\\n        Done\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/get-exercises.hbs" } });
});
define("self-start-front-end/templates/components/manage-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "P7kKRbvU", "block": "{\"symbols\":[\"question\"],\"statements\":[[0,\"\\n\"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\nManage Form Questions\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n           \"],[6,\"h2\"],[7],[0,\" \"],[1,[18,\"fName\"],false],[0,\" \"],[8],[0,\"\\n           \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"questionsModel\"]]],null,{\"statements\":[[0,\"                        \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n                         \"],[6,\"label\"],[7],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n                        \"],[8],[0,\"\\n\\n                        \"],[6,\"div\"],[9,\"class\",\"four wide column\"],[7],[0,\"\\n                         \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"addQuestion\",[19,1,[]],[20,[\"form\"]],[19,1,[\"id\"]]]],[7],[0,\" Add \"],[8],[0,\"\\n                        \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"           \"],[8],[0,\"\\n           \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n         \"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"actions\"],[7],[0,\"\\n         \"],[6,\"div\"],[9,\"class\",\"ui positive right labeled icon button\"],[7],[0,\"\\n         Done\\n         \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/manage-form.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "f8vOieuN", "block": "{\"symbols\":[\"&default\"],\"statements\":[[0,\"\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"header\"],[9,\"class\",\"cd-header\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"id\",\"cd-logo\"],[7],[6,\"a\"],[7],[4,\"link-to\",[\"home\"],null,{\"statements\":[[0,\"Home\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n\\n  \"],[6,\"nav\"],[9,\"class\",\"cd-main-nav\"],[7],[0,\"\\n    \"],[6,\"ul\"],[7],[0,\"\\n      \"],[2,\" inser more links here \"],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"About\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"How it Works\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Services\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Assessment\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Blog\"],[8],[8],[0,\"\\n      \"],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Contact\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-main-nav \"],[0,\"\\n\"],[8],[0,\"\\n\"],[11,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/nav-bar.hbs" } });
});
define("self-start-front-end/templates/components/parse-question", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ws/Z1fuT", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\\n   \\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/parse-question.hbs" } });
});
define("self-start-front-end/templates/components/rehab-exercise", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LEM/M9XS", "block": "{\"symbols\":[\"oneExercise\"],\"statements\":[[4,\"each\",[[20,[\"exercises\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"thirteen wide column\"],[7],[0,\"\\n      \"],[6,\"li\"],[7],[0,\"\\n        \"],[1,[19,1,[\"name\"]],false],[0,\"\\n        \"],[6,\"i\"],[9,\"style\",\" cursor: pointer;\"],[9,\"align\",\" right\"],[9,\"title\",\"Delete\"],[9,\"class\",\"red remove icon\"],[3,\"action\",[[19,0,[]],\"removeExercise\",[19,1,[]],[20,[\"thisForm\"]],[19,1,[\"id\"]],[20,[\"thisForm\",\"id\"]]]],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/rehab-exercise.hbs" } });
});
define("self-start-front-end/templates/components/rehabplan-actions-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UolE4Jc8", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/rehabplan-actions-table.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "nJuHYkz9", "block": "{\"symbols\":[\"oneQuestion\"],\"statements\":[[6,\"div\"],[9,\"class\",\"ui segment\"],[7],[0,\"\\n  \"],[6,\"h3\"],[7],[0,\"Questions: \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"questions\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"fourteen wide column\"],[7],[0,\"\\n        \"],[6,\"li\"],[7],[0,\"  \"],[1,[19,1,[\"questionText\"]],false],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide column right aligned\"],[7],[0,\"\\n        \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"removeQuestion\",[19,1,[]],[20,[\"thisForm\"]],[19,1,[\"id\"]],[20,[\"thisForm\",\"id\"]]]],[7],[0,\"Remove\"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/show-form-questions.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "lreoo6jx", "block": "{\"symbols\":[\"appo\",\"phsio\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"isEditing\"]]],null,{\"statements\":[[0,\"  \"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"fieldset\"],[7],[0,\"\\n      \"],[6,\"legend\"],[7],[0,\"Book Appointment\"],[8],[0,\"\\n\\n\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"value\",[18,\"selectphysio\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"updateValue\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n          \"],[6,\"option\"],[9,\"value\",\"\"],[9,\"selected\",\"\"],[9,\"disabled\",\"\"],[9,\"hidden\",\"\"],[7],[0,\"Select Physiotherapist\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"getphysio\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,2,[\"id\"]],null],[7],[0,\"\\n              \"],[1,[19,2,[\"givenName\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"appointments_filter\"]]],null,{\"statements\":[[0,\"        \"],[6,\"p\"],[7],[1,[19,1,[\"date\"]],false],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"button\"],[9,\"class\",\"ui button\"],[3,\"action\",[[19,0,[]],\"viewschedule\"]],[7],[0,\"\\n    View schedule (physio)\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/view-schedule.hbs" } });
});
define("self-start-front-end/templates/components/welcome-page", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KNw2b1Bm", "block": "{\"symbols\":[],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[2,\" PRELOADER \"],[0,\"\\n\"],[6,\"div\"],[9,\"id\",\"preloader\"],[7],[6,\"div\"],[7],[6,\"em\"],[7],[8],[6,\"em\"],[7],[8],[6,\"em\"],[7],[8],[6,\"em\"],[7],[8],[8],[8],[0,\"\\n\"],[2,\" //PRELOADER \"],[0,\"\\n\\n\"],[6,\"main\"],[9,\"class\",\"cd-main-content\"],[7],[0,\"\\n\"],[4,\"admin-nav\",null,null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"cd-fixed-bg cd-bg-1 demo\"],[9,\"id\",\"section01\"],[7],[0,\"\\n    \"],[6,\"h1\"],[9,\"id\",\"logo-image\"],[7],[6,\"img\"],[9,\"src\",\"assets/images/home/Header.png\"],[9,\"style\",\"max-width: 50%;\\n  height: auto;\\n  width: auto\\\\9;\"],[7],[8],[8],[0,\"\\n\"],[4,\"link-to\",[\"appointment\"],null,{\"statements\":[[0,\"    \"],[6,\"h1\"],[9,\"id\",\"button01\"],[7],[4,\"stylish-button\",null,[[\"type\",\"border\",\"shape\",\"size\",\"textWidth\",\"customClasses\"],[\"ujarak\",\"medium\",\"round-s\",\"l\",\"thick\",\"btn-primary\"]],{\"statements\":[[0,\" Book Appointment \"]],\"parameters\":[]},null],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"h1\"],[9,\"id\",\"button02\"],[7],[4,\"stylish-button\",null,[[\"type\",\"border\",\"shape\",\"size\",\"textWidth\"],[\"ujarak\",\"medium\",\"round-s\",\"l\",\"thick\"]],{\"statements\":[[0,\" Ask a Physio \"]],\"parameters\":[]},null],[8],[0,\"\\n\\n\\n    \"],[6,\"a\"],[9,\"href\",\"#section02\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n\\n\\n\\n    \"],[6,\"section\"],[9,\"class\",\"cd-section\"],[9,\"style\",\"cursor: pointer;\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"cd-bouncy-nav-trigger\"],[7],[0,\"Admin\"],[8],[0,\"\\n    \"],[8],[0,\" \"],[2,\" .cd-section \"],[0,\"\\n\\n\\n  \"],[8],[0,\" \"],[2,\" cd-fixed-bg \"],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\\n        \"],[6,\"div\"],[9,\"class\",\"cd-scrolling-bg cd-color-2 demo\"],[9,\"id\",\"section02\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-container\"],[7],[0,\"\\n        \"],[6,\"p\"],[7],[0,\"\\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!\\n        \"],[8],[0,\"\\n      \"],[8],[0,\" \"],[2,\" cd-container \"],[0,\"\\n        \"],[6,\"a\"],[9,\"href\",\"#section03\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n      \"],[8],[0,\" \"],[2,\" cd-scrolling-bg \"],[0,\"\\n\\n\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-fixed-bg cd-bg-2 demo\"],[9,\"id\",\"section03\"],[7],[0,\"\\n    \"],[6,\"h2\"],[7],[0,\"Lorem ipsum dolor sit amet.\"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"#section04\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-fixed-bg \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-scrolling-bg cd-color-3 demo\"],[9,\"id\",\"section04\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-container\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"\\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!\\n      \"],[8],[0,\"\\n    \"],[8],[0,\" \"],[2,\" cd-container \"],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"#section05\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-scrolling-bg \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-fixed-bg cd-bg-3 demo\"],[9,\"id\",\"section05\"],[7],[0,\"\\n    \"],[6,\"h2\"],[7],[0,\"Lorem ipsum dolor sit amet.\"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"#section06\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-fixed-bg \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-scrolling-bg cd-color-1 demo\"],[9,\"id\",\"section06\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-container\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"\\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!\\n      \"],[8],[0,\"\\n    \"],[8],[0,\" \"],[2,\" cd-container \"],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-scrolling-bg \"],[0,\"\\n\\n  \"],[6,\"a\"],[9,\"href\",\"javascript:\"],[9,\"id\",\"return-to-top\"],[7],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\"icon-chevron-up\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\" \"],[2,\" cd-main-content \"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/welcome-page.hbs" } });
});
define("self-start-front-end/templates/country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aUtP+eOA", "block": "{\"symbols\":[\"country\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Countries\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-country\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;\"],[7],[1,[25,\"edit-country\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-country\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/country.hbs" } });
});
define("self-start-front-end/templates/edit-rehablinker", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Qi4GgT/8", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"edit-rehabplan\",null,[[\"rehabilitationplansData\"],[[20,[\"model\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/edit-rehablinker.hbs" } });
});
define("self-start-front-end/templates/exercise", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aVRtzoKj", "block": "{\"symbols\":[\"Exercise\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Exercises\"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[0,\"\\n            \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;  padding-top: .5%;\"],[7],[1,[25,\"delete-exercises\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;  padding-top: .5%;\"],[7],[1,[25,\"edit-exercises\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 30%; \"],[7],[1,[19,1,[\"description\"]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"id\",\"add\"],[9,\"class\",\"container\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"new-exercise\"],null,{\"statements\":[[0,\"    \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"plus icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/exercise.hbs" } });
});
define("self-start-front-end/templates/forms", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nyoJLjAL", "block": "{\"symbols\":[\"form\"],\"statements\":[[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"h2\"],[7],[0,\" Forms \"],[8],[0,\"\\n\\n\"],[4,\"ui-accordion\",null,null,{\"statements\":[[4,\"each\",[[20,[\"model\",\"form\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"twelve wide column\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"title\"],[7],[0,\"\\n         \"],[6,\"i\"],[9,\"class\",\"ui dropdown blue icon\"],[7],[8],[0,\"\\n          \"],[1,[19,1,[\"name\"]],false],[0,\"\\n        \"],[8],[0,\"\\n        \"],[1,[25,\"show-form-questions\",null,[[\"questions\",\"thisForm\"],[[19,1,[\"questions\"]],[19,1,[]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"six wide column right aligned\"],[7],[0,\"\\n          \"],[1,[25,\"manage-form\",null,[[\"ID\",\"questions\",\"form\",\"fName\"],[[19,1,[\"id\"]],[19,1,[\"questions\"]],[19,1,[]],[19,1,[\"name\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide column right aligned\"],[7],[0,\"\\n        \"],[1,[25,\"edit-form\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two wide column left aligned\"],[7],[0,\"\\n        \"],[1,[25,\"delete-form\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[1,[18,\"add-form\"],false],[0,\"\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/forms.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "k4N4A6SE", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"welcome-page\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/home.hbs" } });
});
define("self-start-front-end/templates/manage-selections", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7Z+YAmwh", "block": "{\"symbols\":[],\"statements\":[[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/manage-selections.hbs" } });
});
define("self-start-front-end/templates/marital-status", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "At1KePcR", "block": "{\"symbols\":[\"maritalStatus\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[0,\"\\n            \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-status\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;\"],[7],[1,[25,\"edit-status\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-status\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/marital-status.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "btqn3do5", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-patient\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/new-patient.hbs" } });
});
define("self-start-front-end/templates/new-rehabplans", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zCDP/nRZ", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-rehabplan\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/new-rehabplans.hbs" } });
});
define("self-start-front-end/templates/patients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "x3uNnASL", "block": "{\"symbols\":[\"patient\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Patients\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"givenName\"]],false],[0,\" \"],[1,[19,1,[\"familyName\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-patient\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n\\n\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%; cursor: pointer;\"],[9,\"title\",\"Edit\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"update-patient\",[19,1,[\"id\"]]],null,{\"statements\":[[0,\"                \"],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[8],[0,\"\\n\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"id\",\"add\"],[9,\"class\",\"container\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"new-patient\"],null,{\"statements\":[[0,\"    \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"plus icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/patients.hbs" } });
});
define("self-start-front-end/templates/physiotherapist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qETAGNO3", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/physiotherapist.hbs" } });
});
define("self-start-front-end/templates/province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BvtWsK4w", "block": "{\"symbols\":[\"province\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Provinces\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-province\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-province\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/province.hbs" } });
});
define("self-start-front-end/templates/questions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UZz3qCCC", "block": "{\"symbols\":[\"question\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"p\"],[9,\"style\",\"margin-left: 10%\"],[7],[1,[18,\"add-question\"],false],[8],[0,\"\\n\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Questions\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"questionText\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-top: .5%;\"],[7],[1,[25,\"delete-question\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;  padding-top: .5%;\"],[7],[1,[25,\"modify-question\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 20%; \"],[7],[1,[19,1,[\"type\"]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/questions.hbs" } });
});
define("self-start-front-end/templates/rehabplans", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8+efdcxy", "block": "{\"symbols\":[\"Rehabplan\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"id\",\"content\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui search\"],[9,\"style\",\"margin-left: 70%\"],[7],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n    \"],[6,\"input\"],[9,\"class\",\"prompt\"],[9,\"type\",\"text\"],[9,\"placeholder\",\"Search Rehabilitation plan\"],[7],[8],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n    \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n        \"],[6,\"ul\"],[7],[0,\"\\n          \"],[6,\"li\"],[9,\"style\",\"text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Rehabilitation Plan\"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n            \"],[6,\"li\"],[7],[0,\"\\n              \"],[1,[19,1,[\"planName\"]],false],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-rehabplan\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%; cursor: pointer;\"],[9,\"title\",\"Edit\"],[7],[0,\"\\n                \"],[4,\"link-to\",[\"edit-rehablinker\",[19,1,[\"id\"]]],null,{\"statements\":[[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8]],\"parameters\":[]},null],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 30%; \"],[7],[1,[19,1,[\"description\"]],false],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"id\",\"add\"],[9,\"class\",\"container\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"new-rehabplans\"],null,{\"statements\":[[0,\"    \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"plus icon\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/rehabplans.hbs" } });
});
define("self-start-front-end/templates/update-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5tb/Gk2l", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"edit-patient\",null,[[\"pateintsData\",\"DOB\"],[[20,[\"model\"]],[20,[\"model\",\"dateOfBirth\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/update-patient.hbs" } });
});
define("self-start-front-end/transitions", ["exports"], function (exports) {
  "use strict";

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
  };
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
  require("self-start-front-end/app")["default"].create({"name":"self-start-front-end","version":"0.0.0+f92978a3"});
}
//# sourceMappingURL=self-start-front-end.map
