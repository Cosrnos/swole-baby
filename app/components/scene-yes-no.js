import Ember from 'ember';
import SceneBase from './-scene-base';

export default SceneBase.extend({
  text: null,
  isSecondScreen: false,
  init: function () {
    this.set('text', this.get('scene.text'));
    this._super();
  },
  actions: {
    onClickYes: function () {
      var newText = this.get('scene').yes(this.get('player'));
      this.set('text', newText);
      this.set('isSecondScreen', true);
    },
    onClickNo: function () {
      var newText = this.get('scene').no(this.get('player'));
      this.set('text', newText);
      this.set('isSecondScreen', true);
    },
    onClickNext: function () {
      this.sendAction('onFinish');
    }
  }
});
