import Ember from 'ember';
import Player from '../models/player';

export default Ember.Route.extend({
  model: function () {
    return Player.create({});
  },
  redirect: function () {
    this.transitionTo('welcome');
  }
});
