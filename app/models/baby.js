import Model from './model';
import Ember from 'ember';
import BabyData from '../data/baby';

export default Model.extend({
  modelType: 'baby',

  // Properties
  name: null,

  str: 1,
  end: 1,
  cha: 1,
  sel: 1,
  mag: 1,
  wis: 1,
  gender: 'male',

  // Computed Macros
  isMale: Ember.computed.equal('gender', 'male'),

  // Hooks
  init: function () {
    if (!this.get('name')) {
      this.setProperties(BabyData.getRandomProfile());
    }

    this._super();
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
});
