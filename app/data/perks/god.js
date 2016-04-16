import PerkData from '../perk';
import PerkModel from '../../models/perk';

export default function () {
  PerkModel.create({
    name: 'God',
    target: PerkData.Targets.Baby,
    rank: PerkData.Rank.DEBUG,
    description: 'This baby is god!!!!!!',
    statMod: {
      str: 999,
      end: 999,
      cha: 999,
      sel: 999,
      mag: 999,
      wis: 999
    },
    passiveActivate: function (target) {
      // TODO: Unlock god skill
    },
    passiveDeactivate: function (target) {
    }
  });
}
