import Ember from 'ember';
import BabyModel from '../models/baby';
import BabyData from '../data/baby';
import SceneBase from './-scene-base';

export default SceneBase.extend({
  opponent: Ember.computed('rank', function () {
    return BabyModel.create(BabyData.generateRankedBabyStats());
  }),
  actions: {
    handle_finish: function (stats) {
      this.set('done', true);
      this.setProperties(stats);
    },
    end: function () {
      this.sendAction('onFinish');
    },
    getReward: function () {
      this.transitionToScene(this.get('scene.reward'));
    }
  }
});
