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

  QUnit.test('components/add-admin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-admin.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-city.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-city.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n15:7 - Unexpected console statement. (no-console)\n26:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-country.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-country.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-exercises.js should pass ESLint\n\n88:7 - Unexpected console statement. (no-console)\n112:11 - Unexpected console statement. (no-console)\n178:7 - Unexpected console statement. (no-console)\n179:11 - \'self\' is assigned a value but never used. (no-unused-vars)\n186:7 - Unexpected console statement. (no-console)\n207:13 - \'saveImage\' is assigned a value but never used. (no-unused-vars)\n208:9 - Unexpected console statement. (no-console)\n209:9 - Unexpected console statement. (no-console)\n210:9 - Unexpected console statement. (no-console)\n212:11 - Unexpected console statement. (no-console)\n265:7 - Unexpected console statement. (no-console)\n267:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-form-question.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-form-question.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-form.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-form.js should pass ESLint\n\n185:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-gender.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/add-gender.js should pass ESLint\n\n');
  });

  QUnit.test('components/add-image.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-image.js should pass ESLint\n\n19:5 - Unexpected console statement. (no-console)\n102:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-patient.js should pass ESLint\n\n98:7 - Unexpected console statement. (no-console)\n102:9 - Unexpected console statement. (no-console)\n126:11 - Unexpected console statement. (no-console)\n127:11 - Unexpected console statement. (no-console)\n129:13 - Unexpected console statement. (no-console)\n131:15 - Unexpected console statement. (no-console)\n133:44 - \'o\' is defined but never used. (no-unused-vars)\n160:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-physiotherapist.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-physiotherapist.js should pass ESLint\n\n98:11 - Unexpected console statement. (no-console)\n99:11 - Unexpected console statement. (no-console)\n101:13 - Unexpected console statement. (no-console)\n103:15 - Unexpected console statement. (no-console)\n105:44 - \'o\' is defined but never used. (no-unused-vars)\n107:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/add-province.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/add-province.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)');
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
    assert.ok(false, 'components/admin-nav.js should pass ESLint\n\n4:10 - \'computed\' is defined but never used. (no-unused-vars)\n16:7 - Unexpected console statement. (no-console)\n17:11 - \'myStore\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('components/admin-table.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/admin-table.js should pass ESLint\n\n66:5 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/admin-welcome.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/admin-welcome.js should pass ESLint\n\n');
  });

  QUnit.test('components/appointment-photos.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/appointment-photos.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n20:5 - Unexpected console statement. (no-console)\n25:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/ask-a-physio.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/ask-a-physio.js should pass ESLint\n\n');
  });

  QUnit.test('components/assessment-table.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/assessment-table.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/assign-rehabplan.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/assign-rehabplan.js should pass ESLint\n\n39:7 - Unexpected console statement. (no-console)\n40:7 - Unexpected console statement. (no-console)\n71:29 - \'res\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/back-to-top.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/back-to-top.js should pass ESLint\n\n');
  });

  QUnit.test('components/book-appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/book-appointment.js should pass ESLint\n\n11:16 - \'Ember\' is not defined. (no-undef)\n12:18 - \'Ember\' is not defined. (no-undef)\n13:16 - \'Ember\' is not defined. (no-undef)\n19:14 - \'Ember\' is not defined. (no-undef)\n24:14 - \'Ember\' is not defined. (no-undef)\n48:5 - Unexpected console statement. (no-console)\n152:37 - \'occurrence\' is defined but never used. (no-unused-vars)\n162:64 - \'isPreview\' is defined but never used. (no-unused-vars)\n163:7 - Unexpected console statement. (no-console)\n177:40 - \'occurrence\' is defined but never used. (no-unused-vars)\n183:31 - \'Ember\' is not defined. (no-undef)\n192:11 - Unexpected console statement. (no-console)\n207:52 - \'Ember\' is not defined. (no-undef)\n227:29 - \'Ember\' is not defined. (no-undef)\n241:42 - \'Ember\' is not defined. (no-undef)\n258:7 - Unexpected console statement. (no-console)\n267:30 - \'Ember\' is not defined. (no-undef)\n278:11 - \'physio\' is assigned a value but never used. (no-unused-vars)\n287:9 - Unexpected console statement. (no-console)\n304:19 - Unexpected console statement. (no-console)\n314:19 - Unexpected console statement. (no-console)\n325:19 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/client-exercise-menu.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/client-exercise-menu.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n10:15 - \'Ember\' is not defined. (no-undef)\n16:5 - Unexpected console statement. (no-console)\n17:28 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('components/client-file.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/client-file.js should pass ESLint\n\n226:11 - \'assign\' is assigned a value but never used. (no-unused-vars)\n232:7 - \'rehabplan\' is not defined. (no-undef)\n348:7 - \'$\' is not defined. (no-undef)\n364:7 - \'$\' is not defined. (no-undef)\n379:7 - \'$\' is not defined. (no-undef)\n394:7 - \'$\' is not defined. (no-undef)\n408:15 - \'self\' is assigned a value but never used. (no-unused-vars)\n430:15 - \'$\' is not defined. (no-undef)');
  });

  QUnit.test('components/client-nav.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/client-nav.js should pass ESLint\n\n4:10 - \'computed\' is defined but never used. (no-unused-vars)\n17:5 - Unexpected console statement. (no-console)\n18:9 - \'myStore\' is assigned a value but never used. (no-unused-vars)\n32:431 - \'SkypeButton\' is not defined. (no-undef)\n32:472 - \'SkypeButton\' is not defined. (no-undef)');
  });

  QUnit.test('components/client-rehabplan-view.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/client-rehabplan-view.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n7:8 - \'fileObject\' is defined but never used. (no-unused-vars)\n8:8 - \'moment\' is defined but never used. (no-unused-vars)\n32:9 - \'eemail\' is assigned a value but never used. (no-unused-vars)\n133:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/client-resources.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/client-resources.js should pass ESLint\n\n');
  });

  QUnit.test('components/client-settings.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/client-settings.js should pass ESLint\n\n21:23 - \'Ember\' is not defined. (no-undef)\n23:7 - \'Ember\' is not defined. (no-undef)\n25:16 - \'Ember\' is not defined. (no-undef)\n27:7 - \'Ember\' is not defined. (no-undef)\n29:16 - \'Ember\' is not defined. (no-undef)\n31:7 - \'Ember\' is not defined. (no-undef)\n33:16 - \'Ember\' is not defined. (no-undef)\n35:8 - \'Ember\' is not defined. (no-undef)\n37:16 - \'Ember\' is not defined. (no-undef)\n74:5 - Unexpected console statement. (no-console)\n183:7 - Unexpected console statement. (no-console)\n191:11 - Unexpected console statement. (no-console)\n198:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/client-upload-photos.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/client-upload-photos.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n20:5 - Unexpected console statement. (no-console)\n25:7 - Unexpected console statement. (no-console)\n43:9 - Unexpected console statement. (no-console)\n47:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/client-welcome.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/client-welcome.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n23:5 - Unexpected console statement. (no-console)\n25:5 - Unexpected console statement. (no-console)\n26:9 - \'myStore\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('components/config-selection.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/config-selection.js should pass ESLint\n\n83:5 - Unexpected console statement. (no-console)\n101:7 - Unexpected console statement. (no-console)\n154:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/confirm-booking.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/confirm-booking.js should pass ESLint\n\n26:41 - \'qid\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/date-to-string.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/date-to-string.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-admin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-admin.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-city.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-city.js should pass ESLint\n\n');
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

  QUnit.test('components/delete-image.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-image.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-patient.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-patient.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-physiotherapist.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-physiotherapist.js should pass ESLint\n\n');
  });

  QUnit.test('components/delete-province.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/delete-province.js should pass ESLint\n\n');
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

  QUnit.test('components/display-answers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/display-answers.js should pass ESLint\n\n');
  });

  QUnit.test('components/display-assessment.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/display-assessment.js should pass ESLint\n\n4:8 - \'Ember\' is defined but never used. (no-unused-vars)\n56:5 - Unexpected console statement. (no-console)\n57:5 - Unexpected console statement. (no-console)\n60:3 - Duplicate key \'init\'. (no-dupe-keys)');
  });

  QUnit.test('components/display-data-report.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/display-data-report.js should pass ESLint\n\n2:8 - \'Ember\' is defined but never used. (no-unused-vars)\n44:13 - Unexpected console statement. (no-console)\n60:25 - \'temp\' is already defined. (no-redeclare)\n66:25 - \'temp\' is already defined. (no-redeclare)\n72:25 - \'temp\' is already defined. (no-redeclare)\n78:25 - \'temp\' is already defined. (no-redeclare)\n84:25 - \'temp\' is already defined. (no-redeclare)\n90:25 - \'temp\' is already defined. (no-redeclare)\n96:25 - \'temp\' is already defined. (no-redeclare)\n102:25 - \'temp\' is already defined. (no-redeclare)\n108:25 - \'temp\' is already defined. (no-redeclare)\n136:13 - \'$\' is not defined. (no-undef)');
  });

  QUnit.test('components/display-forms.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/display-forms.js should pass ESLint\n\n');
  });

  QUnit.test('components/display-questions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/display-questions.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-admin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-admin.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-city.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/edit-city.js should pass ESLint\n\n38:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/edit-country.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-country.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/edit-exercises.js should pass ESLint\n\n98:7 - Unexpected console statement. (no-console)\n127:11 - Unexpected console statement. (no-console)\n135:7 - Unexpected console statement. (no-console)\n136:7 - Unexpected console statement. (no-console)\n137:7 - Unexpected console statement. (no-console)\n149:7 - Unexpected console statement. (no-console)\n151:7 - Unexpected console statement. (no-console)\n157:11 - Unexpected console statement. (no-console)\n162:11 - Unexpected console statement. (no-console)\n167:13 - Unexpected console statement. (no-console)\n184:11 - Unexpected console statement. (no-console)\n202:7 - Unexpected console statement. (no-console)\n203:7 - Unexpected console statement. (no-console)\n208:9 - Unexpected console statement. (no-console)\n215:11 - \'self\' is assigned a value but never used. (no-unused-vars)\n224:9 - Unexpected console statement. (no-console)\n264:9 - Unexpected console statement. (no-console)\n269:9 - Unexpected console statement. (no-console)\n295:11 - \'$\' is not defined. (no-undef)');
  });

  QUnit.test('components/edit-form.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/edit-form.js should pass ESLint\n\n166:11 - Unexpected console statement. (no-console)');
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
    assert.ok(true, 'components/edit-physiotherapist.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-province.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-province.js should pass ESLint\n\n');
  });

  QUnit.test('components/edit-rehabplan.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/edit-rehabplan.js should pass ESLint\n\n66:9 - \'a\' is assigned a value but never used. (no-unused-vars)\n261:10 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/edit-status.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-status.js should pass ESLint\n\n');
  });

  QUnit.test('components/generate-reports.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/generate-reports.js should pass ESLint\n\n4:9 - \'Ember\' is not defined. (no-undef)\n6:22 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('components/get-answers.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/get-answers.js should pass ESLint\n\n29:7 - Unexpected console statement. (no-console)\n32:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/get-assessment-results.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/get-assessment-results.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n5:8 - \'moment\' is defined but never used. (no-unused-vars)\n9:7 - \'Ember\' is not defined. (no-undef)\n17:20 - \'Ember\' is not defined. (no-undef)\n19:5 - Unexpected console statement. (no-console)\n29:5 - Unexpected console statement. (no-console)\n42:11 - Unexpected console statement. (no-console)\n45:13 - Unexpected console statement. (no-console)\n49:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/get-intake-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/get-intake-test.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n5:8 - \'moment\' is defined but never used. (no-unused-vars)\n9:7 - \'Ember\' is not defined. (no-undef)\n19:20 - \'Ember\' is not defined. (no-undef)\n22:5 - Unexpected console statement. (no-console)\n26:7 - Unexpected console statement. (no-console)\n28:9 - Unexpected console statement. (no-console)\n39:5 - Unexpected console statement. (no-console)\n42:7 - Unexpected console statement. (no-console)\n45:9 - Unexpected console statement. (no-console)\n46:9 - Unexpected console statement. (no-console)\n53:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/list-forms.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/list-forms.js should pass ESLint\n\n17:23 - \'thisPlan\' is defined but never used. (no-unused-vars)\n24:9 - Unexpected console statement. (no-console)\n25:9 - Unexpected console statement. (no-console)\n27:11 - Unexpected console statement. (no-console)\n31:9 - Unexpected console statement. (no-console)\n39:7 - Unexpected console statement. (no-console)\n40:7 - Unexpected console statement. (no-console)\n41:7 - Unexpected console statement. (no-console)\n74:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/manage-admin-accounts.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/manage-admin-accounts.js should pass ESLint\n\n82:5 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/manage-exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/manage-exercises.js should pass ESLint\n\n2:10 - \'inject\' is defined but never used. (no-unused-vars)\n39:5 - Unexpected console statement. (no-console)\n88:5 - Unexpected console statement. (no-console)\n111:5 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/manage-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/manage-form.js should pass ESLint\n\n');
  });

  QUnit.test('components/manage-patients.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/manage-patients.js should pass ESLint\n\n3:8 - \'moment\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/manage-questions.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/manage-questions.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/modify-question.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/modify-question.js should pass ESLint\n\n');
  });

  QUnit.test('components/nav-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/nav-bar.js should pass ESLint\n\n3:10 - \'computed\' is defined but never used. (no-unused-vars)\n35:7 - Unexpected console statement. (no-console)\n138:11 - Unexpected console statement. (no-console)\n140:13 - Unexpected console statement. (no-console)\n149:13 - Unexpected console statement. (no-console)\n159:13 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/parse-question.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/parse-question.js should pass ESLint\n\n');
  });

  QUnit.test('components/payment-button-package-2.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/payment-button-package-2.js should pass ESLint\n\n16:7 - Unexpected console statement. (no-console)\n24:5 - \'paypal\' is not defined. (no-undef)\n75:30 - \'obj\' is defined but never used. (no-unused-vars)\n78:17 - \'Ember\' is not defined. (no-undef)\n79:17 - \'Ember\' is not defined. (no-undef)\n80:17 - \'Ember\' is not defined. (no-undef)\n83:17 - \'Ember\' is not defined. (no-undef)\n84:17 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('components/payment-button-package-3.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/payment-button-package-3.js should pass ESLint\n\n16:7 - Unexpected console statement. (no-console)\n24:5 - \'paypal\' is not defined. (no-undef)\n75:30 - \'obj\' is defined but never used. (no-unused-vars)\n78:17 - \'Ember\' is not defined. (no-undef)\n79:17 - \'Ember\' is not defined. (no-undef)\n80:17 - \'Ember\' is not defined. (no-undef)\n83:17 - \'Ember\' is not defined. (no-undef)\n84:17 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('components/payment-button.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/payment-button.js should pass ESLint\n\n16:7 - Unexpected console statement. (no-console)\n24:5 - \'paypal\' is not defined. (no-undef)\n75:30 - \'obj\' is defined but never used. (no-unused-vars)\n78:17 - \'Ember\' is not defined. (no-undef)\n79:17 - \'Ember\' is not defined. (no-undef)\n80:17 - \'Ember\' is not defined. (no-undef)\n83:17 - \'Ember\' is not defined. (no-undef)\n84:17 - \'Ember\' is not defined. (no-undef)');
  });

  QUnit.test('components/personal-menu.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/personal-menu.js should pass ESLint\n\n');
  });

  QUnit.test('components/physio-nav.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/physio-nav.js should pass ESLint\n\n4:10 - \'computed\' is defined but never used. (no-unused-vars)\n16:7 - Unexpected console statement. (no-console)\n17:11 - \'myStore\' is assigned a value but never used. (no-unused-vars)\n30:431 - \'SkypeButton\' is not defined. (no-undef)\n30:472 - \'SkypeButton\' is not defined. (no-undef)');
  });

  QUnit.test('components/physio-table.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/physio-table.js should pass ESLint\n\n75:5 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/physio-welcome.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/physio-welcome.js should pass ESLint\n\n18:42 - \'SkypeButton\' is not defined. (no-undef)\n21:13 - \'SkypeButton\' is not defined. (no-undef)');
  });

  QUnit.test('components/register-user.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/register-user.js should pass ESLint\n\n39:30 - Unnecessary escape character: \\[. (no-useless-escape)\n39:55 - Unnecessary escape character: \\[. (no-useless-escape)\n41:11 - Unexpected console statement. (no-console)\n67:9 - Unexpected console statement. (no-console)\n92:9 - Unexpected console statement. (no-console)\n115:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/rehab-plan.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/rehab-plan.js should pass ESLint\n\n217:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/rehab-table.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/rehab-table.js should pass ESLint\n\n36:5 - Unexpected console statement. (no-console)\n90:5 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/show-form-questions.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/show-form-questions.js should pass ESLint\n\n18:7 - Unexpected console statement. (no-console)\n30:22 - \'fid\' is defined but never used. (no-unused-vars)\n31:11 - \'thisForm\' is assigned a value but never used. (no-unused-vars)\n38:7 - Unexpected console statement. (no-console)\n42:7 - Unexpected console statement. (no-console)\n43:7 - Unexpected console statement. (no-console)\n49:7 - Unexpected console statement. (no-console)\n72:7 - Unexpected console statement. (no-console)\n75:15 - \'x\' is already defined. (no-redeclare)');
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
    assert.ok(false, 'components/user-info.js should pass ESLint\n\n63:14 - \'Ember\' is not defined. (no-undef)\n98:7 - Unexpected console statement. (no-console)\n101:9 - Unexpected console statement. (no-console)\n121:11 - Unexpected console statement. (no-console)\n122:11 - Unexpected console statement. (no-console)\n124:13 - Unexpected console statement. (no-console)\n126:15 - Unexpected console statement. (no-console)\n128:44 - \'o\' is defined but never used. (no-unused-vars)\n130:13 - Unexpected console statement. (no-console)\n140:17 - \'ans\' is assigned a value but never used. (no-unused-vars)\n183:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/user-login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/user-login.js should pass ESLint\n\n4:10 - \'computed\' is defined but never used. (no-unused-vars)\n49:9 - Unexpected console statement. (no-console)\n71:25 - \'userName\' is assigned a value but never used. (no-unused-vars)\n73:21 - Unexpected console statement. (no-console)\n74:21 - Unexpected console statement. (no-console)\n76:23 - Unexpected console statement. (no-console)\n80:23 - Unexpected console statement. (no-console)\n85:25 - Unexpected console statement. (no-console)\n100:17 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/view-appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/view-appointment.js should pass ESLint\n\n');
  });

  QUnit.test('components/view-schedule.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/view-schedule.js should pass ESLint\n\n4:8 - \'$\' is defined but never used. (no-unused-vars)\n9:16 - \'Ember\' is not defined. (no-undef)\n12:18 - \'Ember\' is not defined. (no-undef)\n13:16 - \'Ember\' is not defined. (no-undef)\n14:22 - \'Ember\' is not defined. (no-undef)\n32:5 - Unexpected console statement. (no-console)\n34:29 - \'Ember\' is not defined. (no-undef)\n35:29 - \'Ember\' is not defined. (no-undef)\n42:7 - Unexpected console statement. (no-console)\n55:31 - \'Ember\' is not defined. (no-undef)\n68:26 - \'Ember\' is not defined. (no-undef)\n91:23 - \'Ember\' is not defined. (no-undef)\n102:7 - Unexpected console statement. (no-console)\n106:64 - \'isPreview\' is defined but never used. (no-unused-vars)\n118:7 - Unexpected console statement. (no-console)\n119:7 - Unexpected console statement. (no-console)\n171:11 - Unexpected console statement. (no-console)');
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

  QUnit.test('controllers/practitioner/assessment-display.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/practitioner/assessment-display.js should pass ESLint\n\n');
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

  QUnit.test('helpers/increment-q-num.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/increment-q-num.js should pass ESLint\n\n');
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
    assert.ok(true, 'helpers/is-equal.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/mc-display.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/mc-display.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/number-of-mc.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/number-of-mc.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/types-appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/types-appointment.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/doc.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/doc.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/home.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/home.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/responsive.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/responsive.js should pass ESLint\n\n');
  });

  QUnit.test('models/administrator.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/administrator.js should pass ESLint\n\n');
  });

  QUnit.test('models/answer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/answer.js should pass ESLint\n\n');
  });

  QUnit.test('models/appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/appointment.js should pass ESLint\n\n');
  });

  QUnit.test('models/ask-physio.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/ask-physio.js should pass ESLint\n\n');
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

  QUnit.test('models/exercise-list.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/exercise-list.js should pass ESLint\n\n');
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

  QUnit.test('models/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/login.js should pass ESLint\n\n');
  });

  QUnit.test('models/marital-status.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/marital-status.js should pass ESLint\n\n');
  });

  QUnit.test('models/password.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/password.js should pass ESLint\n\n');
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

  QUnit.test('models/rehab-client-link.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/rehab-client-link.js should pass ESLint\n\n2:8 - \'assessmentTest\' is defined but never used. (no-unused-vars)');
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

  QUnit.test('routes/admin/accounts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/accounts.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/admin-welcome.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/admin-welcome.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/edit-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/edit-form.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/forms.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/forms.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/manage-accounts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/manage-accounts.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/manage-selections.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/manage-selections.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/new-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/new-form.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/view-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/view-form.js should pass ESLint\n\n');
  });

  QUnit.test('routes/appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/appointment.js should pass ESLint\n\n');
  });

  QUnit.test('routes/city.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/city.js should pass ESLint\n\n');
  });

  QUnit.test('routes/client.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client.js should pass ESLint\n\n');
  });

  QUnit.test('routes/client/appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client/appointment.js should pass ESLint\n\n');
  });

  QUnit.test('routes/client/exercise-menu.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client/exercise-menu.js should pass ESLint\n\n');
  });

  QUnit.test('routes/client/resources.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client/resources.js should pass ESLint\n\n');
  });

  QUnit.test('routes/client/settings.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client/settings.js should pass ESLint\n\n');
  });

  QUnit.test('routes/client/upload-photos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client/upload-photos.js should pass ESLint\n\n');
  });

  QUnit.test('routes/client/view-rehabplan.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client/view-rehabplan.js should pass ESLint\n\n');
  });

  QUnit.test('routes/client/welcome-client.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/client/welcome-client.js should pass ESLint\n\n');
  });

  QUnit.test('routes/dashboard.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/dashboard.js should pass ESLint\n\n');
  });

  QUnit.test('routes/display-reports.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/display-reports.js should pass ESLint\n\n');
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

  QUnit.test('routes/practitioner/appointment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/practitioner/appointment.js should pass ESLint\n\n');
  });

  QUnit.test('routes/practitioner/assessment-display.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/practitioner/assessment-display.js should pass ESLint\n\n');
  });

  QUnit.test('routes/practitioner/client-file.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/practitioner/client-file.js should pass ESLint\n\n2:8 - \'RSVP\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('routes/practitioner/clients.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/practitioner/clients.js should pass ESLint\n\n');
  });

  QUnit.test('routes/practitioner/edit-menu.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/practitioner/edit-menu.js should pass ESLint\n\n');
  });

  QUnit.test('routes/practitioner/exercises.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/practitioner/exercises.js should pass ESLint\n\n');
  });

  QUnit.test('routes/practitioner/new-rehabplans.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/practitioner/new-rehabplans.js should pass ESLint\n\n');
  });

  QUnit.test('routes/practitioner/rehabplans.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/practitioner/rehabplans.js should pass ESLint\n\n');
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

  QUnit.test('services/auth.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/auth.js should pass ESLint\n\n32:5 - Unexpected console statement. (no-console)\n36:5 - Unexpected console statement. (no-console)\n122:23 - Unexpected console statement. (no-console)\n218:5 - Unexpected console statement. (no-console)\n220:5 - Unexpected console statement. (no-console)');
  });

  QUnit.test('services/doc.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/doc.js should pass ESLint\n\n16:7 - \'$document\' is assigned a value but never used. (no-unused-vars)\n17:7 - \'$sortableTables\' is assigned a value but never used. (no-unused-vars)\n23:7 - \'$ui\' is assigned a value but never used. (no-unused-vars)\n26:7 - \'$hideMenu\' is assigned a value but never used. (no-unused-vars)\n27:7 - \'$search\' is assigned a value but never used. (no-unused-vars)\n29:7 - \'$demo\' is assigned a value but never used. (no-unused-vars)\n66:7 - \'$sidebarButton\' is assigned a value but never used. (no-unused-vars)\n143:13 - \'$modal\' is assigned a value but never used. (no-unused-vars)\n155:37 - \'shortcuts\' is not defined. (no-undef)\n156:26 - \'shortcuts\' is not defined. (no-undef)\n193:39 - \'calculations\' is defined but never used. (no-unused-vars)\n228:13 - \'$activeSection\' is assigned a value but never used. (no-unused-vars)\n272:51 - \'$choice\' is defined but never used. (no-unused-vars)\n315:31 - \'event\' is defined but never used. (no-unused-vars)\n387:11 - \'$rail\' is assigned a value but never used. (no-unused-vars)\n401:15 - \'$anchor\' is assigned a value but never used. (no-unused-vars)\n419:21 - \'$anchor\' is assigned a value but never used. (no-unused-vars)\n518:11 - Unexpected console statement. (no-console)\n527:25 - Unexpected constant condition. (no-constant-condition)\n559:23 - Unexpected console statement. (no-console)\n580:13 - \'states\' is assigned a value but never used. (no-unused-vars)\n584:13 - \'html\' is assigned a value but never used. (no-unused-vars)\n624:45 - \'variation\' is defined but never used. (no-unused-vars)\n628:45 - \'variation\' is defined but never used. (no-unused-vars)\n785:15 - \'Clipboard\' is not defined. (no-undef)\n859:11 - Unexpected console statement. (no-console)\n962:41 - Unnecessary escape character: \\". (no-useless-escape)\n987:32 - Unnecessary escape character: \\". (no-useless-escape)\n987:38 - Unnecessary escape character: \\". (no-useless-escape)\n1029:11 - \'codeSample\' is already defined. (no-redeclare)\n1031:11 - \'existingCode\' is assigned a value but never used. (no-unused-vars)\n1032:11 - \'evaluatedCode\' is assigned a value but never used. (no-unused-vars)\n1036:11 - \'demo\' is assigned a value but never used. (no-unused-vars)\n1049:11 - \'padding\' is assigned a value but never used. (no-unused-vars)\n1054:11 - \'styledCode\' is defined but never used. (no-unused-vars)\n1055:11 - \'$example\' is defined but never used. (no-unused-vars)\n1056:11 - \'$label\' is defined but never used. (no-unused-vars)\n1057:11 - \'codeHeight\' is defined but never used. (no-unused-vars)\n1059:13 - \'entityMap\' is assigned a value but never used. (no-unused-vars)\n1224:5 - \'semantic\' is not defined. (no-undef)');
  });

  QUnit.test('services/home.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/home.js should pass ESLint\n\n8:5 - \'semantic\' is not defined. (no-undef)\n13:7 - \'$ui\' is assigned a value but never used. (no-unused-vars)\n14:7 - \'$phrase\' is assigned a value but never used. (no-unused-vars)\n15:7 - \'$download\' is assigned a value but never used. (no-unused-vars)\n16:7 - \'$library\' is assigned a value but never used. (no-unused-vars)\n17:7 - \'$cursor\' is assigned a value but never used. (no-unused-vars)\n18:7 - \'$version\' is assigned a value but never used. (no-unused-vars)\n101:11 - Unexpected console statement. (no-console)\n116:25 - Unexpected constant condition. (no-constant-condition)\n129:13 - Unexpected console statement. (no-console)\n138:13 - Unexpected console statement. (no-console)\n166:31 - \'semantic\' is not defined. (no-undef)\n171:25 - \'semantic\' is not defined. (no-undef)\n177:40 - \'text\' is defined but never used. (no-unused-vars)');
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
define('self-start-front-end/tests/helpers/ember-sortable/test-helpers', ['ember-sortable/helpers/drag', 'ember-sortable/helpers/reorder'], function () {
  'use strict';
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
define('self-start-front-end/tests/integration/components/add-admin-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-admin', 'Integration | Component | add admin', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "O/2q2FBy",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-admin\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "6kG+o76Z",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-admin\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/add-city-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-city', 'Integration | Component | add city', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "hYKCHpi2",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-city\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "624Vutsh",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-city\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
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
define('self-start-front-end/tests/integration/components/add-image-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('add-image', 'Integration | Component | add image', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "NnOG7p6X",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"add-image\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "6FmPwRX7",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"add-image\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/admin-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('admin-table', 'Integration | Component | admin table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "2wNJUFgN",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"admin-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "vbqVwbt+",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"admin-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/appointment-photos-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('appointment-photos', 'Integration | Component | appointment photos', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "YjeYeYIn",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"appointment-photos\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "/7B7BXwT",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"appointment-photos\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/ask-a-physio-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('ask-a-physio', 'Integration | Component | ask a physio', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "KbRIMLRD",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ask-a-physio\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "hh6nh2ev",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"ask-a-physio\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/assessment-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('assessment-table', 'Integration | Component | assessment table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "DbuoqKfd",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"assessment-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "xPqfS8Xa",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"assessment-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/assign-rehabplan-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('assign-rehabplan', 'Integration | Component | assign rehabplan', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "yvHqYHdn",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"assign-rehabplan\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "YHtbe5mZ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"assign-rehabplan\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/client-exercise-menu-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('client-exercise-menu', 'Integration | Component | client exercise menu', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "IBCL7DyR",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"client-exercise-menu\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "w7exUNix",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"client-exercise-menu\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/client-file-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('client-file', 'Integration | Component | client file', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "xTG3N09F",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"client-file\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "LtvuQsZw",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"client-file\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/client-nav-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('client-nav', 'Integration | Component | client nav', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "RVeXCmou",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"client-nav\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "U3b0iEyO",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"client-nav\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/client-rehabplan-view-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('client-rehabplan-view', 'Integration | Component | client rehabplan view', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "H6LYL4OP",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"client-rehabplan-view\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "wMiwBCzJ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"client-rehabplan-view\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/client-resources-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('client-resources', 'Integration | Component | client resources', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "UXYqEaLa",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"client-resources\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "qpIgBbP7",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"client-resources\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/client-settings-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('client-settings', 'Integration | Component | client settings', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "wOhfX/Ie",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"client-settings\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "/dwvkqL0",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"client-settings\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/client-upload-photos-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('client-upload-photos', 'Integration | Component | client upload photos', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "a+ZrL3Nz",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"client-upload-photos\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Dr9TB3tw",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"client-upload-photos\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/client-welcome-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('client-welcome', 'Integration | Component | client welcome', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "4j6lZT1Y",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"client-welcome\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "NE04+mgq",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"client-welcome\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/date-to-string-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('date-to-string', 'Integration | Component | date to string', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "FA3wbyZA",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"date-to-string\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "FDh7jH4+",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"date-to-string\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/delete-admin-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-admin', 'Integration | Component | delete admin', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "8Sw2d7q6",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-admin\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ZU9Fv1VS",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-admin\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/delete-city-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-city', 'Integration | Component | delete city', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "cJKlVglH",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-city\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "UwRRhjQS",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-city\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/delete-image-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('delete-image', 'Integration | Component | delete image', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "HhpgUZI4",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"delete-image\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "D0OgxapJ",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"delete-image\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/display-answers-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('display-answers', 'Integration | Component | display answers', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Q/hmsT9i",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"display-answers\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "tXGbp5FE",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"display-answers\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/display-assessment-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('display-assessment', 'Integration | Component | display assessment', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "vNF6XzDh",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"display-assessment\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "H1aAGmtg",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"display-assessment\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/display-data-report-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('display-data-report', 'Integration | Component | display data report', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "cHekrDIj",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"display-data-report\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "FRdG0LWo",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"display-data-report\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/display-forms-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('display-forms', 'Integration | Component | display forms', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "rraILM8k",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"display-forms\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "NUyh5gwC",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"display-forms\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/edit-admin-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-admin', 'Integration | Component | edit admin', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "c9bIyxbb",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-admin\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "jngG0+mu",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-admin\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/edit-city-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-city', 'Integration | Component | edit city', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "m2luNVLP",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-city\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "5pJuo5WA",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-city\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/edit-province-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('edit-province', 'Integration | Component | edit province', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "aI+bs2aP",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"edit-province\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "BvoPAgYy",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"edit-province\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/generate-reports-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('generate-reports', 'Integration | Component | generate reports', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Rk4Reklw",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"generate-reports\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "VJaZNzqi",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"generate-reports\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/get-answers-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('get-answers', 'Integration | Component | get answers', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "zgzLAcEb",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"get-answers\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "u6LODeSx",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"get-answers\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/get-assessment-results-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('get-assessment-results', 'Integration | Component | get assessment results', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "duTrzdcH",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"get-assessment-results\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "yP458BS9",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"get-assessment-results\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/get-intake-test-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('get-intake-test', 'Integration | Component | get intake test', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "VbSLlPe4",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"get-intake-test\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ejtPEd4Q",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"get-intake-test\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/manage-admin-accounts-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('manage-admin-accounts', 'Integration | Component | manage admin accounts', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "dmiQh/jX",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"manage-admin-accounts\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "DL871msr",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"manage-admin-accounts\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/manage-exercises-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('manage-exercises', 'Integration | Component | manage exercises', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "UU8AdKMi",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"manage-exercises\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "yOZ6U2+Z",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"manage-exercises\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/manage-questions-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('manage-questions', 'Integration | Component | manage questions', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "8BDTQ4gQ",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"manage-questions\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "S+BVveMN",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"manage-questions\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/payment-button-package-2-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('payment-button-package-2', 'Integration | Component | payment button package 2', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "t5CDDApm",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"payment-button-package-2\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "DAJJlPsw",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"payment-button-package-2\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/payment-button-package-3-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('payment-button-package-3', 'Integration | Component | payment button package 3', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "eHZCw/On",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"payment-button-package-3\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "P0BUCUnk",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"payment-button-package-3\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/payment-button-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('payment-button', 'Integration | Component | payment button', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "fuA0Ifyl",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"payment-button\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "OGck4LIP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"payment-button\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/personal-menu-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('personal-menu', 'Integration | Component | personal menu', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "MevxA1qX",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"personal-menu\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "7y9Eig95",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"personal-menu\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/physio-nav-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('physio-nav', 'Integration | Component | physio nav', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "woaqz+bn",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"physio-nav\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "MPTj6lcw",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"physio-nav\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/physio-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('physio-table', 'Integration | Component | physio table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "aeo7FVGT",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"physio-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "9W7w9JLk",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"physio-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/physio-welcome-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('physio-welcome', 'Integration | Component | physio welcome', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "EPc8Pv16",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"physio-welcome\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "hs4YJNbO",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"physio-welcome\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/components/rehab-plan-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('rehab-plan', 'Integration | Component | rehab plan', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "bUH4h35y",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"rehab-plan\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "lnoxharD",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"rehab-plan\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('self-start-front-end/tests/integration/components/rehab-table-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('rehab-table', 'Integration | Component | rehab table', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "dw9/kJL1",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"rehab-table\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "DrcJXemg",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"rehab-table\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/helpers/increment-q-num-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('increment-q-num', 'helper:increment-q-num', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "roS5ENj3",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"increment-q-num\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
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
define('self-start-front-end/tests/integration/helpers/types-appointment-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('types-appointment', 'helper:types-appointment', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "+QrYNwrq",
      "block": "{\"symbols\":[],\"statements\":[[1,[25,\"types-appointment\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
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

  QUnit.test('integration/components/add-admin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-admin-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/add-city-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-city-test.js should pass ESLint\n\n');
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

  QUnit.test('integration/components/add-image-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/add-image-test.js should pass ESLint\n\n');
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

  QUnit.test('integration/components/admin-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/admin-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/admin-welcome-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/admin-welcome-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/appointment-photos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/appointment-photos-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/ask-a-physio-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/ask-a-physio-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/assessment-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/assessment-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/assign-rehabplan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/assign-rehabplan-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/back-to-top-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/back-to-top-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/book-appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/book-appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/client-exercise-menu-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/client-exercise-menu-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/client-file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/client-file-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/client-nav-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/client-nav-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/client-rehabplan-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/client-rehabplan-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/client-resources-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/client-resources-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/client-settings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/client-settings-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/client-upload-photos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/client-upload-photos-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/client-welcome-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/client-welcome-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/config-selection-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/config-selection-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/confirm-booking-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/confirm-booking-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/date-to-string-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/date-to-string-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-admin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-admin-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-city-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-city-test.js should pass ESLint\n\n');
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

  QUnit.test('integration/components/delete-image-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-image-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-patient-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-patient-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-physiotherapist-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-physiotherapist-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-province-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-province-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-question-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-question-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/delete-rehabplan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/delete-rehabplan-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/display-answers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/display-answers-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/display-assessment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/display-assessment-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/display-data-report-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/display-data-report-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/display-forms-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/display-forms-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/display-questions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/display-questions-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-admin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-admin-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-city-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-city-test.js should pass ESLint\n\n');
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

  QUnit.test('integration/components/edit-province-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-province-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/edit-rehabplan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-rehabplan-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/generate-reports-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/generate-reports-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/get-answers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/get-answers-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/get-assessment-results-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/get-assessment-results-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/get-intake-test-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/get-intake-test-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/list-forms-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/list-forms-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/manage-admin-accounts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/manage-admin-accounts-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/manage-exercises-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/manage-exercises-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/manage-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/manage-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/manage-patients-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/manage-patients-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/manage-questions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/manage-questions-test.js should pass ESLint\n\n');
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

  QUnit.test('integration/components/payment-button-package-2-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/payment-button-package-2-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/payment-button-package-3-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/payment-button-package-3-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/payment-button-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/payment-button-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/personal-menu-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/personal-menu-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/physio-nav-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/physio-nav-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/physio-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/physio-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/physio-welcome-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/physio-welcome-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/register-user-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/register-user-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/rehab-plan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rehab-plan-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/rehab-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rehab-table-test.js should pass ESLint\n\n');
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

  QUnit.test('integration/helpers/increment-q-num-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/increment-q-num-test.js should pass ESLint\n\n');
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

  QUnit.test('integration/helpers/types-appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/types-appointment-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/controllers/practitioner/assessment-display-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/practitioner/assessment-display-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/questions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/questions-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/rehabplans-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/rehabplans-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/initializers/doc-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/doc-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/initializers/home-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/home-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mixins/table-common-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/table-common-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/administrator-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/administrator-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/answer-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/answer-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/assessment-test-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/assessment-test-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/city-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/city-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/country-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/country-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/exercise-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/exercise-list-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/models/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/marital-status-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/marital-status-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/passwords-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/passwords-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/models/rehab-client-link-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/rehab-client-link-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/rehabilitationplan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/rehabilitationplan-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/accounts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/accounts-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/admin-welcome-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/admin-welcome-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/edit-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/edit-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/forms-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/forms-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/manage-accounts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/manage-accounts-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/manage-selections-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/manage-selections-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/new-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/new-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/admin/view-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/admin/view-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/city-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/city-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/client-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/client/appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client/appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/client/exercise-menu-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client/exercise-menu-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/client/resources-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client/resources-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/client/settings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client/settings-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/client/upload-photos-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client/upload-photos-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/client/view-rehabplan-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client/view-rehabplan-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/client/welcome-client-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/client/welcome-client-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/dashboard-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/dashboard-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/display-reports-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/display-reports-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/routes/practitioner/appointment-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/practitioner/appointment-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/practitioner/assessment-display-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/practitioner/assessment-display-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/practitioner/client-file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/practitioner/client-file-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/practitioner/clients-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/practitioner/clients-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/practitioner/edit-menu-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/practitioner/edit-menu-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/practitioner/exercises-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/practitioner/exercises-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/practitioner/new-rehabplans-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/practitioner/new-rehabplans-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/practitioner/rehabplans-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/practitioner/rehabplans-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/services/auth-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/auth-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/doc-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/doc-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/home-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/home-test.js should pass ESLint\n\n');
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
define('self-start-front-end/tests/unit/controllers/practitioner/assessment-display-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:practitioner/assessment-display', 'Unit | Controller | practitioner/assessment display', {
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
define('self-start-front-end/tests/unit/initializers/doc-test', ['self-start-front-end/initializers/doc', 'qunit', 'self-start-front-end/tests/helpers/destroy-app'], function (_doc, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Initializer | doc', {
    beforeEach: function beforeEach() {
      var _this = this;

      Ember.run(function () {
        _this.application = Ember.Application.create();
        _this.application.deferReadiness();
      });
    },
    afterEach: function afterEach() {
      (0, _destroyApp.default)(this.application);
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    (0, _doc.initialize)(this.application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('self-start-front-end/tests/unit/initializers/home-test', ['self-start-front-end/initializers/home', 'qunit', 'self-start-front-end/tests/helpers/destroy-app'], function (_home, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Initializer | home', {
    beforeEach: function beforeEach() {
      var _this = this;

      Ember.run(function () {
        _this.application = Ember.Application.create();
        _this.application.deferReadiness();
      });
    },
    afterEach: function afterEach() {
      (0, _destroyApp.default)(this.application);
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    (0, _home.initialize)(this.application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
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
define('self-start-front-end/tests/unit/models/administrator-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('administrator', 'Unit | Model | administrator', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
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
define('self-start-front-end/tests/unit/models/assessment-test-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('assessment-test', 'Unit | Model | assessment test', {
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
define('self-start-front-end/tests/unit/models/exercise-list-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('exercise-list', 'Unit | Model | exercise list', {
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
define('self-start-front-end/tests/unit/models/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('login', 'Unit | Model | login', {
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
define('self-start-front-end/tests/unit/models/passwords-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('passwords', 'Unit | Model | passwords', {
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
define('self-start-front-end/tests/unit/models/rehab-client-link-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('rehab-client-link', 'Unit | Model | rehab client link', {
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
define('self-start-front-end/tests/unit/routes/admin/accounts-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/accounts', 'Unit | Route | admin/accounts', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/admin/admin-welcome-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/admin-welcome', 'Unit | Route | admin/admin welcome', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/admin/edit-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/edit-form', 'Unit | Route | admin/edit form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/admin/forms-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/forms', 'Unit | Route | admin/forms', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/admin/manage-accounts-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/manage-accounts', 'Unit | Route | admin/manage accounts', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/admin/manage-selections-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/manage-selections', 'Unit | Route | admin/manage selections', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/admin/new-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/new-form', 'Unit | Route | admin/new form', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/admin/view-form-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:admin/view-form', 'Unit | Route | admin/view form', {
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
define('self-start-front-end/tests/unit/routes/client-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:client', 'Unit | Route | client', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/client/appointment-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:client/appointment', 'Unit | Route | client/appointment', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/client/exercise-menu-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:client/exercise-menu', 'Unit | Route | client/exercise menu', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/client/resources-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:client/resources', 'Unit | Route | client/resources', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/client/settings-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:client/settings', 'Unit | Route | client/settings', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/client/upload-photos-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:client/upload-photos', 'Unit | Route | client/upload photos', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/client/view-rehabplan-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:client/view-rehabplan', 'Unit | Route | client/view rehabplan', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/client/welcome-client-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:client/welcome-client', 'Unit | Route | client/welcome client', {
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
define('self-start-front-end/tests/unit/routes/display-reports-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:display-reports', 'Unit | Route | display reports', {
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
define('self-start-front-end/tests/unit/routes/practitioner/appointment-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:practitioner/appointment', 'Unit | Route | practitioner/appointment', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/practitioner/assessment-display-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:practitioner/assessment-display', 'Unit | Route | practitioner/assessment display', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/practitioner/client-file-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:practitioner/client-file', 'Unit | Route | practitioner/client file', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/practitioner/clients-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:practitioner/clients', 'Unit | Route | practitioner/clients', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/practitioner/edit-menu-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:practitioner/edit-menu', 'Unit | Route | practitioner/edit menu', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/practitioner/exercises-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:practitioner/exercises', 'Unit | Route | practitioner/exercises', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/practitioner/new-rehabplans-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:practitioner/new-rehabplans', 'Unit | Route | practitioner/new rehabplans', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('self-start-front-end/tests/unit/routes/practitioner/rehabplans-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:practitioner/rehabplans', 'Unit | Route | practitioner/rehabplans', {
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
define('self-start-front-end/tests/unit/services/auth-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:auth', 'Unit | Service | auth', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('self-start-front-end/tests/unit/services/doc-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:doc', 'Unit | Service | doc', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('self-start-front-end/tests/unit/services/home-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:home', 'Unit | Service | home', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
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
