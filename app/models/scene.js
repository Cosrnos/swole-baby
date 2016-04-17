import Model from './model';
import Ember from 'ember';
import SceneData from '../data/scene';
import Data from '../services/data';

export default Model.extend({
  modelType: 'scene',
  componentName: null,
  title: null,
  type: null,
  statMod: null,

  player: Ember.computed('', function () {
    return Data.get('player');
  }),
  
  // Rank Info
  isMinRankF: Ember.computed.lte('rank', SceneData.Rank.F),
  isMinRankE: Ember.computed.lte('rank', SceneData.Rank.E),
  isMinRankD: Ember.computed.lte('rank', SceneData.Rank.D),
  isMinRankC: Ember.computed.lte('rank', SceneData.Rank.C),
  isMinRankB: Ember.computed.lte('rank', SceneData.Rank.B),
  isMinRankA: Ember.computed.lte('rank', SceneData.Rank.A),
  isMinRankS: Ember.computed.lte('rank', SceneData.Rank.S),
  isMinRankSSS: Ember.computed.lte('rank', SceneData.Rank.SSS),
  isMinRankCHAMPION: Ember.computed.lte('rank', SceneData.Rank.CHAMPION),
  isMinRankDEBUG: Ember.computed.lte('rank', SceneData.Rank.DEBUG),
  
  _activate: function (SceneManager, player) {
    var statMod = this.get('statMod');
    if (statMod) {
      player.get('baby').addStats(statMod);
    }
    
    this.start(SceneManager, player);
  },
  _deactivate: function (SceneManager, player) {
    player.get('baby').clearStatsDidAdvance()
    this.end(SceneManager, player);
  },
  start: function () {
  },
  end: function () {
  }
});
