import Ember from 'ember';
import PerkableMixin from 'swole-baby/mixins/perkable';
import { module, test } from 'qunit';

module('Unit | Mixin | perkable');

// Replace this with your real tests.
test('it works', function(assert) {
  let PerkableObject = Ember.Object.extend(PerkableMixin);
  let subject = PerkableObject.create();
  assert.ok(subject);
});
