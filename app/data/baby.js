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
  }
}
