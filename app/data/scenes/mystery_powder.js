import SceneModel from '../../models/scene';
import SceneData from '../scene';

export default function () {
  // Generic Stat Training
  SceneModel.create({
    type: SceneData.Types.RANDOM,
    random: true,
    chance: 15,
    rank: SceneData.Rank.F,
    componentName: 'scene-yes-no',
    title: 'Mysterious Man Powder',
    text: `
            <p><em>
              You and the babe' are chillmaxing at the beach (gettn' gains while deepening that broze, bro.) when a mysterious man approaches.
              He offers you a free sample of some even more mysterious powdered protein in an old Foldgers coffee tin.
            </em></p>


            <p>Can never have too much protein is what everyone always says. But who knows what's in this stuff?</p>
            `,
    yes: function (player) {

      var rand = Math.random();
      var baby = this.get('player.baby');
      var message;

      if(rand <= .1) {

        message = `<p>Shit didn't do shit.</p>`;

      } else if(rand > .1 && rand < .55 ) {
        baby.addStats({
          mag: 2,
          wis: 4,
        });
        message = `<p>I don't know man.  I think it was pixie dust or unicorn dandruff or something. <p>
                   <p><em>No mad gains, but baby it mad wiser now.  WISDOM.</em></p>`;
      } else {
        baby.addStats({
          str: 2,
          end: 4
        });
        message = `<p>Mystery dude deliver hard, Broseidon. <p>
                   <p><em>${baby.name}'s pump has never been more jacked.  Repping like a beast ALL DAY.</em></p>`;
      }

      return message;
    },
    no: function () {
      return `<p>Better not.  Dude wasn't even buff, shit was probably powdered horse teeth.</p>`;
    }
  });
}
