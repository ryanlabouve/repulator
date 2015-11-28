import Ember from 'ember';
import EmberCPM from 'ember-cpm';

const { computed } = Ember;
const { Macros: { sum, difference, product }} = EmberCPM;


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

  hbeConditions: {
    none: {
      title: 'no activity',
      multiplier: 1.2,
    },
    light: {
      title: 'light',
      multiplier: 1.375,
    },
    moderate: {
      title: 'moderate',
      multiplier: 1.55
    },
    heavy: {
      title: 'heavy',
      multiplier: 1.725
    },
    ultra: {
      title: 'ultra heavy',
      multiplier: 1.9
    }
  },

  daily: {},


  init() {
    const hbes = Object.keys(this.get('hbeConditions'))
    hbes.forEach((key) => {
      this.set(`hbeConditions.${key}.calories`, computed('bmr', 'weight', () => {
        return Math.ceil(this.get('bmr') * this.get(`hbeConditions.${key}.multiplier`));
      }));
    });

    // Construct daily needs
    hbes.forEach((key) => {
      this.set(`daily.${key}`, {});

      this.set(`daily.${key}.protein`, computed('bmr', () => {
        return this.get('weight') * 1;
      }));

      this.set(`daily.${key}.carbs`, computed('bmr', () => {
        return 0.5 * this.get(`weight`);
      }));

      this.set(`daily.${key}.fats`, computed('bmr', () => {
        const dailyCaloricIntake = this.get(`hbeConditions.${key}.calories`);
        const calsFromProtein = this.get(`daily.${key}.protein`) * 4
        const calsFromCarbs = this.get(`daily.${key}.carbs`) * 4;
        const calsFromFat = (dailyCaloricIntake - (calsFromProtein + calsFromCarbs)) / 9;

        return Math.ceil(calsFromFat);
      }));

    });

  },

  hbeNoneCalories: computed('bmr', function() {
    return this.get('bmr') * this.get('hbeConditions.none.multiplier');
  }),

  noneCalories: product('hbeConditions.none.multiplier', 'bmr'),

  dailyMacros: [
    {
      title: 'off',
      calories: ''
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
