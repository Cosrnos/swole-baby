import Ember from 'ember';
import Data from '../services/data';

export default Ember.Route.extend({
  model: function () {
    return Data.get('player');
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    controller.set('createjs', createjs);
    controller.set('sound_muted', false);

  },
  redirect: function () {
    this.transitionTo('welcome');
  },

  actions:{
    toggleSound: function(){
      var sound_muted = this.controller.get('sound_muted');
      this.controller.set('sound_muted', !sound_muted);
      createjs.Sound.setMute(!sound_muted);
    }
  }
});
