import Model from './model';
import Ember from 'ember';
import PerkData from '../data/perk';

export default Model.extend({
  modelType: 'perk',
  
  name: null,
  description: null,
  target: PerkData.Targets.NONE,
  rank: PerkData.Rank.DEBUG,
  statMod: null,
  passiveActivate: null,
  passiveDeactivate: null,

  _activate: function () {

  },
  _deactivate: function () {

  }
});
