import SceneModel from '../../models/scene';
import SceneData from '../scene';

const TOURNEY_INTERVAL = 6;

function generateTourney(rankName) {
  var rank = SceneData.Rank[rankName];
  var finishScreen = SceneModel.extend({
    text: Ember.computed('player.baby', function () {
      var baby = this.get('player.baby').getProperties('name', 's_he');
      return `It looks like ${baby.name} is the winner! ${baby.s_he} moves up a rank and is one step closer to being THE SWOLEST`;
    }),
    start: function (SM, player) {
      player.set('baby.rank', rank + 10);
    }
  }).create({
    type: SceneData.Types.REWARD,
    rank: rank,
    componentName: 'tourney-reward',
    statMod: {
      str: 1,
      end: 1,
      cha: 1,
      sel: 1,
      mag: 1,
      wis: 1
    }
  });
  var battleScreen = SceneModel.create({
    type: SceneData.Types.ENCOUNTER,
    rank: rank,
    componentName: 'tourney-battle',
    reward: finishScreen
  });
  var enterScreen = SceneModel.extend({
    isAvailable: Ember.computed('player.week', function () {
      return this.get('player.week') % TOURNEY_INTERVAL === 0;
    }),
    availableIn: Ember.computed('player.week', function () {
      return TOURNEY_INTERVAL - (this.get('player.week') % TOURNEY_INTERVAL);
    }),
  }).create({
    type: SceneData.Types.TOURNEY,
    rank: rank,
    rankLock: true,
    componentName: 'tourney-entry',
    name: `Rank ${rankName} Invitational`,
    text: `WELL MY DUDEBRO'S IT'S THAT TIME OF YEAR AGAIN. Time for the Ranked Invitationals of the <strong>International Federation of Swole Babies</strong>. We're here at the Rank ${rankName} Tourney ready to see some babies P.O.S.E.`,
    rankName: rankName,
    prize: 'Rank Up',
    encounter: battleScreen,
  });
};
export default function () {
  Object.keys(SceneData.Rank).forEach((key)=> {
    generateTourney(key);
  });
}
