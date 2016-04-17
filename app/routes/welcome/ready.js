import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    finish: function () {
      this.transitionTo('week');
    }
  }
});
