import Ember from 'ember';
import Baby from '../models/baby';

export default Ember.Route.extend({
  setupController: function (controller, model) {

    //create opponent
    var opponent = Baby.create({
      name: `Evil Baby`,
      isEnemy: true,
      str: 10
    });

    var baby = Baby.create({
      name: `Good Baby`,
      isEnemy: false,
      str: 10,
      end: 5,
    });

    controller.set('opponent', opponent);
    controller.set('baby', baby);
  }
});
