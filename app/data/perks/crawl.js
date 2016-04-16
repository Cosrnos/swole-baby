import PerkData from '../perk';
import PerkModel from '../../models/perk';

export default function () {
  PerkModel.create({
    name: 'Crawl',
    target: PerkData.Targets.Baby,
    rank: PerkData.Rank.F,
    description: `This baby's going places`,
    statMod: {
      str: 1
    }
  });
}
