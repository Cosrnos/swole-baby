import SceneModel from '../../models/scene';
import SceneData from '../scene';

export default function () {
  // Generic Stat Training
  SceneModel.extend({
    type: SceneData.Types.RANDOM,
    random: true,
    chance: 10,
    rank: SceneData.Rank.D,
    componentName: 'scene-multi',
    title: 'Movie Break',
    text: Ember.computed('player.baby', function () {
      var baby = this.get('player.baby').getProperties(['name', 'his_her']);
      return `<p>${baby.name}'s been working pretty hard so you decide to give ${baby.him_her} a break. What movie do you watch?</p>`;
    }),
    options: Ember.computed('', function () {
      var self = this;

      var baby = this.get('player.baby');

      return [{
        text: 'Lord of the Blings',
        btnColor: 'btn-success',
        callback: function () {
          baby.addStats({
            wis: 2,
            mag: 4
          });
          return `<p>You spend the day watching Bro-do talk about some ring. You weren't really paying attention but ${baby.get('name')} seems to have gotten something out of it</p>`;
        }
      }, {
        text: 'Fight Club',
        btnColor: 'btn-danger',
        callback: function () {
          baby.addStats({
            str: 5,
            end: 2,
            cha: -1 // Because you can't talk about fight club
          });
          return `<p>${baby.get('name')} learned a lot from that movie!</p>`;
        }
      }, {
        text: 'Game of Bro-nes',
        btnColor: 'btn-warning',
        callback: function () {
          baby.addStats({
            cha: 5,
            sel: 2
          });
          return `<p>You are 100% sure this show isn't made for babies, but you feel ${baby.get('name')} knows how to broker a prisoner's release now...</p>`;
        }
      }]
    })
  }).create({});
}
