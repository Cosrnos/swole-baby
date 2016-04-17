import Model from './model';
import Data from '../services/data';

export default Model.extend({
  modelType: 'player',

  week: 0,

  // Overrides
  init: function () {
    Data.set('player', this);
  },
  destroy: function () {
    Data.set('player', null);
  }
});
