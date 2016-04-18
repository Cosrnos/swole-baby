import SceneModel from '../../models/scene';
import SceneData from '../scene';

export default function () {
  // Generic Stat Training
  SceneModel.create({
    type: SceneData.Types.RANDOM,
    random: true,
    chance: 5,
    rank: SceneData.Rank.E,
    componentName: 'scene-yes-no',
    title: 'Leg day',
    text: `
            <p>It's leg day bro! Right leg or left leg?</p>
            `,
    yesText: 'Left Leg',
    yes: function (player) {
      var baby = player.get('baby').getProperties(['name', 'his_her']);
      player.get('baby').addStats({
        end: 2
      });
      return `<p>${baby.name} spends all day working ${baby.his_her} Left Leg. YEAHHHHH!!!!</p>`
    },
    noText: 'Right Leg',
    no: function (player) {
      var baby = player.get('baby').getProperties(['name', 'his_her']);
      player.get('baby').addStats({
        str: 2
      });
      return `<p>${baby.name} spends all day working ${baby.his_her} Right Leg. YEAHHHHH!!!!</p>`
    }
  });
}
