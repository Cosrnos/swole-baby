import Ember from 'ember';
import SceneBase from './-scene-base';

export default SceneBase.extend({
  actions: {
    onClickNext: function () {
      this.sendAction('onFinish');
    }
  }
});
