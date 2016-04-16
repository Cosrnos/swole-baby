import Ember from 'ember';

export function roundNum(params/*, hash*/) {
  var num = params[0];
  var decimals = params[1] || 2;
  return parseFloat(num, 10).toFixed(decimals);
}

export default Ember.Helper.helper(roundNum);
