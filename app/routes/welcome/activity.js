import Ember from 'ember';
import ClearStatsOnWillTransition from '../../mixins/clear-stats-on-will-transition';

export default Ember.Route.extend(ClearStatsOnWillTransition, {
  actions: {
    pick_activity: function (activity) {
      var baby = this.get('controller.model');

      this.transitionTo('welcome.perk');
      
      switch (activity) {
        case 'gym':
          baby.addStats({ end: 1 });
          break;
        case 'tan':
          baby.addStats({ sel: 1 });
          break;
        case 'laundry':
          baby.addStats({ wis: 1 });
          break;
      }
    }
  }
});
