import Ember from 'ember';
import Data from '../services/data';
import SceneData from '../data/scene';

export default Ember.Object.extend({
  tourneyPool: null,
  onTourneySelect: null,

  availableTourneys: Ember.computed.filter('tourneyPool', function (tourney) {
    var available = tourney.get('isAvailable');
    var isSameRank = tourney.get('rankName') === this.get('player.baby.rankName');
    var isRankLock = tourney.get('rankLock');

    return (available && ((isRankLock) ? isSameRank : true));
  }).property('player.baby.rankName', 'tourneyPool.@each.{rank,rankLock,isAvailable}'),
  unavailableTourneys: Ember.computed.setDiff('tourneyPool', 'availableTourneys'),
  nextAvailableTourney: Ember.computed('unavailableTourneys.@each.availableIn', function () {
    var tourneys = this.get('unavailableTourneys');
    var tourneysSorted = tourneys.sortBy('availableIn');
    return (tourneysSorted[0] || false);
  }),

  _refresh: function () {
    if (!this.get('player')) {
      this.set('player', Data.get('player'));
    }
    var lookupData = {
      type: SceneData.Types.TOURNEY
    };

    lookupData[this.get('player.baby.minRankName')] = true;

    // Load Tourneys
    this.set('tourneyPool', Data.storeFor('scene').getRandom(lookupData,
      999
    ));

    this._super();
  }.on('init').observes('player.week', 'player.baby.minRankName'),
}).create({});
