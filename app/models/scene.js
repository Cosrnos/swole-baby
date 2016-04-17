import Model from './model';
import Ember from 'ember';
import SceneData from '../data/scene';

export default Model.extend({
  modelType: 'scene',
  componentName: null,
  title: null,
  type: 'train',
  statMod: null,
  
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
