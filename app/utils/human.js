import Ember from 'ember';
const { computed } = Ember;

const Human = Ember.Object.extend({
  weight: null,
  height: null,
  sex: null,
  age: null,
  bmr: computed('weight', 'height', 'sex', 'age', function() {
    if(this.get('sex') === 'male') {
      // Men: BMR = 66 + ( 6.23 x weight in pounds ) + ( 12.7 x height in inches ) - ( 6.8 x age in year )
      return 66 + (6.23 * this.get('weight')) + (12.7 * this.get('height')) - (6.8 * this.get('age'));
    } else {
      // Women: BMR = 655 + ( 4.35 x weight in pounds ) + ( 4.7 x height in inches ) - ( 4.7 x age in years )
      return 655 + (4.35 * this.get('weight')) + (4.7 * this.get('height')) - (4.7 * this.get('age'));
    }
  }),
  heightInFt: computed('height', function() {
    const height = this.get('height');
    const ft = Math.floor(height / 12);
    const inches = height - ft * 12;
    return `${ft} feet, ${inches} inches`;
  })
});

export default Human;
