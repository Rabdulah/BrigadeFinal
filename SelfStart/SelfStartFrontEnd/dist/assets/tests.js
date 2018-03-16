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
    assert.ok(false, 'components/add-exercises.js should pass ESLint\n\n85:11 - Unexpected console statement. (no-console)\n226:7 - Unexpected console statement. (no-console)\n235:13 - \'saveImage\' is assigned a value but never used. (no-unused-vars)\n236:9 - Unexpected console statement. (no-console)\n237:9 - Unexpected console statement. (no-console)\n238:9 - Unexpected console statement. (no-console)\n240:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-form-question.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-form-question.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-form.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-form.js should pass ESLint\n\n22:17 - \'form\' is assigned a value but never used. (no-unused-vars)\n27:13 - Unexpected console statement. (no-console)\n36:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-gender.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-gender.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-patient.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-physiotherapist.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-physiotherapist.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-province.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-province.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-question.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-question.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-rehabplan.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-rehabplan.js should pass ESLint\n\n');
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

  QUnit.test('components/book-appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/book-appointment.js should pass ESLint\n\n61:11 - \'transitionEnd\' is assigned a value but never used. (no-unused-vars)\n124:13 - \'self\' is assigned a value but never used. (no-unused-vars)\n320:13 - \'self\' is assigned a value but never used. (no-unused-vars)\n431:16 - \'transformElement\' is defined but never used. (no-unused-vars)\n447:7 - Unexpected console statement. (no-console)\n450:11 - \'client\' is assigned a value but never used. (no-unused-vars)\n453:7 - Unexpected console statement. (no-console)\n557:7 - Unexpected console statement. (no-console)\n568:11 - Unexpected console statement. (no-console)\n611:7 - Unexpected console statement. (no-console)\n622:7 - Unexpected console statement. (no-console)\n625:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/config-selection.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/config-selection.js should pass ESLint\n\n');
  });

  QUnit.test('components/confirm-booking.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/confirm-booking.js should pass ESLint\n\n26:41 - \'qid\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/delete-country.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-country.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-exercises.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-form.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-gender.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-gender.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-patient.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-physiotherapist.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-physiotherapist.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-question.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-question.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-rehabplan.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-rehabplan.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-status.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-status.js should pass ESLint\n\n');
  });

  QUnit.test('components/display-questions.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/display-questions.js should pass ESLint\n\n4:9 - \'Ember\' is not defined. (no-undef)\n8:16 - \'Ember\' is not defined. (no-undef)\n16:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/edit-country.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-country.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/edit-exercises.js should pass ESLint\n\n110:11 - Unexpected console statement. (no-console)\n118:7 - Unexpected console statement. (no-console)\n119:7 - Unexpected console statement. (no-console)\n120:7 - Unexpected console statement. (no-console)\n150:7 - Unexpected console statement. (no-console)\n174:13 - Unexpected console statement. (no-console)\n183:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/edit-form.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/edit-form.js should pass ESLint\n\n4:9 - \'Ember\' is not defined. (no-undef)\n6:12 - \'Ember\' is not defined. (no-undef)\n7:19 - \'Ember\' is not defined. (no-undef)\n9:16 - \'Ember\' is not defined. (no-undef)\n17:9 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('components/edit-gender.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-gender.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-patient.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-physiotherapist.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/edit-physiotherapist.js should pass ESLint\n\n105:11 - \'physiotherapist\' is assigned a value but never used. (no-unused-vars)\n116:9 - \'rec\' is not defined. (no-undef)');
  });

  QUnit.test('components/edit-rehabplan.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-rehabplan.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-status.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-status.js should pass ESLint\n\n');
  });

  QUnit.test('components/list-forms.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/list-forms.js should pass ESLint\n\n');
  });

  QUnit.test('components/manage-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/manage-form.js should pass ESLint\n\n');
  });

  QUnit.test('components/manage-patients.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/manage-patients.js should pass ESLint\n\n74:5 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/modify-question.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/modify-question.js should pass ESLint\n\n');
  });

  QUnit.test('components/nav-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/nav-bar.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n12:9 - \'Ember\' is not defined. (no-undef)\n31:7 - Unexpected console statement. (no-console)\n134:11 - Unexpected console statement. (no-console)\n136:13 - Unexpected console statement. (no-console)\n145:13 - Unexpected console statement. (no-console)\n155:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/parse-question.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/parse-question.js should pass ESLint\n\n');
  });

  QUnit.test('components/register-user.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/register-user.js should pass ESLint\n\n38:30 - Unnecessary escape character: \\[. (no-useless-escape)\n38:55 - Unnecessary escape character: \\[. (no-useless-escape)\n40:11 - Unexpected console statement. (no-console)\n66:9 - Unexpected console statement. (no-console)\n91:9 - Unexpected console statement. (no-console)\n114:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/show-form-questions.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/show-form-questions.js should pass ESLint\n\n15:13 - Unexpected console statement. (no-console)\n27:26 - \'fid\' is defined but never used. (no-unused-vars)\n28:17 - \'thisForm\' is assigned a value but never used. (no-unused-vars)\n35:13 - Unexpected console statement. (no-console)\n39:13 - Unexpected console statement. (no-console)\n40:13 - Unexpected console statement. (no-console)\n46:13 - Unexpected console statement. (no-console)\n69:13 - Unexpected console statement. (no-console)\n72:21 - \'x\' is already defined. (no-redeclare)');
  });

  QUnit.test('components/show-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/show-patient.js should pass ESLint\n\n');
  });

  QUnit.test('components/simple-example.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/simple-example.js should pass ESLint\n\n');
  });

  QUnit.test('components/upload-file.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/upload-file.js should pass ESLint\n\n94:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/user-info.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/user-info.js should pass ESLint\n\n116:28 - \'patient\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/user-login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/user-login.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n10:9 - \'Ember\' is not defined. (no-undef)\n14:9 - \'self\' is assigned a value but never used. (no-unused-vars)\n34:7 - Unexpected console statement. (no-console)\n50:11 - Unexpected console statement. (no-console)\n52:13 - Unexpected console statement. (no-console)\n61:13 - Unexpected console statement. (no-console)\n71:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/view-appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/view-appointment.js should pass ESLint\n\n');
  });

  QUnit.test('components/view-schedule.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/view-schedule.js should pass ESLint\n\n50:9 - \'transitionEnd\' is assigned a value but never used. (no-unused-vars)\n136:11 - \'self\' is assigned a value but never used. (no-unused-vars)\n181:14 - \'transformElement\' is defined but never used. (no-unused-vars)\n213:7 - Unexpected console statement. (no-console)\n218:9 - Unexpected console statement. (no-console)\n219:9 - Unexpected console statement. (no-console)\n279:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/welcome-page.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/welcome-page.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/form-display.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/form-display.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/new-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/new-patient.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/questions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/questions.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/rehabplans.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/rehabplans.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/compare.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/compare.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/index-plus-one.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/index-plus-one.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/indexpicker.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/indexpicker.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/input-identification.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/input-identification.js should pass ESLint\n\n8:3 - Unexpected console statement. (no-console)');
  });

  QUnit.test('helpers/is-equal.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/is-equal.js should pass ESLint\n\n4:3 - Unexpected console statement. (no-console)');
  });

  QUnit.test('helpers/mc-display.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/mc-display.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/number-of-mc.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/number-of-mc.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/responsive.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/responsive.js should pass ESLint\n\n');
  });

  QUnit.test('models/answer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/answer.js should pass ESLint\n\n');
  });

  QUnit.test('models/appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/appointment.js should pass ESLint\n\n');
  });

  QUnit.test('models/assessment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/assessment-test.js should pass ESLint\n\n2:10 - \'empty\' is defined but never used. (no-unused-vars)');
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

  QUnit.test('models/form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/form.js should pass ESLint\n\n');
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

  QUnit.test('models/physiotherapest.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/physiotherapest.js should pass ESLint\n\n');
  });

  QUnit.test('models/province.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/province.js should pass ESLint\n\n');
  });

  QUnit.test('models/question-order.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/question-order.js should pass ESLint\n\n');
  });

  QUnit.test('models/question.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/question.js should pass ESLint\n\n');
  });

  QUnit.test('models/rehabilitationplan.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/rehabilitationplan.js should pass ESLint\n\n');
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

  QUnit.test('routes/exercise.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/exercise.js should pass ESLint\n\n');
  });

  QUnit.test('routes/exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/exercises.js should pass ESLint\n\n');
  });

  QUnit.test('routes/form-display.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/form-display.js should pass ESLint\n\n');
  });

  QUnit.test('routes/forms.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/forms.js should pass ESLint\n\n');
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

  QUnit.test('routes/new-exercise.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-exercise.js should pass ESLint\n\n');
  });

  QUnit.test('routes/new-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-patient.js should pass ESLint\n\n');
  });

  QUnit.test('routes/new-rehabplans.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-rehabplans.js should pass ESLint\n\n');
  });

  QUnit.test('routes/patient-file.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/patient-file.js should pass ESLint\n\n');
  });

  QUnit.test('routes/patients.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/patients.js should pass ESLint\n\n');
  });

  QUnit.test('routes/physiotherapists.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/physiotherapists.js should pass ESLint\n\n');
  });

  QUnit.test('routes/province.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/province.js should pass ESLint\n\n');
  });

  QUnit.test('routes/questions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/questions.js should pass ESLint\n\n');
  });

  QUnit.test('routes/register.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/register.js should pass ESLint\n\n');
  });

  QUnit.test('routes/rehabplans.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rehabplans.js should pass ESLint\n\n');
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
define('self-start-front-end/tests/helpers/ember-power-select', ['exports', 'ember-power-select/test-support/helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = exports.touchTrigger = exports.nativeTouch = exports.clickTrigger = exports.typeInSearch = exports.triggerKeydown = exports.nativeMouseUp = exports.nativeMouseDown = exports.findContains = undefined;
  exports.default = deprecatedRegisterHelpers;


  function deprecateHelper(fn, name) {
    return function () {
      (true && !(false) && Ember.deprecate('DEPRECATED `import { ' + name + ' } from \'../../tests/helpers/ember-power-select\';` is deprecated. Please, replace it with `import { ' + name + ' } from \'ember-power-select/test-support/helpers\';`', false, { until: '1.11.0', id: 'ember-power-select-test-support-' + name }));

      return fn.apply(undefined, arguments);
    };
  }

  var findContains = deprecateHelper(_helpers.findContains, 'findContains');
  var nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  var nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  var triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  var typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  var clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  var nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  var touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  var selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, { until: '1.11.0', id: 'ember-power-select-test-support-register-helpers' }));

    return (0, _helpers.default)();
  }

  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;
  exports.selectChoose = selectChoose;
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
define('self-start-front-end/tests/integration/components/add-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-form', 'Integration | Component | add form', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Ihn44m4a",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-form\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Olta0t7i",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-form\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/add-physiotherapist-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-physiotherapist', 'Integration | Component | add physiotherapist', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "2L0VfaJ6",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-physiotherapist\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "oceeKh4W",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-physiotherapist\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/add-question-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-question', 'Integration | Component | add question', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "8Uqx/0cN",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-question\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "7U/Xnr2f",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-question\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/add-rehabplan-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-rehabplan', 'Integration | Component | add rehabplan', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "1Xzau0nh",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-rehabplan\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "W12jr0QV",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-rehabplan\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/book-appointment-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('book-appointment', 'Integration | Component | book appointment', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "NdIYnWMu",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"book-appointment\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "I23GB3If",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"book-appointment\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/confirm-booking-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('confirm-booking', 'Integration | Component | confirm booking', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "v5Lyyv2I",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"confirm-booking\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "yo05rwU1",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"confirm-booking\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/delete-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-form', 'Integration | Component | delete form', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "6v4kecE7",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-form\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "qpHS4c0j",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-form\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/delete-physiotherapist-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-physiotherapist', 'Integration | Component | delete physiotherapist', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "qYG7IdOz",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-physiotherapist\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ZkYMjcTw",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-physiotherapist\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/delete-question-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-question', 'Integration | Component | delete question', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "KKV1s7w+",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-question\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ojQ4YWdb",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-question\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/delete-rehabplan-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-rehabplan', 'Integration | Component | delete rehabplan', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "j+4mWThs",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-rehabplan\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "EDtNnsrm",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-rehabplan\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/display-questions-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('display-questions', 'Integration | Component | display questions', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ohDdx9uF",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"display-questions\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "X5z97jjl",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"display-questions\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-form', 'Integration | Component | edit form', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "6cQfsP4N",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-form\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "aErfLX51",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-form\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/edit-physiotherapist-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-physiotherapist', 'Integration | Component | edit physiotherapist', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "kDmUYLx6",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-physiotherapist\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "1jTTEcnj",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-physiotherapist\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/edit-rehabplan-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-rehabplan', 'Integration | Component | edit rehabplan', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "XFCkeT+W",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-rehabplan\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "zlzl0bjs",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-rehabplan\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/list-forms-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('list-forms', 'Integration | Component | list forms', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "8foyeksP",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"list-forms\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "tc6nx0Xl",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"list-forms\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/manage-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('manage-form', 'Integration | Component | manage form', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "3QvFGct2",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"manage-form\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "QvbIQtkp",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"manage-form\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/modify-question-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('modify-question', 'Integration | Component | modify question', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "lnFT5Un5",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"modify-question\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "dEWRlZ9q",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"modify-question\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/parse-question-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('parse-question', 'Integration | Component | parse question', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "3eIW3CM9",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"parse-question\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "bmt3TjJe",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"parse-question\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/show-form-questions-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('show-form-questions', 'Integration | Component | show form questions', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "mhUiiyxF",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"show-form-questions\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "1R3+O6DT",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"show-form-questions\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/simple-example-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('simple-example', 'Integration | Component | simple example', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "TbZjxy9y",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"simple-example\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Hb4ZgQDk",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"simple-example\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/upload-file-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('upload-file', 'Integration | Component | upload file', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "5TkSC30a",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"upload-file\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "wD6saKd7",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"upload-file\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/view-appointment-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('view-appointment', 'Integration | Component | view appointment', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "wHWZ+Nta",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"view-appointment\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "5E6wqLfG",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"view-appointment\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/view-schedule-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('view-schedule', 'Integration | Component | view schedule', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "kV5YlrR7",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"view-schedule\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "RfMug7ud",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"view-schedule\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/helpers/compare-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('compare', 'helper:compare', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "Q+uXofJN",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"compare\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('self-start-front-end/tests/integration/helpers/index-plus-one-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('index-plus-one', 'helper:index-plus-one', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "DLg8u0h7",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"index-plus-one\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('self-start-front-end/tests/integration/helpers/indexpicker-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('indexpicker', 'helper:indexpicker', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "6Xoked9E",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"indexpicker\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('self-start-front-end/tests/integration/helpers/input-identification-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('input-identification', 'helper:input-identification', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "tz1nLuQG",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input-identification\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('self-start-front-end/tests/integration/helpers/is-equal-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('is-equal', 'helper:is-equal', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "K2xUbCcD",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"is-equal\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('self-start-front-end/tests/integration/helpers/mc-display-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('mc-display', 'helper:mc-display', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "DCrDRcfj",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"mc-display\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('self-start-front-end/tests/integration/helpers/number-of-mc-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('number-of-mc', 'helper:number-of-mc', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "gmYiInYv",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"number-of-mc\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
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

  QUnit.test('integration/components/add-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-gender-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-gender-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-physiotherapist-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-physiotherapist-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-question-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-question-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-rehabplan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-rehabplan-test.js should pass ESLint\n\n');
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

  QUnit.test('integration/components/book-appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/book-appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/config-selection-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/config-selection-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/confirm-booking-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/confirm-booking-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-country-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-country-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-exercises-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-exercises-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-gender-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-gender-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-physiotherapist-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-physiotherapist-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-question-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-question-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-rehabplan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-rehabplan-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/display-questions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/display-questions-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-country-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-country-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-exercises-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-exercises-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-gender-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-gender-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-physiotherapist-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-physiotherapist-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-rehabplan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-rehabplan-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/list-forms-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/list-forms-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/manage-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/manage-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/manage-patients-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/manage-patients-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/modify-question-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/modify-question-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/nav-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/nav-bar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/parse-question-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/parse-question-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/register-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/register-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/show-form-questions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/show-form-questions-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/show-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/show-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/simple-example-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/simple-example-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/upload-file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/upload-file-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/user-info-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/user-info-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/user-login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/user-login-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/view-appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/view-appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/view-schedule-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/view-schedule-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/welcome-page-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/welcome-page-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/compare-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/compare-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/index-plus-one-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/index-plus-one-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/indexpicker-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/indexpicker-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/input-identification-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/input-identification-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/is-equal-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/is-equal-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/mc-display-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/mc-display-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/number-of-mc-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/number-of-mc-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/form-display-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/form-display-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/home-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/home-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/new-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/new-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/questions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/questions-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/rehabplans-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/rehabplans-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mixins/table-common-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/table-common-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/answer-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/answer-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/assesment-test-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/assesment-test-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/models/form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/form-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/models/physiotherapest-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/physiotherapest-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/provinces-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/provinces-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/question-order-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/question-order-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/question-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/question-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/rehabilitationplan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/rehabilitationplan-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/routes/exercise-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/exercise-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/exercises-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/exercises-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/form-display-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/form-display-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/forms-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/forms-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/routes/new-exercise-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-exercise-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/new-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/new-rehabplans-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-rehabplans-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/patient-file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/patient-file-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/patients-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/patients-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/physiotherapists-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/physiotherapists-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/province-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/province-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/questions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/questions-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/register-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/register-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/rehabplans-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rehabplans-test.js should pass ESLint\n\n');
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
define('self-start-front-end/tests/unit/controllers/form-display-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:form-display', 'Unit | Controller | form display', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
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
define('self-start-front-end/tests/unit/controllers/questions-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:questions', 'Unit | Controller | questions', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('self-start-front-end/tests/unit/controllers/rehabplans-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:rehabplans', 'Unit | Controller | rehabplans', {
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
define('self-start-front-end/tests/unit/models/answer-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('answer', 'Unit | Model | answer', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
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
define('self-start-front-end/tests/unit/models/assesment-test-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('assesment-test', 'Unit | Model | assesment test', {
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
define('self-start-front-end/tests/unit/models/form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('form', 'Unit | Model | form', {
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
define('self-start-front-end/tests/unit/models/physiotherapest-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('physiotherapest', 'Unit | Model | physiotherapest', {
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
define('self-start-front-end/tests/unit/models/question-order-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('question-order', 'Unit | Model | question order', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/question-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('question', 'Unit | Model | question', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('self-start-front-end/tests/unit/models/rehabilitationplan-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('rehabilitationplan', 'Unit | Model | rehabilitationplan', {
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
define('self-start-front-end/tests/unit/routes/exercise-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:exercise', 'Unit | Route | exercise', {
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
define('self-start-front-end/tests/unit/routes/form-display-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:form-display', 'Unit | Route | form display', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/forms-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:forms', 'Unit | Route | forms', {
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
define('self-start-front-end/tests/unit/routes/new-exercise-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:new-exercise', 'Unit | Route | new exercise', {
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
define('self-start-front-end/tests/unit/routes/new-rehabplans-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:new-rehabplans', 'Unit | Route | new rehabplans', {
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
define('self-start-front-end/tests/unit/routes/physiotherapists-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:physiotherapists', 'Unit | Route | physiotherapists', {
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
define('self-start-front-end/tests/unit/routes/questions-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:questions', 'Unit | Route | questions', {
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
define('self-start-front-end/tests/unit/routes/rehabplans-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:rehabplans', 'Unit | Route | rehabplans', {
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
