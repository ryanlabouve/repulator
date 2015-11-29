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

const FoodDayPlan = Ember.Object.extend({
  foodPlan: null,
  mealsPerDay: 5,
  meals: computed('mealsPerDay', 'human.bmr', function() {
    const fp = this.get('foodPlan');
    const a = [];
    let i = 0;
    for(i; i < this.get('mealsPerDay'); i +=1) {
      a.push({
        id: i + 1,
        carbs: (fp.get('carbs')/ this.get('mealsPerDay')),
        fats: quotient(fp.get('fats'), this.get('mealsPerDay')),
        protein: quotient(fp.get('protein'), this.get('mealsPerDay')),

        calories: quotient(fp.get('calories'), this.get('mealsPerDay'))
      });
    }
    return Ember.ArrayProxy.extend({
      content: a
    }).create()
  })
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
    this.set('nonePlan', none);

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

    this.set('foodDayPlan', FoodDayPlan.create({
      foodPlan: none,
      human
    }));
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
  actions: {
    bob() {
      alert('bob');
      debugger;
    }
  }

});
