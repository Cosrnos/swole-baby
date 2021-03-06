import Model from './model';
import Ember from 'ember';
import BabyData from '../data/baby';
import PerkData from '../data/perk';
import Perkable from '../mixins/perkable';
import _ from 'lodash/lodash';

function generatePercMod(property) {
  return Ember.computed(property, function () {
    var p = this.get(property);
    p = p * 2;

    if (p < 10) {
      return 10;
    } else if (p > 100) {
      return 100;
    }

    return p
  });
}

export default Model.extend(Perkable, {
  modelType: 'baby',
  targetType: PerkData.Targets.Baby,

// Properties
  name: null,
  isEnemy: null,

  str: 2,
  end: 2,
  cha: 2,
  sel: 2,
  mag: 2,
  wis: 2,
  clicksPerSec: 4, // AI Controlled only
  gender: 'male',
  rank: BabyData.Rank.F,

  strPerc: generatePercMod('str'),
  endPerc: generatePercMod('end'),
  chaPerc: generatePercMod('cha'),
  selPerc: generatePercMod('sel'),
  magPerc: generatePercMod('mag'),
  wisPerc: generatePercMod('wis'),

  statChanges: null,

  // Computed Macros
  isMale: Ember.computed.equal('gender', 'male'),
  isChampion: Ember.computed.gte('rank', BabyData.Rank.CHAMPION),

  // Hooks
  init: function () {
    if (!this.get('name')) {
      this.setProperties(BabyData.getRandomProfile());
    }

    this.set('statChanges', []);

    this._super();
  },

  addStats: function (mod) {
    var keys = Object.keys(mod);
    var current = this.getProperties(keys);

    keys.forEach((key)=> {
      current[key] += mod[key];
      if (current[key] < 1) {
        current[key] = 1;
      }

      this.set(`${key}ChangeIcon`, (mod[key] > -1) ? 'glyphicon-circle-arrow-up' : 'glyphicon-circle-arrow-down');
      this.set(`${key}ChangeColor`, (mod[key] > -1) ? 'text-success' : 'text-danger');
    });

    this.setProperties(current);
  },

  clearStatsDidAdvance: function () {
    this.setProperties({
      strChangeIcon: '',
      strChangeColor: '',
      endChangeIcon: '',
      endChangeColor: '',
      chaChangeIcon: '',
      chaChangeColor: '',
      selChangeIcon: '',
      selChangeColor: '',
      magChangeIcon: '',
      magChangeColor: '',
      wisChangeIcon: '',
      wisChangeColor: '',
    });
  },

// Computed Properties
  s_he: Ember.computed('isMale', function () {
    if (this.get('isMale')) {
      return 'he';
    }
    return 'she';
  }),
  him_her: Ember.computed('isMale', function () {
    if (this.get('isMale')) {
      return 'him';
    }
    return 'her';
  }),
  his_her: Ember.computed('isMale', function () {
    if (this.get('isMale')) {
      return 'his';
    }
    return 'her';
  }),
  his_hers: Ember.computed('isMale', function () {
    if (this.get('isMale')) {
      return 'his';
    }
    return 'hers';
  }),

  str_exp: Ember.computed('str', function () {
    const str = this.get('str');

    if (str < 5) {
      return 'a weak ass baby';
    } else if (str < 10) {
      return 'a scrawny lookin baby';
    } else if (str < 15) {
      return 'an average lookin baby';
    } else if (str < 20) {
      return 'a kinda swole baby';
    } else if (str < 25) {
      return 'a swole baby';
    } else if (str < 30) {
      return 'ripped bro';
    } else if (str < 35) {
      return 'so fuckin swole';
    } else {
      return 'the swollest of babies oh my god';
    }
  }),

  end_exp: Ember.computed('end', function () {
    const end = this.get('end');

    if (end < 3) {
      return 'weak willed';
    } else if (end < 6) {
      return 'a no good quitter';
    } else if (end < 9) {
      return 'tries pretty hard';
    } else if (end < 12) {
      return `doesn't give up ever`;
    } else {
      return 'made of metal';
    }
  }),

  cha_exp: Ember.computed('cha', function () {
    const cha = this.get('cha');

    if (cha < 5) {
      return `doesn't even know english`;
    } else if (cha < 10) {
      return `can kinda say papa`;
    } else if (cha < 15) {
      return `is hard to understand`;
    } else if (cha < 20) {
      return 'kinda articulate';
    } else if (cha < 25) {
      return 'hella good talker';
    } else if (cha < 30) {
      return 'popular';
    } else if (cha < 35) {
      return 'a motherfuckin stud';
    } else {
      return 'can negotiate peace treaties or something dude';
    }
  }),

  sel_exp: Ember.computed('sel', function () {
    const sel = this.get('sel');

    if (sel < 3) {
      return 'is just really pathetic';
    } else if (sel < 6) {
      return 'kinda happy';
    } else if (sel < 9) {
      return 'pretty confident';
    } else if (sel < 12) {
      return `has no ego`;
    } else {
      return 'has reached nirvana';
    }
  }),

  mag_exp: Ember.computed('mag', function () {
    const mag = this.get('mag');

    if (mag < 5) {
      return `so fucking dumb`;
    } else if (mag < 10) {
      return `doesn't know shit`;
    } else if (mag < 15) {
      return `not that smart`;
    } else if (mag < 20) {
      return 'knows enough';
    } else if (mag < 25) {
      return 'a learned baby';
    } else if (mag < 30) {
      return 'a scholar or something';
    } else if (mag < 35) {
      return 'knows more than me';
    } else {
      return 'is best friends with neil de-fuckin-grasse tyson';
    }
  }),

  wis_exp: Ember.computed('wis', function () {
    const wis = this.get('wis');

    if (wis < 3) {
      return 'a new soul';
    } else if (wis < 6) {
      return 'has a limited world view';
    } else if (wis < 9) {
      return 'has common sense';
    } else if (wis < 12) {
      return `has seen some shit`;
    } else {
      return 'is a buddhist monk';
    }
  }),

  //Battle Stuff
  swoleness: 0,

  babySounds: ['baby2','baby3','baby4','baby5','baby6','baby7','baby8'],
  babbleSounds: ['babble1','babble2','babble3','babble4','babble5','babble6','babble7'],

  prepareForBattle: function () {
    this.setProperties({
      swoleness: 0,
      magicAttackFatigue: 0,
      charismaAttackFatigue: 0,
      muscleAttackFatigue: 0
    });
  },

  magicAttackBase: Ember.computed('mag', function () {
    return (this.get('mag'));
  }),
  magicAttackFatigue: 0,
  magicAttackFatigueRate: Ember.computed('magicAttackBase', function () {
    return 0.05;
  }),
  magicAttackRecoveryRate: Ember.computed('wis', function () {
    var wis = this.get('wis');
    var multiplier = 1 + ((wis - 10) / 100);
    return 0.01 * multiplier;
  }),

  magicAttackWords: ['shazam', 'abracadabra', 'firebolt', 'pew pew pew', 'whiz', 'cigam', 'alakazam', 'magic missile',
    'hocus pocus', 'klaatu barada nikto', 'please', 'wingardium leviosa', 'alohomora', 'expelliarmus', 'expecto patronum',
    'ultima', 'luminaire', 'voodoo', 'juju', 'necronomicon', 'gandalf the grey', "you're a wizard harry", 'polyjuice',
    'sorcery', 'moon magic', 'friendship magic', 'untap upkeep draw', 'second main phase', 'black lotus', 'dual land',
    'werebear', 'ancestral recall', 'counterspell'],

  charismaAttackBase: Ember.computed('cha', function () {
    return this.get('cha');
  }),
  charismaAttackFatigue: 0,
  charismaAttackFatigueRate: Ember.computed('charismaAttackBase', function () {
    return 0.05;
  }),
  charismaAttackRecoveryRate: Ember.computed('sel', function () {
    var sel = this.get('sel');
    var multiplier = 1 + ((sel - 10) / 100);

    return 0.01 * multiplier;
  }),
  charismaAttackWords: ['wink', 'smile', 'joke', 'single-eyebrow-raise', 'foppish grin', 'hair flip', 'compliment',
    'active listening', 'cool pun', 'hard dis', "tip 'o the hat", 'smirk', 'compliment', 'dig', 'neg', 'double entendre',
    'triple entendre', 'quandruple entendre', 'single entendre', 'spoony bard', 'non-sequitur', 'soliloquy', 'giggle',
    'intimidate', 'befriend', 'manipulate', 'pep talk', 'animal friend', 'barter', 'fun fact', 'pro tip'],

  muscleAttackBase: Ember.computed('str', function () {
    return this.get('str');
  }),
  muscleAttackFatigue: 0,
  muscleAttackFatigueRate: Ember.computed('muscleAttackBase', function () {
    return 0.05;
  }),
  muscleAttackRecoveryRate: Ember.computed('end', function () {
    var end = this.get('end');
    var multiplier = 1 + ((end - 10) / 100);

    return 0.01 * multiplier;
  }),
  muscleAttackWords: ['flex', 'stretch', 'pecks', 'swole', 'glutes', 'lats', 'leg day', 'progressive resistance',
    'diesel', 'cornfed', '50 shades of gains', 'muscle milk', 'max gains', 'whey protein', 'bro science', 'squats', 'veins everywhere',
    'horse powered', 'dead lift', 'yolked', 'beast mode', 'optimus prime', 'campbells chunky souped', 'jacked', 'ripped',
    'swol night shyamalan'],

  battleTick: function () {
    var magicAttackFatigue = this.get('magicAttackFatigue');
    var magicAttackRecoveryRate = this.get('magicAttackRecoveryRate');

    var charismaAttackFatigue = this.get('charismaAttackFatigue');
    var charismaAttackRecoveryRate = this.get('charismaAttackRecoveryRate');

    var muscleAttackFatigue = this.get('muscleAttackFatigue');
    var muscleAttackRecoveryRate = this.get('muscleAttackRecoveryRate');

    var newMuscleAttackFatigue = muscleAttackFatigue - muscleAttackRecoveryRate;
    newMuscleAttackFatigue = newMuscleAttackFatigue >= 0 ? newMuscleAttackFatigue : 0;

    var newMagicAttackFatigue = magicAttackFatigue - magicAttackRecoveryRate;
    newMagicAttackFatigue = newMagicAttackFatigue >= 0 ? newMagicAttackFatigue : 0;

    var newCharismaAttackFatigue = charismaAttackFatigue - charismaAttackRecoveryRate;
    newCharismaAttackFatigue = newCharismaAttackFatigue >= 0 ? newCharismaAttackFatigue : 0;

    this.set('magicAttackFatigue', newMagicAttackFatigue);
    this.set('charismaAttackFatigue', newCharismaAttackFatigue);
    this.set('muscleAttackFatigue', newMuscleAttackFatigue);
  },

  calcAttack: function (attack, fatigue) {
    var newAttack = .5 * ( -(attack * fatigue) + (attack / (Math.exp(10 * fatigue - 5) + 1 )) + attack );

    return newAttack;
  },

  muscleAttack: function (opponent) {
    var muscleAttackBase = this.get('muscleAttackBase');
    var muscleAttackFatigue = this.get('muscleAttackFatigue');
    var muscleAttackFatigueRate = this.get('muscleAttackFatigueRate');

    var attack = this.calcAttack(muscleAttackBase, muscleAttackFatigue);
    attack = attack >= 0 ? attack : 0;

    var newMuscleAttackFatigue = muscleAttackFatigue + muscleAttackFatigueRate;
    newMuscleAttackFatigue = newMuscleAttackFatigue <= 1.05 ? newMuscleAttackFatigue : 1;

    this.set('muscleAttackFatigue', newMuscleAttackFatigue);
    this.incrementProperty('swoleness', attack);

    if (!this.get('isEnemy')) {
      this.animateAttackNumber(attack);
      if (Math.random() < 0.2) {
        this.animateAttackDesc(_.sample(this.get('muscleAttackWords')));
        //play random baby sound
        createjs.Sound.play(_.sample(this.get('babySounds')));
      }
    }
  },

  magicAttack: function (opponent) {
    var magicAttackBase = this.get('magicAttackBase');
    var magicAttackFatigue = this.get('magicAttackFatigue');
    var magicAttackFatigueRate = this.get('magicAttackFatigueRate');

    var attack = this.calcAttack(magicAttackBase, magicAttackFatigue);
    attack = attack >= 0 ? attack : 0;

    var newMagicAttackFatigue = magicAttackFatigue + magicAttackFatigueRate;
    newMagicAttackFatigue = newMagicAttackFatigue <= 1.05 ? newMagicAttackFatigue : 1;

    this.set('magicAttackFatigue', newMagicAttackFatigue);
    this.incrementProperty('swoleness', attack);

    if (!this.get('isEnemy')) {
      this.animateAttackNumber(attack);
      if (Math.random() < 0.2) {
        this.animateAttackDesc(_.sample(this.get('magicAttackWords')));
        //play random baby sound
        createjs.Sound.play(_.sample(this.get('babySounds')));
      }
    }
  },

  charismaAttack: function (opponent) {
    var charismaAttackBase = this.get('charismaAttackBase');
    var charismaAttackFatigue = this.get('charismaAttackFatigue');
    var charismaAttackFatigueRate = this.get('charismaAttackFatigueRate');

    var attack = this.calcAttack(charismaAttackBase, charismaAttackFatigue);
    attack = attack >= 0 ? attack : 0;

    var newCharismaAttackFatigue = charismaAttackFatigue + charismaAttackFatigueRate;
    newCharismaAttackFatigue = newCharismaAttackFatigue <= 1.05 ? newCharismaAttackFatigue : 1;

    this.set('charismaAttackFatigue', newCharismaAttackFatigue);
    this.incrementProperty('swoleness', attack);

    if (!this.get('isEnemy')) {
      this.animateAttackNumber(attack);
      if (Math.random() < 0.2) {
        this.animateAttackDesc(_.sample(this.get('charismaAttackWords')));
        //play random baby sound
        createjs.Sound.play(_.sample(this.get('babbleSounds')));
      }
    }
  },

  animateAttackNumber: function (number) {
    var newNumber = $('#numberBounce').clone();
    if (number < 10) {
      number = parseFloat(number, 10).toFixed(2);
    } else {
      number = parseFloat(number, 10).toFixed(0);
    }
    newNumber.append(number);
    newNumber.css('top', event.pageY - 40);
    newNumber.css('left', event.pageX - 20);
    newNumber.appendTo('body');

    //now that the element is position, center it above the cursor.
    var width = newNumber.width();
    newNumber.css('left', event.x - (width / 2));

    //Animate it floating up.
    newNumber.animate({"top": ["-=150px", "swing"], "opacity": "-1"}, 700, function () {
      newNumber.remove();
    });
  },

  animateAttackDesc: function (desc) {
    var newDesc = $('#descBounce').clone();

    newDesc.append(desc);
    newDesc.css('top', event.pageY + 15);
    newDesc.css('left', event.pageX - 20);
    newDesc.appendTo('body');

    //now that the element is position, center it above the cursor.
    var width = newDesc.width();
    newDesc.css('left', event.x - (width / 2));

    newDesc.animate({"top": ["+=100px", "swing"], "opacity": "-1"}, "slow", function () {
      newDesc.remove();
    });
  },

  rankName: Ember.computed('rank', function () {
    var rank = this.get('rank');
    var minRank = 'F';

    Object.keys(BabyData.Rank).forEach((rankName) => {
      if (BabyData.Rank[rankName] === rank) {
        minRank = rankName;
      }
    });

    return minRank;
  }),

  minRankName: Ember.computed('rankName', function () {
    return `isMinRank${this.get('rankName')}`;
  }),

  clickInterval: Ember.computed('clicksPerSec', function () {
    return Math.floor(1000 / (this.get('clicksPerSec') || 4));
  })
});
