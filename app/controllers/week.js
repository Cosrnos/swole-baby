import Ember from 'ember';
import Data from '../services/data';

const RSVP = Ember.RSVP;
const MAX_WEEKS = 12;

export default Ember.Controller.extend({
  screen: null,
  scenario: null,

  player: Ember.computed.alias('model'),

  isStandardScreen: Ember.computed.equal('screen', 'standard'),
  isScenarioScreen: Ember.computed.equal('screen', 'scenario'),
  
  advance: function () {
    this.incrementProperty('player.week');
    this.get('player.baby').clearStatsDidAdvance();
    var done = this.checkEndgame();

    if (done) {
      return this.transitionToRoute('finish');
    }

    var random_hook = this.rollForRandom();

    if (random_hook) {
      return this.renderRandom(random_hook);
    }

    this.set('screen', 'standard');
  },
  checkEndgame: function () {
    return (this.get('player.weeks') > MAX_WEEKS)
  },
  rollForRandom: function () {
    // TODO:
  },
  renderRandom: function (scenario) {
    this.set('screen', 'scenario');
    this.set('scenario', scenario);
  },
  actions: {
    handleFinishScenario: function () {
      this.set('scenario', null);
      this.advance();
    },
    enterStandardScenario: function (primary, secondary) {
      this.get('player.baby').clearStatsDidAdvance();

      if (primary === 'train') {
        this.send('enterTrainScenario', secondary);
      }
    },
    enterTrainScenario: function (stat) {
      debugger;
      var scene = Data.storeFor('scene').getRandom({
        type: 'train',
        stat: stat
      });

      if (!scene) {
        // TODO: Handle error scene
      }

      this.set('scenario', scene);
      this.set('screen', 'scenario');
    }
  }
});
