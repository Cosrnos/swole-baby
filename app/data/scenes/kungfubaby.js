import SceneModel from '../../models/scene';
import SceneData from '../scene';

const sayings = [{
  text: 'Wake up with determination. Go to bed with satisfaction. Cry constantly',
  statMod: {
    end: 3
  }
}, {
  text: `It's not about the destination. It's about the amount of diapers you go through on the journey.`,
  statMod: {
    sel: 2
  }
}, {
  text: `You miss 100% of the shots you don't take. You also miss 100% of the shots you do take because you're a baby.`,
  statMod: {
    str: 4
  }
}, {
  text: 'A smart man knows many things. A wise man knows what he does not know.',
  statMod: {
    wis: 3
  }
}, {
  text: `Those who don't believe in magic never find it`,
  statMod: {
    mag: 4
  }
}];

export default function () {
  // Generic Stat Training
  SceneModel.create({
    type: SceneData.Types.RANDOM,
    random: true,
    chance: 100,
    rank: SceneData.Rank.F,
    componentName: 'scene-next',
    title: 'Kung-fu baby says',
    text: null,
    start: function () {
      var saying = sayings[Math.floor(Math.random() * sayings.length)];
      this.set('text',
        `<div class="text-center"><img src="images/baby.png" style="width: 40%;" /><p><em>"${saying.text}"</em></p><p><em>(your baby seems to have learned from this)</em></p></div>`);
      this.get('player.baby').addStats(saying.statMod);
    },
    end: function () {
    }
  });
}
