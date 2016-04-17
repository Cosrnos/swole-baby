import Rank from './rank';

var profiles = [{
  name: `trygvee`,
  gender: 'male',
}, {
  name: `reginald`,
  gender: 'male',
}, {
  name: `facer`,
  gender: 'male',
}, {
  name: `facer`,
  gender: 'female',
}, {
  name: `shnookie`,
  gender: 'male',
}, {
  name: `baller (shot caller)`,
  gender: 'male',
}, {
  name: `noogums`,
  gender: 'male',
}, {
  name: `space chief`,
  gender: 'male',
}, {
  name: `space chief`,
  gender: 'female',
}, {
  name: `yo' baby`,
  gender: 'male',
}, {
  name: `yo' baby`,
  gender: 'female',
}, {
  name: `iggins`,
  gender: 'male',
}, {
  name: `iggins`,
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
    var statDistro = Math.floor(4 * rank);
    debugger;

    for (var i = 0; i < statDistro; i++) {
      babyStats[getRandomStat()] += 1;
    }

    console.log(babyStats);

    return Object.assign({
      rank: rank
    }, profile, babyStats);
  },
  Rank
}
