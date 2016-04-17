import Ember from 'ember';
import Data from '../services/data';
import ClearStatsOnWillTransition from '../mixins/clear-stats-on-will-transition';

export default Ember.Route.extend(ClearStatsOnWillTransition, {
  model: function () {
    return Data.get('player');
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    controller.advance();
  }
});
