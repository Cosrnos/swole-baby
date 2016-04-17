import Ember from 'ember';
import ClearStatsOnWillTransition from '../../mixins/clear-stats-on-will-transition';

export default Ember.Route.extend(ClearStatsOnWillTransition, {
  actions: {
    pick_diet: function (diet) {
      var baby = this.get('controller.model');
      this.transitionTo('welcome.activity');

      switch (diet) {
        case 'vegan':
          baby.addStats({ mag: 1 });
          baby.addStats({ wis: 1 });
          break;
        case 'paleo':
          baby.addStats({ cha: 1 });
          baby.addStats({ sel: 1 });
          break;
        case 'atkins':
          baby.addStats({ str: 1 });
          baby.addStats({ end: 1 });
          break;
      }

      baby.set('diet', diet);
    }
  }
});
