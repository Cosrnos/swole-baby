import Ember from 'ember';
import Data from '../../services/data';
import PerkData from '../../data/perk';
import ClearStatsOnWillTransition from '../../mixins/clear-stats-on-will-transition';

export default Ember.Route.extend(ClearStatsOnWillTransition, {
  model: function () {
    return Data.storeFor('perk').getRandom({
      rank: PerkData.Rank.F
    }, 4).map(function (model, index) {
      if (index % 2 === 1) {
        model.set('clearfix', true);
      }
      return model;
    });
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    controller.set('player', Data.get('player'));
  },

  actions: {
    select_perk: function (perk) {
      var baby = this.get('controller.player.baby');

      // TODO: Redirect this to the battle tutorial
      this.transitionTo('welcome.ready');

      baby.activatePerk(perk);
    }
  }
});
