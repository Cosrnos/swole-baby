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

  statModDisplays: Ember.computed('statMod.{str,end,cha,sel,mag,wis}', function () {
    var statMod = this.get('statMod');
    var mods = Object.keys(statMod).map((key)=> {
      var stat = key.toUpperCase();
      var mod = statMod[key];
      var posSym = (mod > -1) ? '+' : '';

      return `${stat} ${posSym}${mod}`;
    });

    return mods;
  }),

  _activate: function () {
    
  },
  _deactivate: function () {

  }
});
