import Ember from 'ember';
import ClearStatsOnWillTransition from '../../mixins/clear-stats-on-will-transition';
import Data from '../../services/data';

export default Ember.Route.extend(ClearStatsOnWillTransition, {
  actions: {
    finish: function () {
      Data.set('player.didCompleteTutorial', true);
      this.transitionTo('week');
    }
  }
});
