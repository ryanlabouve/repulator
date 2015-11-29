import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  foodPlan: null,
  mealsPerDay: 5,
  tagName: '',
  meals: computed('mealsPerDay', 'foodPlan', 'human.bmr', function() {
    const fp = this.get('foodPlan');
    const a = [];
    let i = 0;
    for(i; i < this.get('mealsPerDay'); i +=1) {
      a.push({
        id: i + 1,
        carbs: (fp.get('carbs')/ this.get('mealsPerDay')),
        fats: (fp.get('fats')/ this.get('mealsPerDay')),
        protein: (fp.get('protein')/ this.get('mealsPerDay')),

        calories: (fp.get('calories')/ this.get('mealsPerDay'))
      });
    }
    return Ember.ArrayProxy.extend({
      content: a
    }).create()
  })
});
