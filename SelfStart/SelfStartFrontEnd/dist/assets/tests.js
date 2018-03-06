'use strict';

define('self-start-front-end/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('breakpoints.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'breakpoints.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-country.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-country.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-exercises.js should pass ESLint\n\n83:11 - Unexpected console statement. (no-console)\n218:7 - Unexpected console statement. (no-console)\n227:13 - \'saveImage\' is assigned a value but never used. (no-unused-vars)\n228:9 - Unexpected console statement. (no-console)\n229:9 - Unexpected console statement. (no-console)\n230:9 - Unexpected console statement. (no-console)\n232:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-gender.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-gender.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-patient.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-province.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-province.js should pass ESLint\n\n');
  });

  QUnit.test('components/admin-nav.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/admin-nav.js should pass ESLint\n\n');
  });

  QUnit.test('components/admin-welcome.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/admin-welcome.js should pass ESLint\n\n');
  });

  QUnit.test('components/back-to-top.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/back-to-top.js should pass ESLint\n\n');
  });

  QUnit.test('components/config-selection.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/config-selection.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-country.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-country.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-exercises.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-gender.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-gender.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-patient.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-province.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-province.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-country.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-country.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/edit-exercises.js should pass ESLint\n\n106:11 - Unexpected console statement. (no-console)\n114:7 - Unexpected console statement. (no-console)\n115:7 - Unexpected console statement. (no-console)\n116:7 - Unexpected console statement. (no-console)\n146:7 - Unexpected console statement. (no-console)\n167:13 - Unexpected console statement. (no-console)\n176:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/edit-gender.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-gender.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-patient.js should pass ESLint\n\n');
  });

  QUnit.test('components/manage-patients.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/manage-patients.js should pass ESLint\n\n74:5 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/nav-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/nav-bar.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n11:9 - \'Ember\' is not defined. (no-undef)\n30:7 - Unexpected console statement. (no-console)\n132:11 - Unexpected console statement. (no-console)\n134:13 - Unexpected console statement. (no-console)\n143:13 - Unexpected console statement. (no-console)\n153:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/register-user.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/register-user.js should pass ESLint\n\n38:30 - Unnecessary escape character: \\[. (no-useless-escape)\n38:55 - Unnecessary escape character: \\[. (no-useless-escape)\n40:11 - Unexpected console statement. (no-console)\n66:9 - Unexpected console statement. (no-console)\n91:9 - Unexpected console statement. (no-console)\n114:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/show-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/show-patient.js should pass ESLint\n\n');
  });

  QUnit.test('components/user-info.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/user-info.js should pass ESLint\n\n116:28 - \'patient\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/user-login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/user-login.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n10:9 - \'Ember\' is not defined. (no-undef)\n14:9 - \'self\' is assigned a value but never used. (no-unused-vars)\n34:7 - Unexpected console statement. (no-console)\n50:11 - Unexpected console statement. (no-console)\n52:13 - Unexpected console statement. (no-console)\n61:13 - Unexpected console statement. (no-console)\n71:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/welcome-page.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/welcome-page.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/new-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/new-patient.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/responsive.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/responsive.js should pass ESLint\n\n');
  });

  QUnit.test('models/appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/appointment.js should pass ESLint\n\n');
  });

  QUnit.test('models/city.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/city.js should pass ESLint\n\n');
  });

  QUnit.test('models/country.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/country.js should pass ESLint\n\n');
  });

  QUnit.test('models/exercise.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/exercise.js should pass ESLint\n\n');
  });

  QUnit.test('models/gender.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/gender.js should pass ESLint\n\n');
  });

  QUnit.test('models/image.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/image.js should pass ESLint\n\n');
  });

  QUnit.test('models/marital-status.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/marital-status.js should pass ESLint\n\n');
  });

  QUnit.test('models/patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/patient.js should pass ESLint\n\n');
  });

  QUnit.test('models/province.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/province.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin.js should pass ESLint\n\n');
  });

  QUnit.test('routes/appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/appointment.js should pass ESLint\n\n');
  });

  QUnit.test('routes/city.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/city.js should pass ESLint\n\n');
  });

  QUnit.test('routes/dashboard.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/dashboard.js should pass ESLint\n\n');
  });

  QUnit.test('routes/exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/exercises.js should pass ESLint\n\n');
  });

  QUnit.test('routes/home.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/home.js should pass ESLint\n\n');
  });

  QUnit.test('routes/images.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/images.js should pass ESLint\n\n');
  });

  QUnit.test('routes/manage-selections.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/manage-selections.js should pass ESLint\n\n');
  });

  QUnit.test('routes/message.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/message.js should pass ESLint\n\n');
  });

  QUnit.test('routes/new-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-patient.js should pass ESLint\n\n');
  });

  QUnit.test('routes/patient-file.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/patient-file.js should pass ESLint\n\n');
  });

  QUnit.test('routes/patients.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/patients.js should pass ESLint\n\n');
  });

  QUnit.test('routes/province.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/province.js should pass ESLint\n\n');
  });

  QUnit.test('routes/register.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/register.js should pass ESLint\n\n');
  });

  QUnit.test('routes/update-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/update-patient.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/patient.js should pass ESLint\n\n');
  });

  QUnit.test('transitions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass ESLint\n\n');
  });

  QUnit.test('utils/file-object.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/file-object.js should pass ESLint\n\n');
  });
});
define('self-start-front-end/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('self-start-front-end/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'self-start-front-end/tests/helpers/start-app', 'self-start-front-end/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };
});
define('self-start-front-end/tests/helpers/resolver', ['exports', 'self-start-front-end/resolver', 'self-start-front-end/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('self-start-front-end/tests/helpers/responsive', ['exports', 'ember-responsive/media'], function (exports, _media) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setBreakpointForIntegrationTest = setBreakpointForIntegrationTest;
  var getOwner = Ember.getOwner;
  var classify = Ember.String.classify;


  _media.default.reopen({
    // Change this if you want a different default breakpoint in tests.
    _defaultBreakpoint: 'desktop',

    _breakpointArr: Ember.computed('breakpoints', function () {
      return Object.keys(this.get('breakpoints')) || Ember.A([]);
    }),

    _forceSetBreakpoint: function _forceSetBreakpoint(breakpoint) {
      var found = false;

      var props = {};
      this.get('_breakpointArr').forEach(function (bp) {
        var val = bp === breakpoint;
        if (val) {
          found = true;
        }

        props['is' + classify(bp)] = val;
      });

      if (found) {
        this.setProperties(props);
      } else {
        throw new Error('You tried to set the breakpoint to ' + breakpoint + ', which is not in your app/breakpoint.js file.');
      }
    },
    match: function match() {},
    init: function init() {
      this._super.apply(this, arguments);

      this._forceSetBreakpoint(this.get('_defaultBreakpoint'));
    }
  });

  exports.default = Ember.Test.registerAsyncHelper('setBreakpoint', function (app, breakpoint) {
    // this should use getOwner once that's supported
    var mediaService = app.__deprecatedInstance__.lookup('service:media');
    mediaService._forceSetBreakpoint(breakpoint);
  });
  function setBreakpointForIntegrationTest(container, breakpoint) {
    var mediaService = getOwner(container).lookup('service:media');
    mediaService._forceSetBreakpoint(breakpoint);
    container.set('media', mediaService);

    return mediaService;
  }
});
define('self-start-front-end/tests/helpers/start-app', ['exports', 'self-start-front-end/app', 'self-start-front-end/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('self-start-front-end/tests/integration/components/add-country-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-country', 'Integration | Component | add country', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "YreBgUG/",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-country\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "xKW7HffP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-country\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/add-exercises-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-exercises', 'Integration | Component | add exercises', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "VI552qOF",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-exercises\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "OgMjPmWR",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-exercises\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/add-gender-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-gender', 'Integration | Component | add gender', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "6EERLDCg",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-gender\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "TyEM9K/M",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-gender\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/add-patient-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-patient', 'Integration | Component | add patient', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "BcWXyeh/",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-patient\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "DGXfZ60C",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-patient\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/add-province-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-province', 'Integration | Component | add province', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "IGketj3e",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-province\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "L0oHGqY3",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-province\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/admin-nav-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('admin-nav', 'Integration | Component | admin nav', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "4JDfKsjG",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"admin-nav\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "JW31Rcy9",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"admin-nav\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/admin-welcome-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('admin-welcome', 'Integration | Component | admin welcome', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "U4sFj7Bv",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"admin-welcome\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "hnbbgPVV",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"admin-welcome\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/back-to-top-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('back-to-top', 'Integration | Component | back to top', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "kvDsRgkj",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"back-to-top\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "DEQE/DCb",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"back-to-top\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/config-selection-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('config-selection', 'Integration | Component | config selection', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "bwm5g5vm",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"config-selection\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "OpO0q+BO",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"config-selection\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/delete-country-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-country', 'Integration | Component | delete country', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "yFqis0JG",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-country\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "jnQYPzSi",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-country\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/delete-exercises-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-exercises', 'Integration | Component | delete exercises', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "hNvxw1ed",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-exercises\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "nLyZAXYy",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-exercises\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/delete-gender-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-gender', 'Integration | Component | delete gender', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "uWtaKLC4",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-gender\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Hn6cu5dC",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-gender\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/delete-patient-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-patient', 'Integration | Component | delete patient', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "j/bNDXeV",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-patient\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "lj1Yj4pZ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-patient\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/delete-province-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-province', 'Integration | Component | delete province', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "pnFar+Bs",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-province\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "2rdbFEPD",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-province\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/edit-country-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-country', 'Integration | Component | edit country', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Pu7OVRNf",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-country\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "3JRpMSCM",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-country\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/edit-exercises-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-exercises', 'Integration | Component | edit exercises', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "EJIqNr8E",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-exercises\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "JG+BdyoB",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-exercises\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/edit-gender-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-gender', 'Integration | Component | edit gender', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "yLPAh9hy",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-gender\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Mroo1qHS",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-gender\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/edit-patient-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-patient', 'Integration | Component | edit patient', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "MXLac/7p",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-patient\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "3s24u8FD",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-patient\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/manage-patients-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('manage-patients', 'Integration | Component | manage patients', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "1n/HdgnF",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"manage-patients\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "JGFtGeSY",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"manage-patients\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/nav-bar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('nav-bar', 'Integration | Component | nav bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "23Mh82eG",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"nav-bar\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "rwhJAS6T",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"nav-bar\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/register-user-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('register-user', 'Integration | Component | register user', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "hKd6MT++",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"register-user\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "PYr5cezl",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"register-user\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/show-patient-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('show-patient', 'Integration | Component | show patient', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "MLS/XOTd",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"show-patient\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "CDaa3Vhz",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"show-patient\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/user-info-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('user-info', 'Integration | Component | user info', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Jp7X+uNs",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"user-info\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "xmCmKyZr",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"user-info\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/user-login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('user-login', 'Integration | Component | user login', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "eFH1vq7p",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"user-login\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "QhZwhTKz",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"user-login\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/welcome-page-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('welcome-page', 'Integration | Component | welcome page', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "CH1+OELU",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"welcome-page\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "I47iY4+0",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"welcome-page\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/test-helper', ['self-start-front-end/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit', 'self-start-front-end/tests/helpers/responsive'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('self-start-front-end/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/responsive.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/responsive.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-country-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-country-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-exercises-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-exercises-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-gender-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-gender-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-province-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-province-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/admin-nav-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/admin-nav-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/admin-welcome-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/admin-welcome-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/back-to-top-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/back-to-top-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/config-selection-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/config-selection-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-country-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-country-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-exercises-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-exercises-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-gender-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-gender-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-province-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-province-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-country-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-country-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-exercises-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-exercises-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-gender-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-gender-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/manage-patients-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/manage-patients-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/nav-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/nav-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/register-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/register-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/show-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/show-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/user-info-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/user-info-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/user-login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/user-login-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/welcome-page-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/welcome-page-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/home-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/home-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/new-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mixins/table-common-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/table-common-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/city-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/city-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/country-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/country-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/exercise-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/exercise-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/gender-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/gender-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/image-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/image-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/marital-status-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/marital-status-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/provinces-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/provinces-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/city-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/city-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/dashboard-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/dashboard-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/exercises-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/exercises-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/home-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/home-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/images-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/images-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/manage-selections-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/manage-selections-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/message-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/message-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/new-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/patient-file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/patient-file-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/patients-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/patients-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/province-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/province-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/register-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/register-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/update-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/update-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/file-object-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/file-object-test.js should pass ESLint\n\n');
  });
});
define('self-start-front-end/tests/unit/adapters/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('self-start-front-end/tests/unit/controllers/home-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:home', 'Unit | Controller | home', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('self-start-front-end/tests/unit/controllers/new-patient-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:new-patient', 'Unit | Controller | new patient', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('self-start-front-end/tests/unit/mixins/table-common-test', ['self-start-front-end/mixins/table-common', 'qunit'], function (_tableCommon, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | table common');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var TableCommonObject = Ember.Object.extend(_tableCommon.default);
    var subject = TableCommonObject.create();
    assert.ok(subject);
  });
});
define('self-start-front-end/tests/unit/models/appointment-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('appointment', 'Unit | Model | appointment', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/city-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('city', 'Unit | Model | city', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/country-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('country', 'Unit | Model | country', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/exercise-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('exercise', 'Unit | Model | exercise', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/gender-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('gender', 'Unit | Model | gender', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/image-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('image', 'Unit | Model | image', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/marital-status-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('marital-status', 'Unit | Model | marital status', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/patient-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('patient', 'Unit | Model | patient', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/provinces-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('provinces', 'Unit | Model | provinces', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/routes/admin-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin', 'Unit | Route | admin', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/appointment-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:appointment', 'Unit | Route | appointment', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/city-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:city', 'Unit | Route | city', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/dashboard-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:dashboard', 'Unit | Route | dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/exercises-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:exercises', 'Unit | Route | exercises', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/home-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:home', 'Unit | Route | home', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/images-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:images', 'Unit | Route | images', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/manage-selections-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:manage-selections', 'Unit | Route | manage selections', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/message-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:message', 'Unit | Route | message', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/new-patient-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:new-patient', 'Unit | Route | new patient', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/patient-file-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:patient-file', 'Unit | Route | patient file', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/patients-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:patients', 'Unit | Route | patients', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/province-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:province', 'Unit | Route | province', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/register-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:register', 'Unit | Route | register', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/update-patient-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:update-patient', 'Unit | Route | update patient', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/serializers/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('application', 'Unit | Serializer | application', {
    // Specify the other units that are required for this test.
    needs: ['serializer:application']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('self-start-front-end/tests/unit/serializers/patient-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('patient', 'Unit | Serializer | patient', {
    // Specify the other units that are required for this test.
    needs: ['serializer:patient']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('self-start-front-end/tests/unit/utils/file-object-test', ['self-start-front-end/utils/file-object', 'qunit'], function (_fileObject, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | file object');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _fileObject.default)();
    assert.ok(result);
  });
});
require('self-start-front-end/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
