import Ember from 'ember';
import ClearStatsOnWillTransition from '../../mixins/clear-stats-on-will-transition';

export default Ember.Route.extend(ClearStatsOnWillTransition, {
  actions: {
    finish: function () {
      this.transitionTo('week');
    }
  }
});
