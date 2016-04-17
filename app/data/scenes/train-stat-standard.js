import SceneModel from '../../models/scene';

function generateStatTrain(stat) {
  var mod = {};
  mod[stat] = 2;

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
  SceneModel.extend(generateStatTrain('str')).create({});
  SceneModel.extend(generateStatTrain('end')).create({});
  SceneModel.extend(generateStatTrain('cha')).create({});
  SceneModel.extend(generateStatTrain('sel')).create({});
  SceneModel.extend(generateStatTrain('mag')).create({});
  SceneModel.extend(generateStatTrain('wis')).create({});
}
