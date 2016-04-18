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
  battleCountdownStarted: false,
  wonBattle: null,
  timeLeft: 25000, //25 seconds

  timeLeftFormatted: Ember.computed('timeLeft', function () {
    return (this.get('timeLeft') / 1000).toFixed(1);
  }),

  init: function () {
    this.prepareBabies();

    if (this.get('startOnRender')) {
      this.send('startBattle');
    }
    this._super();
  },

  battleTick: function () {
    if (this.get('battleStarted')) {
      var baby = this.get('baby');
      var opponent = this.get('opponent');

      baby.battleTick();
      if (opponent) {
        opponent.battleTick();
      }

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

  opponentClick: function () {
    var opponent = this.get('opponent');

    var attacks = [opponent.magicAttack, opponent.charismaAttack, opponent.muscleAttack];
    var attack = _.sample(attacks);

    attack.call(opponent);
    Ember.run.throttle(this.jiggleOpponentSwoleness, 200);

  },

  finishBattle: function () {
    this.set('battleFinished', true);
    var playerSwoleness = this.get('baby.swoleness') || 0;
    var opponentSwoleness = this.get('opponent.swoleness') || 0;

    var didWin = playerSwoleness > opponentSwoleness;
    this.set('wonBattle', didWin);

    this.sendAction('onFinish', {
      playerSwoleness,
      opponentSwoleness,
      didWin
    });
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

  prepareBabies: function () {
    var baby = this.get('baby');
    var opponent = this.get('opponent');

    baby.prepareForBattle();

    if (opponent) {
      opponent.prepareForBattle();
    }
  },

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

  _actuallyForRealBeginTheBattle: function () {
    var timer = setInterval(() => {
      this.battleTick();
    }, 100);

    //Timer to simulate opponent clicks.
    if (this.get('opponent')) {
      var opponentTimer = setInterval(() => {
        this.opponentClick();
      }, this.get('opponent.clickInterval'));
      this.set('opponentTimer', opponentTimer);
    }

    this.set('timer', timer);
    this.set('timeLeft', this.get('timeLimit') || 25000);
    this.set('battleStarted', true);
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

    //Start the countdown timer to begin the battle.
    startBattle: function () {
      //Countdown to the battle:
      this.set('battleCountdownStarted', true);
      createjs.Sound.play('baby1')

      var countDown = 2000;
      var battleCountDownTimer = setInterval(() => {
        countDown -= 20;
        this.set('battleStartCountdown', (countDown / 1000).toFixed(2));

        var battleCountdownPercentage = Math.ceil(( (countDown / 2000)) * 100);
        this.set('battleCountdownPercentage', `width: ${battleCountdownPercentage}%`);

        if (countDown <= 0) {
          //Actually Begin the battle
          this._actuallyForRealBeginTheBattle();
          clearInterval(battleCountDownTimer);
        }

      }, 20);
    },
  }
});
