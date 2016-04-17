import Ember from 'ember';
import Schedule from '../services/tourney-schedule';

export default Ember.Component.extend({
  onTourneySelect: null,

  availableTourneys: Schedule.get('availableTourneys'),
  nextAvailableTourney: Schedule.get('nextAvailableTourney'),

  actions: {
    tourneySelect: function (tourney) {
      this.sendAction('onTourneySelect', tourney);
    }
  }

});
