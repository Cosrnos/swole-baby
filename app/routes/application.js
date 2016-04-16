import Ember from 'ember';
import Player from '../models/player';

export default Ember.Route.extend({
  model: function () {
    return Player.create({ showInfo: true });
  },
  redirect: function () {
    this.transitionTo('welcome');
  }
});
