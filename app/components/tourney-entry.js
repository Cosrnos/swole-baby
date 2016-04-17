import Ember from 'ember';
import SceneBase from './-scene-base';

export default SceneBase.extend({
  actions: {
    enterBattle: function () {
      this.transitionToScene(this.get('scene.encounter'));
    }
  }
});
