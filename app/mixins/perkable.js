import Ember from 'ember';
import PerkData from '../data/perk';

export default Ember.Mixin.create({
  targetType: PerkData.Targets.NONE,
  activePerks: null,
  init: function () {
    this.set('activePerks', []);
    this._super();
  },
  activatePerk: function (perk) {
    if (this.get('targetType') !== perk.get('target')) {
      return; // Not able to be applied
    }

    this._activateStatMods(perk.get('statMod'), this);
    perk._activate(this);
    this.get('activePerks').addObject(perk);
  },
  deactivatePerk: function (perk) {
    if (!this.get('activePerks').contains(perk)) {
      return;
    }

    this._deactivateStatMods(perk.get('statMod'), this);
    perk._deactivate(this)
    this.get('activePerks').removeObject(perk);
  },

  _activateStatMods: function (mod, target) {
    var keys = Object.keys(mod);
    var current = target.getProperties(keys);

    keys.forEach((key)=> {
      current[key] += mod[key];
      if (current[key] < 0) {
        current[key] = 1;
      }
    });

    target.setProperties(current);
  },
  _deactivateStatMods: function (mod, target) {
    var keys = Object.keys(mod);
    var current = target.getProperties(keys);

    keys.forEach((key)=> {
      current[key] -= mod[key];
    });

    target.setProperties(current);
  },
});
