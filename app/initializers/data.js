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

  //Sounds
  //Happy giggle - Good for confirmation things.
  createjs.Sound.registerSound("assets/sounds/vanessa1.ogg", 'baby1');
  //Ransom goo's and gaa's.
  createjs.Sound.registerSound("assets/sounds/vanessa2.ogg", 'baby2');
  createjs.Sound.registerSound("assets/sounds/vanessa3.ogg", 'baby3');
  createjs.Sound.registerSound("assets/sounds/vanessa4.ogg", 'baby4');
  createjs.Sound.registerSound("assets/sounds/vanessa5.ogg", 'baby5');
  createjs.Sound.registerSound("assets/sounds/vanessa7.ogg", 'baby6');
  createjs.Sound.registerSound("assets/sounds/vanessa9.ogg", 'baby7');
  createjs.Sound.registerSound("assets/sounds/babbling/babble23.ogg", 'baby8');
  //babbling
  createjs.Sound.registerSound("assets/sounds/babbling/babble18.ogg", 'babble1');
  createjs.Sound.registerSound("assets/sounds/babbling/babble19.ogg", 'babble2');
  createjs.Sound.registerSound("assets/sounds/babbling/babble20.ogg", 'babble3');
  createjs.Sound.registerSound("assets/sounds/babbling/babble25.ogg", 'babble4');
  createjs.Sound.registerSound("assets/sounds/babbling/babble27.ogg", 'babble5');
  createjs.Sound.registerSound("assets/sounds/babbling/babble28.ogg", 'babble6');
  createjs.Sound.registerSound("assets/sounds/babbling/babble29.ogg", 'babble7');

  //song
  var swole_song_g = createjs.Sound.registerSound("assets/sounds/Baby_Got_Swole.ogg", 'swolesong');

}

export default {
  name: 'data',
  initialize
};