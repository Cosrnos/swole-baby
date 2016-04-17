import Ember from 'ember';
import ClearStatsOnWillTransitionMixin from 'swole-baby/mixins/clear-stats-on-will-transition';
import { module, test } from 'qunit';

module('Unit | Mixin | clear stats on will transition');

// Replace this with your real tests.
test('it works', function(assert) {
  let ClearStatsOnWillTransitionObject = Ember.Object.extend(ClearStatsOnWillTransitionMixin);
  let subject = ClearStatsOnWillTransitionObject.create();
  assert.ok(subject);
});
