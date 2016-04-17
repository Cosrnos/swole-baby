import Ember from 'ember';

export default Ember.Controller.extend({
  step: 1,
  stepOne: Ember.computed.equal('step', 1),
  stepTwo: Ember.computed.equal('step', 2),

  counter: 30,
  counterFormatted: Ember.computed('counter', function () {
    return this.get('counter').toFixed(1);
  }),
  done: Ember.computed.lte('counter', 0),

  init: function () {
    this.set('step', 1);
  },

  actions: {
    startPose: function () {
      var countLoop;
      var self = this;

      this.get('model').clearStatsDidAdvance();
      this.set('step', 2);

      countLoop = window.setInterval(function () {
        self.decrementProperty('counter', 0.1);
        if (self.get('counter') < 0) {
          window.clearInterval(countLoop);
        }
      }, 100)
    }
  }
});
