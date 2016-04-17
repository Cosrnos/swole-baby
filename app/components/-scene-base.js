import Ember from 'ember';
import Data from '../services/data';

export default Ember.Component.extend({
  onFinish: null,
  scene: null,
  isDeactivating: false,
  init: function () {
    this.set('player', Data.get('player'));
    this.get('scene')._activate(this, Data.get('player'));
    this._super();
  },
  destroy: function () {
    this.set('player', null);
    this.get('scene')._deactivate(this, Data.get('player'));
    this._super();
  },
  transitionToScene: function (scene) {
    this.sendAction('onSceneTransition', scene);
  }
});
