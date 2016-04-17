import SceneModel from '../../models/scene';
import SceneData from '../scene';

export default function () {
  // Generic Stat Training
  SceneModel.create({
    type: SceneData.Types.DEBUG,
    random: true,
    chance: 100,
    rank: SceneData.Rank.DEBUG,
    componentName: 'scene-next',
    title: 'DEBUG DEBUG DEBUG',
    text: `stuff is happen`,
    setup: function () {
    },
    teardown: function () {
    }
  });
}
