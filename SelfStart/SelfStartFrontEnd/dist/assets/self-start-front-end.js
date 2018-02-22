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
          province: self.get('province'),
          city: self.get('city'),
          dateOfBirth: self.get('selectedDate'),
          healthCardNumber: self.get('healthCardNumber'),
          gender: self.get('gender'),
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
        this.set('province', '');
        this.set('city', '');
        this.set('healthCardNumber', '');
        this.set('gender', '');

        this.set('dateOfBirth', '');

        this.set('phoneNumber', '');
        this.set('postalCode', '');
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
          detachable: false,

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
    flagDelete: null,

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
          detachable: false,
          transition: 'fly down',

          onDeny: function onDeny() {
            return true;
          },
          onApprove: function onApprove() {

            _this.get('DS').find('province', _this.get('ID')).then(function (province) {
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
    selectedGender: null,
    selectedCountry: null,

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
      return 'editPatient' + this.get('ID');
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


      save: function save() {
        var _this = this;

        this.get('DS').findRecord('patient', this.get('pateintsData').id).then(function (rec) {
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
            _this.set('isEditing', null);
          });
        });
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
    sort: 'firstName',
    dir: '',
    givenNameDir: '',
    familyNameDir: '',
    emailDir: '',
    phoneNumberDir: '',
    addressDir: '',
    query: null,
    flagDelete: false,
    modelAttributes: [{ 'key': 'givenName', 'name': 'First Name' }, { 'key': 'familyName', 'name': 'Last Name' }, { 'key': 'address', 'name': 'Address' }, { 'key': 'email', 'name': 'Email' }, { 'key': 'phoneNumber', 'name': 'Phone Number' }],
    patientsModel: [],
    INDEX: null,
    queryPath: 'firstName',
    scrolledLines: 0,

    activeModel: Ember.observer('offset', 'limit', 'sort', 'dir', 'flagDelete', function () {
      var self = this;

      this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir'])).then(function (records) {
        self.set('patientsModel', records.toArray());
      });
    }),

    filterpateints: Ember.observer('query', function () {
      var _this = this;

      var text = this.get('query');
      var result = [];
      if (text !== '') {
        this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir'])).then(function (records) {
          result = records.filter(function (m) {
            return m.get(_this.get('queryPath')).toLowerCase().includes(text.toLowerCase());
          });
          _this.set('patientsModel', result);
        });
      } else {
        this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir'])).then(function (records) {
          _this.set('patientsModel', records);
        });
      }
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this.set('limit', 10);
      this.set('offset', 0);
      this.set('pageSize', 10);
      var self = this;
      //  this.set('modelAttributes', Object.keys(this.get('store').createRecord('patient').toJSON()));
      this.get('store').query('patient', this.getProperties(['offset', 'limit', 'sort', 'dir'])).then(function (records) {
        self.set('patientsModel', records.toArray());
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

        var dir = columnName + 'Dir';

        var sorted = this.get('patientsModel').sortBy(columnName);
        this.get('modelAttributes').forEach(function (d) {
          _this2.set(d.key + 'Dir', '');
        });

        if (direction === 'asc') {
          this.set(dir, 'desc');
        } else {
          sorted = sorted.reverse();
          this.set(dir, 'asc');
        }

        this.set('patientsModel', sorted);
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
    account: _emberData.default.belongsTo('userAccount')

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
define('self-start-front-end/models/user-account', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    //account
    userAccountName: _emberData.default.attr(),
    encryptedPassword: _emberData.default.attr(),
    salt: _emberData.default.attr()
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
    this.route('country');
    this.route('province');
    this.route('manage-selections');
    this.route('gender');
    this.route('city');
    this.route('update-patient', { path: 'patient/:patient_id' });
    this.route('new-patient');
  });

  exports.default = Router;
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
define('self-start-front-end/routes/new-patient', ['exports'], function (exports) {
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
define('self-start-front-end/routes/province', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('province');
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
define("self-start-front-end/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "N9+lRCzY", "block": "{\"symbols\":[],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/reset.css\"]]],[7],[8],[0,\" \"],[2,\" CSS reset \"],[0,\"\\n\"],[4,\"admin-nav\",null,null,{\"statements\":[[0,\"\\n  \"],[6,\"section\"],[9,\"class\",\"cd-section\"],[9,\"style\",\"cursor: pointer;\"],[7],[0,\"\\n    \"],[6,\"ul\"],[9,\"class\",\"cd-bouncy-nav-trigger\"],[7],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" .cd-section \"],[0,\"\\n\\n\"]],\"parameters\":[]},null],[4,\"nav-bar\",null,null,{\"statements\":[[0,\"\\n    \"],[1,[18,\"outlet\"],false],[0,\"\\n\\n\\n\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/application.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "htL5M5vV", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n    \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Add Country\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newCountry\",\"small newCountry\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new country\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Country Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add country\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-country.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "uWAbWEcg", "block": "{\"symbols\":[\"oneCountry\",\"oneGender\"],\"statements\":[[6,\"div\"],[9,\"class\",\"title\"],[7],[0,\"\\n  Add New Client\\n\\n  \"],[6,\"div\"],[9,\"class\",\"container\"],[9,\"style\",\"float: right;\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"patients\"],null,{\"statements\":[[0,\"      \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"remove icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Account Settings\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Account Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"required\"],[\"text\",[20,[\"account\",\"userAccountName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Password\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"required\"],[\"text\",[20,[\"account\",\"encryptedPassword\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date of Birth\"],[8],[0,\"\\n      \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"gender\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"gender\",\"name\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,2,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Health Card Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"card\",\"text\",[20,[\"healthCardNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Street Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Unit\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"bookmark\",\"text\",[20,[\"apartment\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Postal/ZIP Code\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"flag\",\"text\",[20,[\"postalCode\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Country\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"country\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"country\",\"name\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"phoneNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n\\n\\n      \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n\\n\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-patient.hbs" } });
});
define("self-start-front-end/templates/components/add-province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "W/2xkiHL", "block": "{\"symbols\":[\"country\"],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"cd-button\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Add Province\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[\"newProvince\",\"small newProvince\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Adding new Province\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Province Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add province\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"Country Name\"],[8],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"onChange\"],[\"search selection\",[25,\"action\",[[19,0,[]],\"setCountryId\"],null]]],{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[0,\"Select a country\"],[8],[0,\"\\n          \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"countries\"]]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"data-value\",[26,[[19,1,[\"id\"]]]]],[9,\"class\",\"item\"],[7],[0,\"\\n                \"],[1,[19,1,[\"name\"]],false],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:1em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:1em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-province.hbs" } });
});
define("self-start-front-end/templates/components/admin-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5G15qNpD", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1],[0,\"\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/nav-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"cd-bouncy-nav-modal\"],[7],[0,\"\\n\\n  \"],[6,\"nav\"],[7],[0,\"\\n    \"],[6,\"ul\"],[9,\"class\",\"cd-bouncy-nav\"],[7],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"id\",\"patient\"],[7],[4,\"link-to\",[\"patients\"],null,{\"statements\":[[0,\"Patient Info\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"id\",\"country\"],[7],[4,\"link-to\",[\"manage-selections\"],null,{\"statements\":[[0,\"Configure form\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 1</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 2</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 3</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 4</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 5</a></li>\"],[0,\"\\n      \"],[2,\"<li><a href=\\\"#0\\\">Category 6</a></li>\"],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"a\"],[9,\"href\",\"#0\"],[9,\"class\",\"cd-close\"],[7],[0,\"Close modal\"],[8],[0,\"\\n\"],[8],[0,\" \"],[2,\" cd-bouncy-nav-modal \"],[0,\"\\n\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/admin-nav.hbs" } });
});
define("self-start-front-end/templates/components/back-to-top", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2X3Y11K3", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1],[0,\"\\n\"],[2,\" ICON NEEDS FONT AWESOME FOR CHEVRON UP ICON \"],[0,\"\\n\"],[6,\"link\"],[9,\"href\",\"//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css\"],[9,\"rel\",\"stylesheet\"],[7],[8],[0,\"\\n\\n\"],[2,\" Return to Top \"],[0,\"\\n\"],[6,\"a\"],[9,\"href\",\"javascript:\"],[9,\"id\",\"return-to-top\"],[7],[6,\"i\"],[9,\"class\",\"icon-chevron-up\"],[7],[8],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/back-to-top.hbs" } });
});
define("self-start-front-end/templates/components/delete-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WVF2jG+c", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-country.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "e3PosvNV", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[0,\"\\n  \"],[6,\"img\"],[9,\"src\",\"assets/images/trash-simple.svg\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"padding:.6em; float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"padding:.6em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-patient.hbs" } });
});
define("self-start-front-end/templates/components/delete-province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "N6XDsEYf", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-province.hbs" } });
});
define("self-start-front-end/templates/components/edit-country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "b5tBSpmB", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"grey write icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"\\n    Edit country: \\\"\"],[1,[18,\"name\"],false],[0,\"\\\"\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n        \"],[6,\"label\"],[7],[0,\"New Country Name\"],[8],[0,\"\\n        \"],[1,[25,\"input\",null,[[\"type\",\"cols\",\"rows\",\"value\",\"placeholder\"],[\"text\",\"50\",\"1\",[20,[\"name\"]],\"add country\"]]],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0; \"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui positive right\"],[9,\"style\",\"padding:.2em; float:left; width: 50%; cursor: pointer; background: #35a785; color:white; text-align: center;\"],[7],[0,\"Save\"],[6,\"i\"],[9,\"class\",\"checkmark icon\"],[7],[8],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui deny\"],[9,\"style\",\"padding:.2em; float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"Cancel\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-country.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "0PJhuXnO", "block": "{\"symbols\":[\"oneCountry\",\"oneGender\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"../assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"\",\"text\",[20,[\"pateintsData\",\"givenName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"\",\"text\",[20,[\"pateintsData\",\"familyName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date of Birth\"],[8],[0,\"\\n      \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectGender\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"pateintsData\",\"gender\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,2,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Health Card Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"card\",\"text\",[20,[\"pateintsData\",\"healthCardNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"pateintsData\",\"streetNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Street Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"pateintsData\",\"streetName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Unit\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"bookmark\",\"text\",[20,[\"pateintsData\",\"apartment\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Postal/ZIP Code\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"flag\",\"text\",[20,[\"pateintsData\",\"postalCode\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Country\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"selectCountry\"],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"pateintsData\",\"country\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"pateintsData\",\"phoneNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"pateintsData\",\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-button\"],[7],[0,\"\\n        \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n\\n\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/edit-patient.hbs" } });
});
define("self-start-front-end/templates/components/manage-patients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "33h1IRkc", "block": "{\"symbols\":[\"patient\",\"attribute\"],\"statements\":[[6,\"div\"],[9,\"class\",\"title\"],[7],[0,\"\\n  Clients\\n  \"],[6,\"div\"],[9,\"class\",\"container\"],[9,\"style\",\"float: right;\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"new-patient\",[25,\"query-params\",null,[[\"account\"],[[20,[\"patient\",\"account\"]]]]]],null,{\"statements\":[[0,\"      \"],[6,\"a\"],[9,\"id\",\"add\"],[9,\"class\",\"round-button\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"plus icon\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"background\"],[7],[0,\"\\n\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"ui form\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"two fields\"],[7],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n\"],[4,\"ui-dropdown\",null,[[\"class\",\"onChange\"],[\"selection\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"queryPath\"]]],null]],null]]],{\"statements\":[[0,\"            \"],[6,\"div\"],[9,\"class\",\"default text\"],[7],[1,[20,[\"modelAttributes\",\"firstObject\",\"name\"]],false],[8],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"dropdown icon\"],[7],[8],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"modelAttributes\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[9,\"class\",\"item\"],[10,\"data-value\",[26,[[19,2,[\"key\"]]]]],[7],[0,\"\\n                  \"],[1,[19,2,[\"name\"]],false],[0,\"\\n                \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"            \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"field\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"ui icon input\"],[7],[0,\"\\n            \"],[6,\"i\"],[9,\"class\",\"search icon\"],[7],[8],[0,\"\\n            \"],[1,[25,\"input\",null,[[\"type\",\"placeholder\",\"value\"],[\"text\",\"Search...\",[20,[\"query\"]]]]],false],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"style\",\"display: inline\"],[7],[0,\"\\n    \"],[6,\"table\"],[9,\"class\",\"ui table \"],[7],[0,\"\\n      \"],[6,\"thead\"],[7],[0,\"\\n      \"],[6,\"tr\"],[7],[0,\"\\n        \"],[6,\"th\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\" Avatar \"],[8],[0,\"\\n        \"],[6,\"th\"],[9,\"class\",\"left aligned collapsing two wide column\"],[3,\"action\",[[19,0,[]],\"sortColumn\",\"givenName\",[20,[\"givenNameDir\"]]]],[7],[0,\"First Name\\n\"],[4,\"if\",[[25,\"eq\",[[20,[\"givenNameDir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"givenNameDir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"givenNameDir\"]],\"\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n        \"],[6,\"th\"],[9,\"class\",\"left aligned collapsing two wide  column\"],[3,\"action\",[[19,0,[]],\"sortColumn\",\"familyName\",[20,[\"familyNameDir\"]]]],[7],[0,\"Last Name\\n\"],[4,\"if\",[[25,\"eq\",[[20,[\"familyNameDir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"familyNameDir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"familyNameDir\"]],\"\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n\\n        \"],[6,\"th\"],[9,\"class\",\"left aligned collapsing two wide  column\"],[3,\"action\",[[19,0,[]],\"sortColumn\",\"address\",[20,[\"addressDir\"]]]],[7],[0,\"Address\\n\"],[4,\"if\",[[25,\"eq\",[[20,[\"addressDir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"          \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"addressDir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"          \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"addressDir\"]],\"\"],null]],null,{\"statements\":[[0,\"          \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\\n        \"],[6,\"th\"],[9,\"class\",\"left aligned collapsing four wide  column\"],[3,\"action\",[[19,0,[]],\"sortColumn\",\"email\",[20,[\"emailDir\"]]]],[7],[0,\"Email\\n\"],[4,\"if\",[[25,\"eq\",[[20,[\"emailDir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"emailDir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"emailDir\"]],\"\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n        \"],[6,\"th\"],[9,\"class\",\"left aligned collapsing two wide  column\"],[3,\"action\",[[19,0,[]],\"sortColumn\",\"phoneNumber\",[20,[\"phoneNumberDir\"]]]],[7],[0,\"Phone Number\\n\"],[4,\"if\",[[25,\"eq\",[[20,[\"phoneNumberDir\"]],\"asc\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort descending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"phoneNumberDir\"]],\"desc\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort ascending icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[25,\"eq\",[[20,[\"phoneNumberDir\"]],\"\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[9,\"class\",\"sort icon\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n\\n        \"],[6,\"th\"],[9,\"class\",\"left aligned collapsing one wide column\"],[7],[0,\"Actions\"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"id\",\"myWindow\"],[9,\"style\",\"height:500px;overflow: scroll;\"],[7],[0,\"\\n    \"],[6,\"table\"],[9,\"class\",\"ui single line table\"],[9,\"id\",\"tb\"],[7],[0,\"\\n\"],[0,\"\\n      \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"patientsModel\"]]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[7],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned two wide column \"],[7],[0,\"\\n            \"],[6,\"img\"],[9,\"src\",\"assets/images/nav/single-01.svg\"],[9,\"class\",\"ui mini rounded image\"],[3,\"action\",[[19,0,[]],\"toggleDetail\",[19,1,[\"id\"]]]],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned three wide column \"],[7],[0,\" \"],[1,[19,1,[\"givenName\"]],false],[0,\" \"],[8],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned two wide column \"],[7],[0,\" \"],[1,[19,1,[\"familyName\"]],false],[0,\" \"],[8],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned three wide column \"],[7],[0,\" \"],[1,[19,1,[\"streetNumber\"]],false],[0,\" \"],[1,[19,1,[\"streetName\"]],false],[0,\" \"],[8],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned three wide column \"],[7],[0,\" \"],[1,[19,1,[\"email\"]],false],[0,\" \"],[8],[0,\"\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned two wide column \"],[7],[0,\" \"],[1,[19,1,[\"phoneNumber\"]],false],[0,\" \"],[8],[0,\"\\n\\n\\n          \"],[6,\"td\"],[9,\"class\",\"left aligned one wide column \"],[7],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"cursor: pointer; float: left;\"],[9,\"title\",\"Edit\"],[3,\"action\",[[19,0,[]],\"editpatient\",[19,1,[\"id\"]]]],[7],[0,\"\\n              \"],[6,\"img\"],[9,\"src\",\"assets/images/pencil.svg\"],[7],[8],[0,\"\\n              \"],[6,\"span\"],[9,\"style\",\"display:inline-block; width: 5px;\"],[7],[8],[0,\"\\n            \"],[8],[0,\"\\n\\n            \"],[6,\"p\"],[9,\"style\",\"float: left;\"],[7],[1,[25,\"delete-patient\",null,[[\"ID\",\"flagDelete\"],[[19,1,[\"id\"]],[20,[\"flagDelete\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[2,\"<td class=\\\"left aligned one wide column \\\">\"],[0,\"\\n            \"],[2,\"\"],[0,\"\\n          \"],[2,\"</td>\"],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"tr\"],[7],[0,\"\\n          \"],[6,\"th\"],[9,\"colspan\",\"8\"],[7],[0,\"\\n\"],[4,\"liquid-spacer\",null,[[\"growDuration\"],[500]],{\"statements\":[[4,\"if\",[[25,\"eq\",[[20,[\"isShowing\"]],[19,1,[\"id\"]]],null]],null,{\"statements\":[[0,\"                \"],[1,[25,\"show-patient\",null,[[\"model\"],[[19,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"          \"],[8],[0,\" \"],[6,\"tr\"],[7],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"tr\"],[7],[0,\"\\n          \"],[6,\"th\"],[9,\"colspan\",\"8\"],[7],[0,\"\\n\"],[4,\"liquid-if\",[[25,\"eq\",[[20,[\"isEditing\"]],[19,1,[\"id\"]]],null]],[[\"class\"],[\"editing\"]],{\"statements\":[[0,\"              \"],[1,[25,\"edit-patient\",null,[[\"pateintsData\",\"isEditing\"],[[19,1,[]],[20,[\"isEditing\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"\\n\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/manage-patients.hbs" } });
});
define("self-start-front-end/templates/components/nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LJ3kgwfn", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"header\"],[9,\"class\",\"cd-header\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"id\",\"cd-logo\"],[7],[6,\"a\"],[7],[4,\"link-to\",[\"home\"],null,{\"statements\":[[0,\"Home\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n\\n  \"],[6,\"nav\"],[9,\"class\",\"cd-main-nav\"],[7],[0,\"\\n    \"],[6,\"ul\"],[7],[0,\"\\n      \"],[2,\" inser more links here \"],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"About\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"How it Works\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Services\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Assessment\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Blog\"],[8],[8],[0,\"\\n      \"],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Contact\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-main-nav \"],[0,\"\\n\"],[8],[0,\"\\n\"],[11,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/nav-bar.hbs" } });
});
define("self-start-front-end/templates/components/show-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0yQQAi/6", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"ui segment items\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui raised very padded text segment\"],[9,\"style\",\"margin-right: 40%\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"ui grid\"],[7],[0,\"\\n\\n\\n    \"],[6,\"div\"],[9,\"class\",\"eight wide column\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Client:\"],[8],[0,\" \"],[1,[20,[\"model\",\"givenName\"]],false],[1,[20,[\"model\",\"familyName\"]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Date of Birth:\"],[8],[0,\" \"],[1,[18,\"dateFormat\"],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Gender:\"],[8],[1,[20,[\"model\",\"gender\"]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Address:\"],[8],[1,[20,[\"model\",\"streetNumber\"]],false],[0,\" \"],[1,[20,[\"model\",\"streetName\"]],false],[0,\", \"],[1,[20,[\"model\",\"postalCode\"]],false],[0,\"\\n          \"],[6,\"p\"],[7],[1,[20,[\"model\",\"city\"]],false],[0,\", \"],[1,[20,[\"model\",\"province\"]],false],[0,\", \"],[1,[20,[\"model\",\"country\"]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"eight wide column\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Health Card:\"],[8],[0,\" \"],[1,[20,[\"model\",\"healthCardNumber\"]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Phone Number:\"],[8],[1,[20,[\"model\",\"phoneNumber\"]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[6,\"br\"],[7],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"item\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"middle aligned content\"],[7],[0,\"\\n          \"],[6,\"p\"],[9,\"style\",\"font-weight: bold;\"],[7],[0,\"Email:\"],[8],[0,\"\\n          \"],[1,[20,[\"model\",\"email\"]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/show-patient.hbs" } });
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
define("self-start-front-end/templates/components/welcome-page", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "paJepf3T", "block": "{\"symbols\":[],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[2,\" PRELOADER \"],[0,\"\\n\"],[6,\"div\"],[9,\"id\",\"preloader\"],[7],[6,\"div\"],[7],[6,\"em\"],[7],[8],[6,\"em\"],[7],[8],[6,\"em\"],[7],[8],[6,\"em\"],[7],[8],[8],[8],[0,\"\\n\"],[2,\" //PRELOADER \"],[0,\"\\n\\n\\n\\n\"],[6,\"main\"],[9,\"class\",\"cd-main-content\"],[7],[0,\"\\n\"],[4,\"admin-nav\",null,null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"cd-fixed-bg cd-bg-1 demo\"],[9,\"id\",\"section01\"],[7],[0,\"\\n    \"],[6,\"h1\"],[9,\"id\",\"logo-image\"],[7],[6,\"img\"],[9,\"src\",\"assets/images/home/Header.png\"],[9,\"style\",\"max-width: 50%;\\n  height: auto;\\n  width: auto\\\\9;\"],[7],[8],[8],[0,\"\\n\\n    \"],[6,\"h1\"],[9,\"id\",\"button01\"],[7],[4,\"stylish-button\",null,[[\"type\",\"border\",\"shape\",\"size\",\"textWidth\",\"customClasses\"],[\"ujarak\",\"medium\",\"round-s\",\"l\",\"thick\",\"btn-primary\"]],{\"statements\":[[0,\" Book Appointment \"]],\"parameters\":[]},null],[8],[0,\"\\n    \"],[6,\"h1\"],[9,\"id\",\"button02\"],[7],[4,\"stylish-button\",null,[[\"type\",\"border\",\"shape\",\"size\",\"textWidth\"],[\"ujarak\",\"medium\",\"round-s\",\"l\",\"thick\"]],{\"statements\":[[0,\" Ask a Physio \"]],\"parameters\":[]},null],[8],[0,\"\\n\\n    \"],[6,\"a\"],[9,\"href\",\"#section02\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n\\n\\n\\n      \"],[6,\"section\"],[9,\"class\",\"cd-section\"],[9,\"style\",\"cursor: pointer;\"],[7],[0,\"\\n        \"],[6,\"ul\"],[9,\"class\",\"cd-bouncy-nav-trigger\"],[7],[8],[0,\"\\n      \"],[8],[0,\" \"],[2,\" .cd-section \"],[0,\"\\n\\n\\n\\n  \"],[8],[0,\" \"],[2,\" cd-fixed-bg \"],[0,\"\\n\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"cd-scrolling-bg cd-color-2 demo\"],[9,\"id\",\"section02\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-container\"],[7],[0,\"\\n        \"],[6,\"p\"],[7],[0,\"\\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!\\n        \"],[8],[0,\"\\n      \"],[8],[0,\" \"],[2,\" cd-container \"],[0,\"\\n        \"],[6,\"a\"],[9,\"href\",\"#section03\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n      \"],[8],[0,\" \"],[2,\" cd-scrolling-bg \"],[0,\"\\n\\n\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-fixed-bg cd-bg-2 demo\"],[9,\"id\",\"section03\"],[7],[0,\"\\n    \"],[6,\"h2\"],[7],[0,\"Lorem ipsum dolor sit amet.\"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"#section04\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-fixed-bg \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-scrolling-bg cd-color-3 demo\"],[9,\"id\",\"section04\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-container\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"\\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!\\n      \"],[8],[0,\"\\n    \"],[8],[0,\" \"],[2,\" cd-container \"],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"#section05\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-scrolling-bg \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-fixed-bg cd-bg-3 demo\"],[9,\"id\",\"section05\"],[7],[0,\"\\n    \"],[6,\"h2\"],[7],[0,\"Lorem ipsum dolor sit amet.\"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"#section06\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-fixed-bg \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-scrolling-bg cd-color-1 demo\"],[9,\"id\",\"section06\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-container\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"\\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!\\n      \"],[8],[0,\"\\n    \"],[8],[0,\" \"],[2,\" cd-container \"],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-scrolling-bg \"],[0,\"\\n\\n  \"],[6,\"a\"],[9,\"href\",\"javascript:\"],[9,\"id\",\"return-to-top\"],[7],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\"icon-chevron-up\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\" \"],[2,\" cd-main-content \"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/welcome-page.hbs" } });
});
define("self-start-front-end/templates/country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "v74cYq1+", "block": "{\"symbols\":[\"country\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n          \"],[6,\"ul\"],[7],[0,\"\\n            \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Countries\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n              \"],[6,\"li\"],[7],[1,[19,1,[\"name\"]],false],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-country\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;\"],[7],[1,[25,\"edit-country\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n              \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n\"],[1,[18,\"add-country\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/country.hbs" } });
});
define("self-start-front-end/templates/gender", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KxdcJy/B", "block": "{\"symbols\":[\"gender\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Genders\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[0,\"\\n            \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-gender\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right; padding-right: 2%;\"],[7],[1,[25,\"edit-gender\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-gender\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/gender.hbs" } });
});
define("self-start-front-end/templates/home", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jvIXP6nu", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"welcome-page\"],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/home.hbs" } });
});
define("self-start-front-end/templates/manage-selections", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Dn+uRsSw", "block": "{\"symbols\":[],\"statements\":[[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/manage-selections.hbs" } });
});
define("self-start-front-end/templates/new-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ipCPrNm1", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"add-patient\",null,[[\"account\"],[[20,[\"account\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/new-patient.hbs" } });
});
define("self-start-front-end/templates/patients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8T7AbAeQ", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[1,[18,\"manage-patients\"],false],[0,\"\\n\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/patients.hbs" } });
});
define("self-start-front-end/templates/province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "71SG2//Q", "block": "{\"symbols\":[\"province\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"province\"],null,{\"statements\":[[0,\"        Add Province\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Provinces\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-province\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-province\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/province.hbs" } });
});
define("self-start-front-end/templates/update-patient", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5tb/Gk2l", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"edit-patient\",null,[[\"pateintsData\",\"DOB\"],[[20,[\"model\"]],[20,[\"model\",\"dateOfBirth\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/update-patient.hbs" } });
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
