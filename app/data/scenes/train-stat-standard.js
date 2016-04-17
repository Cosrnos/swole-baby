import Ember from 'ember';
import SceneData from '../scene';
import SceneModel from '../../models/scene';

function generateStatTrain(stat) {
  return {
    componentName: 'scene-next',
    title: 'Business As Usual',
    type: 'train',
    stat: stat,
    text: `Your baby worked all week training its ${stat}`,
    setup: function (player) {
      this.set('stat', stat);
    },
    teardown: function (player, stat) {
    }
  };
}

export default function () {
  // Generic Stat Training
  SceneModel.create(generateStatTrain('str'));
  SceneModel.create(generateStatTrain('end'));
  SceneModel.create(generateStatTrain('cha'));
  SceneModel.create(generateStatTrain('sel'));
  SceneModel.create(generateStatTrain('mag'));
  SceneModel.create(generateStatTrain('wis'));
}
