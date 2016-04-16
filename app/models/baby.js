import Model from './model';
import Ember from 'ember';

export default Model.extend({
  name: null,
  gender: 'male',
  isMale: Ember.computed.equal('gender', 'male'),

  str: 1,
  end: 1,
  cha: 1,
  sel: 1,
  mag: 1,
  wis: 1,

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
  int_exp: Ember.computed('int', function () {
    const int = this.get('int');

    if (int < 5) {
      return `so fucking dumb`;
    } else if (int < 10) {
      return `doesn't know shit`;
    } else if (int < 15) {
      return `not that smart`;
    } else if (int < 20) {
      return 'knows enough';
    } else if (int < 25) {
      return 'a learned baby';
    } else if (int < 30) {
      return 'a scholar or something';
    } else if (int < 35) {
      return 'knows more than me';
    } else {
      return 'is best friends with neil de-fuckin-grasse tyson';
    }
  })
});
