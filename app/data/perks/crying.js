import PerkData from '../perk';
import PerkModel from '../../models/perk';

export default function () {
  PerkModel.create({
    name: 'Crying',
    target: PerkData.Targets.Baby,
    rank: PerkData.Rank.F,
    description: 'Oh my god just get it to shut up I mean jesus',
    statMod: {
      cha: 2,
      sel: -1
    }
  });
}
