import Ember from 'ember';
import Data from '../services/data';
import SceneData from '../data/scene';
import TourneySchedule from '../services/tourney-schedule';

const RSVP = Ember.RSVP;
const MAX_WEEKS = 55;

export default Ember.Controller.extend({
  screen: null,
  scenario: null,
  tourneyHighlight: null,
  scenarioFinishHandler: null,
  scenarioComponentName: Ember.computed.alias('scenario.componentName'),
  
  player: Ember.computed.alias('model'),
  
  isStandardScreen: Ember.computed.equal('screen', 'standard'),
  isScenarioScreen: Ember.computed.equal('screen', 'scenario'),
  isTourneyListScreen: Ember.computed.equal('screen', 'tourney-list'),

  isTourneyWeek: Ember.computed('player.week', function () {
    return (this.get('player.week') % 6 === 0);
  }),
  
  advance: function () {
    this.incrementProperty('player.week');
    var week = this.get('player.week');
    this.get('player.baby').clearStatsDidAdvance();
    var done = this.checkEndgame();
    
    if (done) {
      return this.transitionToRoute('finish');
    }

    this.set('tourneyHighlight', TourneySchedule.get('availableTourneys.0'));
    
    if (week > 1) {
      var random_hook = this.rollForRandom();

      if (random_hook) {
        return this.renderRandom(random_hook);
      }
    }
    
    this.set('screen', 'standard');
  },
  checkEndgame: function () {
    return ((this.get('player.week') > MAX_WEEKS) || this.get('player.baby.rank') >= SceneData.Rank.CHAMPION)
  },
  rollForRandom: function () {
    var baby = this.get('player.baby');
    var lookupData = {
      random: true,
    };
    lookupData[baby.get('minRankName')] = true;
    var randomScene = Data.storeFor('scene').getRandom(lookupData);
    if (randomScene) {
      var roll = Math.floor(Math.random() * 100);
      if (roll < (randomScene.chance || 0)) {
        return randomScene;
      }
    }
  },
  renderRandom: function (scenario) {
    this.set('screen', 'scenario');
    this.set('scenario', scenario);
    this.set('scenarioFinishHandler', 'handleFinishRandom');
  },
  actions: {
    handleFinishRandom: function () {
      this.set('screen', 'standard');
      this.set('scenario', null);
    },
    handleFinishStandard: function () {
      this.set('scenario', null);
      this.advance();
    },
    enterStandardScenario: function (primary, secondary) {
      this.get('player.baby').clearStatsDidAdvance();
      this.set('scenarioFinishHandler', 'handleFinishStandard');

      if (primary === 'train') {
        this.send('enterTrainScenario', secondary);
      }
    },
    handleTourneySelect: function (tourney) {
      this.get('player.baby').clearStatsDidAdvance();
      this.set('scenarioFinishHandler', 'handleFinishStandard');

      this.set('scenario', tourney);
      this.set('screen', 'scenario');
    },
    enterTrainScenario: function (stat) {
      var scene = Data.storeFor('scene').getRandom({
        type: 'train',
        stat: stat
      });
      
      if (!scene) {
        // TODO: Handle error scene
      }
      
      this.set('scenario', scene);
      this.set('screen', 'scenario');
    },
    changeScreen: function (screen) {
      this.set('screen', screen);
    },
    handleSceneTransition: function (scene) {
      this.set('scenario', scene);
    }
  }
});
