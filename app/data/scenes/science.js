import SceneModel from '../../models/scene';
import SceneData from '../scene';

export default function () {
  // Generic Stat Training
  SceneModel.create({
    type: SceneData.Types.RANDOM,
    random: true,
    chance: 10,
    rank: SceneData.Rank.F,
    componentName: 'scene-yes-no',
    title: 'Better Babies through Science',
    text: `
            <p><em>((It seems you've gotten a letter))</em></p>
            <p><em>Dear Mr. or Mrs. Bruh</em></p>
            <p><em>I'm writing on behalf of Senior Babé Technologies. We'd like to perform several tests on your
            baby. If you accept please attach 54 stamps to your baby and we'll get them back to you in one, maybe two, pieces.</em></p>
            <p>IDK Man, science is confusing and makes my head hurt a bit, do you wanna send your baby in?</p>
            `,
    yes: function (player) {
      var stats = ['str', 'end', 'cha', 'sel', 'mag', 'wis'];
      var mod = {};
      stats.forEach((stat)=> {
        var fac = Math.floor(Math.random() * 7) - 3;
        if (fac) {
          mod[stat] = fac;
        }
      });
      player.get('baby').addStats(mod);
      return `<p>You send your baby off in the mail, leaving you with a lot of sitting around time. After a week your baby is (re) delivered.</p>
                <p><em>It seems your baby's stats have changed!</em></p>`
    },
    no: function () {
      return `<p>Stupid science bitches probably couldn't even make baby more smarter</p>`;
    }
  });
}
