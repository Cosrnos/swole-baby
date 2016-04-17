import Ember from 'ember';

export default Ember.Controller.extend({
  step: 1,
  stepOne: Ember.computed.equal('step', 1),
  stepTwo: Ember.computed.equal('step', 2),

  done: false,

  init: function () {
    this.set('step', 1);
    this.set('done', false);
  },

  actions: {
    startPose: function () {
      this.get('model').clearStatsDidAdvance();
      this.set('step', 2);
    },
    handle_finish: function (/* stats */) {
      this.set('done', true);

    }
  }
});
