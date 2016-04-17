import Ember from 'ember';
import SceneBase from './-scene-base';

export default SceneBase.extend({
  actions: {
    finish: function () {
      this.sendAction('onFinish');
    }
  }
});
