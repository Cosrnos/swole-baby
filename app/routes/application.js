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
    //debugger;

    //Makes sure the song plays, by trying to play the song until it is loaded and succeeds.
    function playSong(song) {
      function _playSong(song){
        if (song.playState === createjs.Sound.PLAY_FAILED) {
          Ember.run.later(function () {
            song.play();
            _playSong(song);
          }, 500);
        }
      }
      _playSong(song);
    }

   playSong(createjs.Sound.play('swolesong', {loop: -1, volume: .7}));

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
