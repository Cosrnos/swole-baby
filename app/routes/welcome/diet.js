import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    pick_diet: function (diet) {
      var baby = this.get('controller.model');

      switch (diet) {
        case 'vegan':
          baby.incrementProperty('mag');
          baby.incrementProperty('wis');
          break;
        case 'paleo':
          baby.incrementProperty('cha');
          baby.incrementProperty('sel');
          break;
        case 'atkins':
          baby.incrementProperty('str');
          baby.incrementProperty('end');
          break;
      }

      baby.set('diet', diet);

      this.transitionTo('welcome.activity');
    }
  }
});
