import Ember from 'ember';

export function percents(params/*, hash*/) {
  const percents = Math.floor(params[0] * 100);
  return `${percents}%`;
}

export default Ember.Helper.helper(percents);
