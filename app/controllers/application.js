import Ember from 'ember';
import EmberCPM from 'ember-cpm';
import Human from '../utils/human';
import macros from '../utils/macros';

const { computed } = Ember;
const { Macros: { sum, difference, product, quotient }} = EmberCPM;

const daily = Ember.Object.create({
});



const foodDay = Ember.Object.extend({
  title: null,
  hbeMultiplier: null,
  carbMultiplier: null,
  calories: computed('human.bmr', 'human.weight', function() {
    return Math.ceil(this.get('human.bmr') * this.get('hbeMultiplier'));
  }),
  calories: product('human.bmr', 'hbeMultiplier'),
  protein: computed.alias('human.weight'),
  carbs: product('protein', 'carbMultiplier'),
  caloriesFromProtein: product('protein', 4),
  caloriesFromCarbs: product('carbs', 4),
  caloriesFromFat: difference('calories', sum('caloriesFromProtein', 'caloriesFromCarbs')),
  fats: quotient('caloriesFromFat', 9)
});


export default Ember.Controller.extend({
  macros,

  daily: {},

  init() {
    const human = Human.create({
      weight: 270,
      height: 72,
      age: 25,
      sex: 'male'
    });

    this.set('human', human);

    const none = foodDay.create({
      human,
      title: 'no activity',
      hbeMultiplier: 1.2,
      carbMultiplier: 0.5
    });

    const light = foodDay.create({
      human,
      title: 'light',
      hbeMultiplier: 1.375,
      carbMultiplier: 1
    });

    const moderate = foodDay.create({
      human,
      title: 'moderate',
      hbeMultiplier: 1.55,
      carbMultiplier: 1.5
    });


    const heavy = foodDay.create({
      human,
      title: 'heavy',
      hbeMultiplier: 1.725,
      carbMultiplier: 2
    });

    const ultra = foodDay.create({
      human,
      title: 'ultra',
      hbeMultiplier: 1.9,
      carbMultiplier: 2
    });

    this.set('days', {
      none,
      light,
      moderate,
      heavy,
      ultra
    });

    // Construct daily needs
    // hbes.forEach((key) => {
    //   this.set(`daily.${key}`, {});
    //
    //   this.set(`daily.${key}.protein`, computed('bmr', () => {
    //     return this.get('weight') * 1;
    //   }));
    //
    //   this.set(`daily.${key}.carbs`, computed('bmr', () => {
    //     return 0.5 * this.get(`weight`);
    //   }));
    //
    //   this.set(`daily.${key}.fats`, computed('bmr', () => {
    //     const dailyCaloricIntake = this.get(`hbeConditions.${key}.calories`);
    //     const calsFromProtein = this.get(`daily.${key}.protein`) * 4
    //     const calsFromCarbs = this.get(`daily.${key}.carbs`) * 4;
    //     const calsFromFat = (dailyCaloricIntake - (calsFromProtein + calsFromCarbs)) / 9;
    //
    //     return Math.ceil(calsFromFat);
    //   }));
    //
    // });

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

});
