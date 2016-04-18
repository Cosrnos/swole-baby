import Ember from 'ember';
import Data from '../services/data';

export default Ember.Component.extend({
  onFinish: null,
  scene: null,
  isDeactivating: false,
  setup: function () {
    this.set('player', Data.get('player'));
    this.get('scene')._activate(this, Data.get('player'));
    this._super();
  }.on('init', 'didUpdateAttrs', 'willRenderElement'),
  teardown: function () {
    this.set('player', null);
    this.get('scene')._deactivate(this, Data.get('player'));
    this._super();
  }.on('willDestroyElement'),
  transitionToScene: function (scene) {
    this.sendAction('onSceneTransition', scene);
  }
});
