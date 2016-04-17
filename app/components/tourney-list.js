import Ember from 'ember';
import Schedule from '../services/tourney-schedule';

export default Ember.Component.extend({
  onTourneySelect: null,

  availableTourneys: Ember.computed('', function () {
    return Schedule.get('availableTourneys');
  }),
  nextAvailableTourney: Ember.computed('', function () {
    return Schedule.get('nextAvailableTourney');
  }),

  actions: {
    tourneySelect: function (tourney) {
      this.sendAction('onTourneySelect', tourney);
    }
  }

});
