import PerkData from '../perk';
import PerkModel from '../../models/perk';

export default function () {
  PerkModel.create({
    name: 'Vomit',
    target: PerkData.Targets.Baby,
    rank: PerkData.Rank.F,
    description: 'Wait it does this all the time?',
    statMod: {
      mag: 2,
      cha: -1
    }
  });
}
