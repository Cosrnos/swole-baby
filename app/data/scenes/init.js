import initStatStandard from './train-stat-standard';
import initDebug from './debug';
import initRankedTourneys from './tourney-ranked';

export default function () {
  initStatStandard();
  initDebug();
  initRankedTourneys();
}
