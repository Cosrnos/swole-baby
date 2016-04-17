import Ember from 'ember';
import _ from 'lodash/lodash';
/**
 * Passed in properties:
 * Baby: Our Baby
 * Opponent: The other baby
 **/
export default Ember.Component.extend({

  battleStarted: false,
  battleFinished: false,
  wonBattle: null,
  timeLeft: 25000, //25 seconds

  init: function () {
    this._super();

  },

  battleTick: function () {
    if (this.get('battleStarted')) {
      var baby = this.get('baby');
      var opponent = this.get('opponent');

      baby.battleTick();
      opponent.battleTick();

      this.decrementProperty('timeLeft', 100);
      if (this.get('timeLeft') < 0) {
        this.set('timeLeft', 0);
        this.set('battleStarted', false);
        this.finishBattle();
        clearInterval(this.get('timer'));
        clearInterval(this.get('opponentTimer'));
      }
    }
  },

  opponentClick: function(){
    var opponent = this.get('opponent');

    var attacks = [opponent.magicAttack, opponent.charismaAttack, opponent.muscleAttack];
    var attack = _.sample(attacks);

    attack.call(opponent);
    Ember.run.throttle(this.jiggleOpponentSwoleness, 300);

  },

  finishBattle: function(){
    this.set('battleFinished', true);

    var didWin = this.get('baby.swoleness') > this.get('opponent.swoleness');
    this.set('wonBattle', didWin);

  },

  babyMusclePercentage: Ember.computed('baby.muscleAttackFatigue', function () {
    return Ember.String.htmlSafe("width: " + Math.ceil(this.get('baby.muscleAttackFatigue') * 100) + "%");
  }),
  babyMagicPercentage: Ember.computed('baby.magicAttackFatigue', function () {
    return Ember.String.htmlSafe("width: " + Math.ceil(this.get('baby.magicAttackFatigue') * 100) + "%");
  }),
  babyCharismaPercentage: Ember.computed('baby.charismaAttackFatigue', function () {
    return Ember.String.htmlSafe("width: " + Math.ceil(this.get('baby.charismaAttackFatigue') * 100) + "%");
  }),

  jiggleSwoleness: function () {
    $('#baby-swoleness').removeClass('animated-half pulse');
    Em.run.next(function () {
      $('#baby-swoleness').addClass('animated-half pulse');
    });
  },

  jiggleOpponentSwoleness: function () {
    $('#opponent-swoleness').removeClass('animated-half pulse');
    Em.run.next(function () {
      $('#opponent-swoleness').addClass('animated-half pulse');
    });
  },



  actions: {
    battleClick: function (type) {
      if (this.get('battleStarted')) {
        var baby = this.get('baby');

        if (type === 'muscle') {
          baby.muscleAttack();
        } else if (type === 'charisma') {
          baby.charismaAttack();
        } else if (type === 'magic') {
          baby.magicAttack();
        }
      }

      Ember.run.throttle(this.jiggleSwoleness, 200);
    },

    startBattle: function () {
      var timer = setInterval(() => {
        this.battleTick();
      }, 100);

      //Timer to simulate opponent clicks.
      var opponentTimer = setInterval(() => {
        this.opponentClick();
      }, 250);

      this.set('timer', timer);
      this.set('opponentTimer', opponentTimer);
      this.set('timeLeft', 25000)
      this.set('battleStarted', true);
    }
  }
});
