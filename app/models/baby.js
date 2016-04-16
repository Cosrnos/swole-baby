import Model from './model';
import Ember from 'ember';
import BabyData from '../data/baby';
import PerkData from '../data/perk';
import Perkable from '../mixins/perkable';

export default Model.extend(Perkable, {
  modelType: 'baby',
  targetType: PerkData.Targets.Baby,

// Properties
  name: null,

  str: 2,
  end: 2,
  cha: 2,
  sel: 2,
  mag: 2,
  wis: 2,
  gender: 'male',

  // Computed Macros
  isMale: Ember.computed.equal('gender', 'male'),

  // Hooks
  init: function () {
    if (!this.get('name')) {
      this.setProperties(BabyData.getRandomProfile());
    }

    this._super();
  }
  ,

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

  magicAttackBase: Ember.computed('mag', function() {
    return (this.get('mag'));
  }),
  magicAttackFatigue: 0,
  magicAttackFatigueRate: Ember.computed('magicAttackBase', function() {
    return 0.05;
  }),
  magicAttackRecoveryRate: Ember.computed('wis', function() {
    return 0.01;
  }),

  charismaAttackBase: Ember.computed('cha', function() {
    return (this.get('cha'));
  }),
  charismaAttackFatigue: 0,
  charismaAttackFatigueRate: Ember.computed('charismaAttackBase', function() {
    return 0.05;
  }),
  charismaAttackRecoveryRate: Ember.computed('sel', function() {
    return 0.01;
  }),

  muscleAttackBase:  Ember.computed('str', function() {
    return (this.get('str')) * 0.05;
  }),
  muscleAttackFatigue: 0,
  muscleAttackFatigueRate: Ember.computed('muscleAttackBase', function() {
    return 0.05;
  }),
  muscleAttackRecoveryRate: Ember.computed('end', function() {
    return 0.01;
  }),

  battleTick: function(){
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

  muscleAttack: function(opponent) {
    var muscleAttackBase = this.get('muscleAttackBase');
    var muscleAttackFatigue = this.get('muscleAttackFatigue');
    var muscleAttackFatigueRate = this.get('muscleAttackFatigueRate');

    var attack = muscleAttackBase - (muscleAttackBase * muscleAttackFatigue);
    attack = attack >= 0 ? attack : 0;

    var newMuscleAttackFatigue = muscleAttackFatigue + muscleAttackFatigueRate;
    newMuscleAttackFatigue = newMuscleAttackFatigue <= 1 ? newMuscleAttackFatigue : 1;

    this.set('muscleAttackFatigue', newMuscleAttackFatigue);

    this.incrementProperty('swoleness', attack);
  },

  magicAttack: function(opponent) {
    var magicAttackBase = this.get('magicAttackBase');
    var magicAttackFatigue = this.get('magicAttackFatigue');
    var magicAttackFatigueRate = this.get('magicAttackFatigueRate');

    var attack = magicAttackBase - (magicAttackBase * magicAttackFatigue);
    attack = attack >= 0 ? attack : 0;

    var newMagicAttackFatigue = magicAttackFatigue + magicAttackFatigueRate;
    newMagicAttackFatigue = newMagicAttackFatigue <= 1 ? newMagicAttackFatigue : 1;

    this.set('magicAttackFatigue', newMagicAttackFatigue);

    this.incrementProperty('swoleness', attack);
  },

  charismaAttack: function(opponent) {
    var charismaAttackBase = this.get('charismaAttackBase');
    var charismaAttackFatigue = this.get('charismaAttackFatigue');
    var charismaAttackFatigueRate = this.get('charismaAttackFatigueRate');

    var attack = charismaAttackBase - (charismaAttackBase * charismaAttackFatigue);
    attack = attack >= 0 ? attack : 0;

    var newCharismaAttackFatigue = charismaAttackFatigue + charismaAttackFatigueRate;
    newCharismaAttackFatigue = newCharismaAttackFatigue <= 1 ? newCharismaAttackFatigue : 1;

    this.set('charismaAttackFatigue', newCharismaAttackFatigue);

    this.incrementProperty('swoleness', attack);
}});
