import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('scene-yes-no', 'Integration | Component | scene yes no', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{scene-yes-no}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#scene-yes-no}}
      template block text
    {{/scene-yes-no}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
