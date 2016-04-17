import SceneModel from '../../models/scene';

function generateStatTrain(stat) {
  var mod = {};
  mod[stat] = Math.floor(Math.random() * 3) + 1;

  return {
    componentName: 'scene-next',
    title: 'Business As Usual',
    type: 'train',
    stat: stat,
    statMod: mod,
    text: `Your baby worked all week training its ${stat}`,
    start: function () {
      this.set('stat', stat);
    },
    end: function () {
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
