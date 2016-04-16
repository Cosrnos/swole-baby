import Ember from 'ember';
import Baby from '../models/baby';

export default Ember.Route.extend({
  model: function () {
    return Baby.create({
      name: `yo' baby`
    });
  }
});
