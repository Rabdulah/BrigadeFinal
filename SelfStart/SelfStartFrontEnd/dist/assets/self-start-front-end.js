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
      assignDate: function assignDate(date) {
        this.set('selectedDate', date);
      },


      save: function save() {

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
          return true;
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
    provinces: _emberData.default.attr(),
    cities: _emberData.default.attr(),
    dateOfBirth: _emberData.default.attr(),
    healthCardNumber: _emberData.default.attr(),
    occupation: _emberData.default.attr(),
    maritalStatus: _emberData.default.attr(),
    gender: _emberData.default.attr(),
    phoneNumber: _emberData.default.attr(),
    postalCode: _emberData.default.attr()

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
    this.route('marital-status');
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
define("self-start-front-end/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+xw12uYv", "block": "{\"symbols\":[],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/reset.css\"]]],[7],[8],[0,\" \"],[2,\" CSS reset \"],[0,\"\\n\\n\"],[4,\"nav-bar\",null,null,{\"statements\":[[0,\"\\n    \"],[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/application.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "oKuCA1Xa", "block": "{\"symbols\":[\"oneCountry\",\"oneStatus\",\"oneGender\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/form-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"form\"],[9,\"class\",\"cd-form floating-labels\"],[3,\"action\",[[19,0,[]],\"save\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Personal Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"First Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"givenName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Last Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"user\",\"text\",[20,[\"familyName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Date of Birth\"],[8],[0,\"\\n      \"],[6,\"input\"],[9,\"class\",\"date\"],[9,\"type\",\"date\"],[10,\"value\",[18,\"selectedDate\"],null],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"assignDate\"],[[\"value\"],[\"target.value\"]]],null],[9,\"required\",\"\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Gender\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"gender\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"genderModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,3,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"gender\",\"name\"]],[19,3,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,3,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Marital Status\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"people\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"maritalStatus\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"maritalStatusModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,2,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"maritalStatus\",\"name\"]],[19,2,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,2,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Occupation\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"company\",\"text\",[20,[\"occupation\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Health Card Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"card\",\"text\",[20,[\"healthCardNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Address\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[7],[0,\"Street Name\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"home\",\"text\",[20,[\"streetName\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Unit\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\"],[\"bookmark\",\"text\",[20,[\"apartment\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Postal/ZIP Code\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"flag\",\"text\",[20,[\"postalCode\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h4\"],[7],[0,\"Country\"],[8],[0,\"\\n      \"],[6,\"p\"],[9,\"class\",\"cd-select icon\"],[7],[0,\"\\n        \"],[6,\"select\"],[9,\"class\",\"world\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"country\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"conutryModel\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[10,\"value\",[19,1,[\"name\"]],null],[10,\"selected\",[25,\"eq\",[[20,[\"country\",\"name\"]],[19,1,[\"name\"]]],null],null],[7],[0,\"\\n              \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n    \"],[6,\"legend\"],[7],[0,\"Contact Info\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-name\"],[7],[0,\"Phone Number\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"phone\",\"text\",[20,[\"phoneNumber\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"icon\"],[7],[0,\"\\n      \"],[6,\"label\"],[9,\"class\",\"cd-label\"],[9,\"for\",\"cd-email\"],[7],[0,\"Email\"],[8],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"class\",\"type\",\"value\",\"required\"],[\"email\",\"email\",[20,[\"email\"]],true]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\\n\\n\\n  \"],[6,\"fieldset\"],[7],[0,\"\\n\\n\\n    \"],[2,\"<div>\"],[0,\"\\n      \"],[2,\"<h4>Project type</h4>\"],[0,\"\\n\\n      \"],[2,\"<ul class=\\\"cd-form-list\\\">\"],[0,\"\\n        \"],[2,\"<li>\"],[0,\"\\n          \"],[2,\"<input type=\\\"radio\\\" name=\\\"radio-button\\\" id=\\\"cd-radio-1\\\" checked>\"],[0,\"\\n          \"],[2,\"<label for=\\\"cd-radio-1\\\">Choice 1</label>\"],[0,\"\\n        \"],[2,\"</li>\"],[0,\"\\n\\n        \"],[2,\"<li>\"],[0,\"\\n          \"],[2,\"<input type=\\\"radio\\\" name=\\\"radio-button\\\" id=\\\"cd-radio-2\\\">\"],[0,\"\\n          \"],[2,\"<label for=\\\"cd-radio-2\\\">Choice 2</label>\"],[0,\"\\n        \"],[2,\"</li>\"],[0,\"\\n\\n        \"],[2,\"<li>\"],[0,\"\\n          \"],[2,\"<input type=\\\"radio\\\" name=\\\"radio-button\\\" id=\\\"cd-radio-3\\\">\"],[0,\"\\n          \"],[2,\"<label for=\\\"cd-radio-3\\\">Choice 3</label>\"],[0,\"\\n        \"],[2,\"</li>\"],[0,\"\\n      \"],[2,\"</ul>\"],[0,\"\\n    \"],[2,\"</div>\"],[0,\"\\n\\n    \"],[2,\"<div>\"],[0,\"\\n      \"],[2,\"<h4>Features</h4>\"],[0,\"\\n\\n      \"],[2,\"<ul class=\\\"cd-form-list\\\">\"],[0,\"\\n        \"],[2,\"<li>\"],[0,\"\\n          \"],[2,\"<input type=\\\"checkbox\\\" id=\\\"cd-checkbox-1\\\">\"],[0,\"\\n          \"],[2,\"<label for=\\\"cd-checkbox-1\\\">Option 1</label>\"],[0,\"\\n        \"],[2,\"</li>\"],[0,\"\\n\\n        \"],[2,\"<li>\"],[0,\"\\n          \"],[2,\"<input type=\\\"checkbox\\\" id=\\\"cd-checkbox-2\\\">\"],[0,\"\\n          \"],[2,\"<label for=\\\"cd-checkbox-2\\\">Option 2</label>\"],[0,\"\\n        \"],[2,\"</li>\"],[0,\"\\n\\n        \"],[2,\"<li>\"],[0,\"\\n          \"],[2,\"<input type=\\\"checkbox\\\" id=\\\"cd-checkbox-3\\\">\"],[0,\"\\n          \"],[2,\"<label for=\\\"cd-checkbox-3\\\">Option 3</label>\"],[0,\"\\n        \"],[2,\"</li>\"],[0,\"\\n      \"],[2,\"</ul>\"],[0,\"\\n    \"],[2,\"</div>\"],[0,\"\\n\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"input\"],[9,\"type\",\"submit\"],[9,\"value\",\"Submit\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/add-patient.hbs" } });
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
define("self-start-front-end/templates/components/delete-status", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jCwNEmuY", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"style\",\"cursor: pointer;\"],[9,\"title\",\"Delete\"],[3,\"action\",[[19,0,[]],\"openModal\"]],[7],[6,\"i\"],[9,\"class\",\"red remove icon\"],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"ui-modal\",null,[[\"name\",\"class\"],[[20,[\"modalName\"]],[20,[\"modalName\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"ui icon header\"],[7],[0,\"\\n    Please Confirm ...\\n  \"],[8],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n    \"],[6,\"p\"],[7],[0,\"Are you sure you need to delete this element?\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"actions\"],[9,\"style\",\"padding:0\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ok \"],[9,\"style\",\"float:left; width: 50%; cursor: pointer; background: #fc7169; color:white; text-align: center;\"],[7],[0,\"Yes\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cancel \"],[9,\"style\",\"float:left; width: 50%;  cursor: pointer; background: #b6bece; color:white; text-align: center;\"],[7],[0,\"No\"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/delete-status.hbs" } });
});
define("self-start-front-end/templates/components/nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LJ3kgwfn", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"header\"],[9,\"class\",\"cd-header\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"id\",\"cd-logo\"],[7],[6,\"a\"],[7],[4,\"link-to\",[\"home\"],null,{\"statements\":[[0,\"Home\"]],\"parameters\":[]},null],[8],[8],[0,\"\\n\\n  \"],[6,\"nav\"],[9,\"class\",\"cd-main-nav\"],[7],[0,\"\\n    \"],[6,\"ul\"],[7],[0,\"\\n      \"],[2,\" inser more links here \"],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"About\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"How it Works\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Services\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Assessment\"],[8],[8],[0,\"\\n      \"],[6,\"li\"],[7],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Blog\"],[8],[8],[0,\"\\n      \"],[6,\"a\"],[9,\"href\",\"#0\"],[7],[0,\"Contact\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-main-nav \"],[0,\"\\n\"],[8],[0,\"\\n\"],[11,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/nav-bar.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "TwJLVOCq", "block": "{\"symbols\":[],\"statements\":[[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/home-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\"],[2,\" PRELOADER \"],[0,\"\\n\"],[6,\"div\"],[9,\"id\",\"preloader\"],[7],[6,\"div\"],[7],[6,\"em\"],[7],[8],[6,\"em\"],[7],[8],[6,\"em\"],[7],[8],[6,\"em\"],[7],[8],[8],[8],[0,\"\\n\"],[2,\" //PRELOADER \"],[0,\"\\n\\n\"],[6,\"main\"],[9,\"class\",\"cd-main-content\"],[7],[0,\"\\n\"],[4,\"admin-nav\",null,null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"cd-fixed-bg cd-bg-1 demo\"],[9,\"id\",\"section01\"],[7],[0,\"\\n    \"],[6,\"h1\"],[9,\"id\",\"logo-image\"],[7],[6,\"img\"],[9,\"src\",\"assets/images/home/Header.png\"],[9,\"style\",\"max-width: 50%;\\n  height: auto;\\n  width: auto\\\\9;\"],[7],[8],[8],[0,\"\\n\\n    \"],[6,\"h1\"],[9,\"id\",\"button01\"],[7],[4,\"stylish-button\",null,[[\"type\",\"border\",\"shape\",\"size\",\"textWidth\",\"customClasses\"],[\"ujarak\",\"medium\",\"round-s\",\"l\",\"thick\",\"btn-primary\"]],{\"statements\":[[0,\" Book Appointment \"]],\"parameters\":[]},null],[8],[0,\"\\n    \"],[6,\"h1\"],[9,\"id\",\"button02\"],[7],[4,\"stylish-button\",null,[[\"type\",\"border\",\"shape\",\"size\",\"textWidth\"],[\"ujarak\",\"medium\",\"round-s\",\"l\",\"thick\"]],{\"statements\":[[0,\" Ask a Physio \"]],\"parameters\":[]},null],[8],[0,\"\\n\\n    \"],[6,\"a\"],[9,\"href\",\"#section02\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n\\n\\n\\n    \"],[6,\"section\"],[9,\"class\",\"cd-section\"],[9,\"style\",\"cursor: pointer;\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"cd-bouncy-nav-trigger\"],[7],[0,\"Admin\"],[8],[0,\"\\n    \"],[8],[0,\" \"],[2,\" .cd-section \"],[0,\"\\n\\n\\n  \"],[8],[0,\" \"],[2,\" cd-fixed-bg \"],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\\n        \"],[6,\"div\"],[9,\"class\",\"cd-scrolling-bg cd-color-2 demo\"],[9,\"id\",\"section02\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"cd-container\"],[7],[0,\"\\n        \"],[6,\"p\"],[7],[0,\"\\n          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!\\n        \"],[8],[0,\"\\n      \"],[8],[0,\" \"],[2,\" cd-container \"],[0,\"\\n        \"],[6,\"a\"],[9,\"href\",\"#section03\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n      \"],[8],[0,\" \"],[2,\" cd-scrolling-bg \"],[0,\"\\n\\n\\n\\n\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-fixed-bg cd-bg-2 demo\"],[9,\"id\",\"section03\"],[7],[0,\"\\n    \"],[6,\"h2\"],[7],[0,\"Lorem ipsum dolor sit amet.\"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"#section04\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-fixed-bg \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-scrolling-bg cd-color-3 demo\"],[9,\"id\",\"section04\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-container\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"\\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!\\n      \"],[8],[0,\"\\n    \"],[8],[0,\" \"],[2,\" cd-container \"],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"#section05\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-scrolling-bg \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-fixed-bg cd-bg-3 demo\"],[9,\"id\",\"section05\"],[7],[0,\"\\n    \"],[6,\"h2\"],[7],[0,\"Lorem ipsum dolor sit amet.\"],[8],[0,\"\\n    \"],[6,\"a\"],[9,\"href\",\"#section06\"],[7],[6,\"span\"],[7],[8],[0,\"Scroll\"],[8],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-fixed-bg \"],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"cd-scrolling-bg cd-color-1 demo\"],[9,\"id\",\"section06\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-container\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"\\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt suscipit similique, dolor corrupti cumque qui consectetur autem laborum fuga quas ipsam doloribus sequi, mollitia, repellendus sapiente repudiandae labore rerum amet culpa inventore, modi non. Quo nisi veritatis vitae nam, labore fugit. Inventore culpa iusto, officia exercitationem. Voluptates quibusdam odit odio incidunt consequatur, consectetur aspernatur optio vitae molestias, quas repellendus fugit ullam culpa, eligendi et dignissimos voluptatibus illum? Molestias aliquam nostrum quasi ipsa culpa, iusto explicabo ut error, consequuntur enim temporibus, adipisci tempora voluptate, id consequatur mollitia eveniet blanditiis. Illo quod repellendus alias? Cum rem doloremque adipisci accusantium? Saepe, necessitatibus!\\n      \"],[8],[0,\"\\n    \"],[8],[0,\" \"],[2,\" cd-container \"],[0,\"\\n  \"],[8],[0,\" \"],[2,\" cd-scrolling-bg \"],[0,\"\\n\\n  \"],[6,\"a\"],[9,\"href\",\"javascript:\"],[9,\"id\",\"return-to-top\"],[7],[0,\"\\n    \"],[6,\"i\"],[9,\"class\",\"icon-chevron-up\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\" \"],[2,\" cd-main-content \"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/components/welcome-page.hbs" } });
});
define("self-start-front-end/templates/country", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0MP3xNFp", "block": "{\"symbols\":[\"country\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add Province\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n          \"],[6,\"ul\"],[7],[0,\"\\n            \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Countries\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n              \"],[6,\"li\"],[7],[1,[19,1,[\"name\"]],false],[0,\"\\n                \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-country\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n              \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n\"],[1,[18,\"add-country\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/country.hbs" } });
});
define("self-start-front-end/templates/gender", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7HdqDanr", "block": "{\"symbols\":[\"gender\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add Province\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Genders\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[0,\"\\n            \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-gender\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-gender\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/gender.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "y7Dk1NLT", "block": "{\"symbols\":[],\"statements\":[[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n        Add Province\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/manage-selections.hbs" } });
});
define("self-start-front-end/templates/marital-status", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "E3p0tKqb", "block": "{\"symbols\":[\"maritalStatus\"],\"statements\":[[6,\"link\"],[9,\"href\",\"http://fonts.googleapis.com/css?family=Ubuntu:400,700\"],[9,\"rel\",\"stylesheet\"],[9,\"type\",\"text/css\"],[7],[8],[0,\"\\n\\n\"],[6,\"link\"],[9,\"integrity\",\"\"],[9,\"rel\",\"stylesheet\"],[10,\"href\",[26,[[18,\"rootURL\"],\"assets/css/table-style.css\"]]],[7],[8],[0,\" \"],[2,\" Resource style \"],[0,\"\\n\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"ui centered cards\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Countries\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"country\"],null,{\"statements\":[[0,\"        Add Country\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Provinces\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add Province\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Cities\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n      Add City\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Genders\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"gender\"],null,{\"statements\":[[0,\"        Add Gender\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"card\"],[9,\"style\",\"width:12%\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"header\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"ui bottom attached button\"],[7],[0,\"\\n      \"],[6,\"i\"],[9,\"class\",\"add icon\"],[7],[8],[0,\"\\n\\n\"],[4,\"link-to\",[\"marital-status\"],null,{\"statements\":[[0,\"        Add Marital Status\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[6,\"section\"],[9,\"id\",\"cd-section\"],[7],[0,\"\\n  \"],[6,\"section\"],[9,\"id\",\"cd-table\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"cd-table-container\"],[7],[0,\"\\n      \"],[6,\"ul\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"style\",\"  text-align: center; font-size: 1.2rem; text-transform: uppercase;\\n                          font-weight: bold; color: white; background-color: #f58b4c;\"],[7],[0,\"Marital Statuses\"],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"li\"],[7],[0,\"\\n            \"],[1,[19,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"p\"],[9,\"style\",\"float: right;\"],[7],[1,[25,\"delete-status\",null,[[\"ID\"],[[19,1,[\"id\"]]]]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\" \"],[2,\" cd-table \"],[0,\"\\n  \"],[1,[18,\"add-status\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/marital-status.hbs" } });
});
define("self-start-front-end/templates/patients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+Z1Jkuc6", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-patient\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/patients.hbs" } });
});
define("self-start-front-end/templates/province", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WDjCl31w", "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}", "meta": { "moduleName": "self-start-front-end/templates/province.hbs" } });
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
  require("self-start-front-end/app")["default"].create({"name":"self-start-front-end","version":"0.0.0+88b73220"});
}
//# sourceMappingURL=self-start-front-end.map
