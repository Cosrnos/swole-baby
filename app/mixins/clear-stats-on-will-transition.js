import Ember from 'ember';
import Data from '../services/data';

export default Ember.Mixin.create({
  actions: {
    willTransition: function () {
      Data.get('player.baby').clearStatsDidAdvance();
    }
  }
});
