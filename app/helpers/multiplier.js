import Ember from 'ember';

export function multiplier(params/*, hash*/) {
  return Math.ceil(params[0] * params[1]);
}

export default Ember.Helper.helper(multiplier);
