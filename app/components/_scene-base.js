import Ember from 'ember';
import Data from '../services/data';

export default Ember.Component.extend({
  onFinish: null,
  scene: null,
  init: function () {
    this.get('scene')._activate(Data.get('player'));
    this._super();
  },
  destroy: function () {
    this.get('scene')._deactivate(Data.get('player'));
    this._super();
  }
});
