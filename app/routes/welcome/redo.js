import Ember from 'ember';
import Data from '../../services/data';
import Baby from '../../models/baby';

export default Ember.Route.extend({
  redirect: function () {
    Data.set('player.baby', Baby.create({}));
    return this.transitionTo('welcome.diet');
  }
});
