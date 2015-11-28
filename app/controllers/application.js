import Ember from 'ember';
const { computed } = Ember;

export default Ember.Controller.extend({
  weight: 270,
  height: 72,
  age: 25,
  sex: 'male',
  macros: [
    {
      name: 'carbohydrate',
      calories: 4
    },
    {
      name: 'protein',
      calories: 4
    },
    {
      name: 'fat',
      calories: 9
    }
  ],

  hbeConditions: [
    {
      title: 'no activity',
      multiplier: 1.2
    },
    {
      title: 'light',
      multiplier: 1.375
    },
    {
      title: 'moderate',
      multiplier: 1.55
    },
    {
      title: 'heavy',
      multiplier: 1.725
    },
    {
      title: 'ultra heavy',
      multiplier: 1.9
    }
  ],

  bmr: computed('weight', 'height', 'sex', function() {
    if(this.get('sex') === 'male') {
      // Men: BMR = 66 + ( 6.23 x weight in pounds ) + ( 12.7 x height in inches ) - ( 6.8 x age in year )
      return 66 + (6.23 * this.get('weight')) + (12.7 * this.get('height')) - (6.8 * this.get('age'));
    } else {
      // Women: BMR = 655 + ( 4.35 x weight in pounds ) + ( 4.7 x height in inches ) - ( 4.7 x age in years )
      return 655 + (4.35 * this.get('weight')) + (4.7 * this.get('height')) - (4.7 * this.get('age'));

    }
  })
});
