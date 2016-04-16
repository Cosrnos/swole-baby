import Ember from 'ember';
import Data from '../services/data';

export default Ember.Route.extend({
  model: function () {
    return Data.get('baby')
  },

  redirect: function () {
    return this.transitionTo('welcome.intro');
  }
});
