import Model from './model';
import Ember from 'ember';
import SceneData from '../data/scene';

export default Model.extend({
  modelType: 'scene',
  componentName: null,
  title: null,
  type: 'train',
  statMod: null,
  _activate: function (player) {
    var statMod = this.get('statMod');
    if (statMod) {
      player.get('baby').addStats(statMod);
    }

    this.start(player);
  },
  _deactivate: function (player) {
    player.get('baby').clearStatsDidAdvance()
    this.end(player);
  },
  start: function () {
  },
  end: function () {
  }
});
