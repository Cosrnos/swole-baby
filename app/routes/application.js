import Ember from 'ember';
import Data from '../services/data';

export default Ember.Route.extend({
  model: function () {
    return Data.get('player');
  },
  redirect: function () {
    //this.transitionTo('welcome');
  }
});
