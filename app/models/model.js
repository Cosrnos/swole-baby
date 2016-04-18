import Data from '../services/data';
import Ember from 'ember';

export default Ember.Object.extend({
  init: function () {
    Data.register(this.get('modelType'), this);
    this._super();
  },
  destroy: function () {
    Data.unregister(this.get('modelType'), this);
    this._super();
  }
});
