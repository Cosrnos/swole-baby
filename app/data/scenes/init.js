import initStatStandard from './train-stat-standard';
import initDebug from './debug';
import initRankedTourneys from './tourney-ranked';
import initScience from './science';
import initLegDay from './leg_day';
import initMovie from './movie';

export default function () {
  initStatStandard();
  initDebug();
  initRankedTourneys();
  initScience();
  initLegDay();
  initMovie();
}
