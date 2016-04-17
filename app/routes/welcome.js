import Ember from 'ember';
import Data from '../services/data';

export default Ember.Route.extend({
  model: function () {
    return Data.get('baby')
  },

  redirect: function (model, transition) {
    if(!Data.get('player.didCompleteTutorial')){
      return this.transitionTo('welcome.intro');
    }
  }
});
