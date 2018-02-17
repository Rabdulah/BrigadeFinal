import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rehabplan-actions-table', 'Integration | Component | rehabplan actions table', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rehabplan-actions-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rehabplan-actions-table}}
      template block text
    {{/rehabplan-actions-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
