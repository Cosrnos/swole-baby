import Ember from 'ember';
import Data from '../../services/data';

export default Ember.Route.extend({
  model: function () {
    return Data.storeFor('perk').getRandom();
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    controller.set('player', Data.get('player'));
  }
});
