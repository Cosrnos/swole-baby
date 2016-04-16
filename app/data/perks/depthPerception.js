import PerkData from '../perk';
import PerkModel from '../../models/perk';

export default function () {
  PerkModel.create({
    name: 'Depth Perception',
    target: PerkData.Targets.Baby,
    rank: PerkData.Rank.F,
    description: 'One step above sight',
    statMod: {
      wis: 1
    }
  });
}
