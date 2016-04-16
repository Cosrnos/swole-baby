import initData from '../data/init';
import Player from '../models/player';
import Baby from '../models/baby';

export function initialize(/* application */) {
  initData();

  var playerBaby = Baby.create({});

  Player.create({
    showInfo: true,
    baby: playerBaby
  });
}

export default {
  name: 'data',
  initialize
};
