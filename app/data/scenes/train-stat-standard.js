import SceneModel from '../../models/scene';
import Ember from 'ember';

var StatTrain = SceneModel.extend({
  componentName: 'scene-next',
  title: 'Business As Usual',
  type: 'train',
  stat: null,
  statMod: Ember.computed('stat', function () {
    var mod = {};
    mod[this.get('stat')] = 2;
    return mod;
  }),
  text: Ember.computed('player.week', 'name', function () {
    const name = this.get('name');
    const phrases = [
      `Your baby worked all week training its ${name}`,
      `PUSH IT TO THE LIMIT! Your baby's ${name} has increased!`,
      `Your baby is getting so swole! ${name} increased`,
      `No Pain, No gain dude you got this. ${name} has gone up.`
    ];
    // Trigger week recalc
    this.get('player.week');

    return phrases[Math.floor(Math.random() * phrases.length)];
  }),
  start: function () {
  },
  end: function () {
  }
});

export default function () {
  // Generic Stat Training
  StatTrain.create({
    stat: 'str',
    name: 'Muscles'
  });
  StatTrain.create({
    stat: 'end',
    name: 'Endurance'
  });
  StatTrain.create({
    stat: 'cha',
    name: 'Charisma'
  });
  StatTrain.create({
    stat: 'sel',
    name: 'Self Esteem'
  });
  StatTrain.create({
    stat: 'mag',
    name: 'Magic Attack'
  });
  StatTrain.create({
    stat: 'wis',
    name: 'Wisdom'
  });
}
