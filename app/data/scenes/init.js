import initStatStandard from './train-stat-standard';
import initDebug from './debug';
import initRankedTourneys from './tourney-ranked';
import initScience from './science';

export default function () {
  initStatStandard();
  initDebug();
  initRankedTourneys();
  initScience();
}
