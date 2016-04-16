import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    pick_activity: function (activity) {
      var baby = this.get('controller.model');

      switch (activity) {
        case 'gym':
          baby.incrementProperty('end');
          break;
        case 'tan':
          baby.incrementProperty('sel');
          break;
        case 'laundry':
          baby.incrementProperty('wis');
          break;
      }

      this.transitionTo('welcome.perk');
    }
  }
});
