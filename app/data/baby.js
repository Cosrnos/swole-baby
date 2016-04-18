import Rank from './rank';

var profiles = [{
  name: `Trygvee`,
  gender: 'male',
}, {
  name: `Reginald`,
  gender: 'male',
}, {
  name: `Facer`,
  gender: 'male',
}, {
  name: `Facer`,
  gender: 'female',
}, {
  name: `Shnookie`,
  gender: 'male',
}, {
  name: `Baller (Shot Caller)`,
  gender: 'male',
}, {
  name: `Noogums`,
  gender: 'male',
}, {
  name: `Space Chief`,
  gender: 'male',
}, {
  name: `Space Chief`,
  gender: 'female',
}, {
  name: `yo' baby`,
  gender: 'male',
}, {
  name: `yo' baby`,
  gender: 'female',
}, {
  name: `Iggins`,
  gender: 'male',
}, {
  name: `Iggins`,
  gender: 'female',
}];

export default {
  getRandomProfile: function () {
    return profiles[Math.floor(Math.random() * profiles.length)];
  },
  generateRankedBabyStats: function (rank) {
    var profile = this.getRandomProfile();
    var babyStats = {
      str: 2,
      end: 2,
      cha: 2,
      sel: 2,
      mag: 2,
      wis: 2
    };

    var statNames = Object.keys(babyStats);
    var getRandomStat = function () {
      return statNames[Math.floor(Math.random() * statNames.length)];
    };
    var statDistro = Math.floor(Math.pow(rank, 2) / 100 + 25 * (rank / 10));

    for (var i = 0; i < statDistro; i++) {
      babyStats[getRandomStat()] += 1;
    }

    return Object.assign({
      rank: rank,
      clicksPerSec: (4 + ((rank - 10) * 0.08)),
    }, profile, babyStats);
  },
  Rank
}
