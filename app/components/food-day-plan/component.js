import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  foodPlan: null,
  mealsPerDay: 5,
  tagName: '',
  workoutFlag: false,

  _sumArray(arr) {
    if(!arr.length) { return 0; }
    const sum = arr.reduce((a,b) =>  a + b);
    console.log(sum);
    return sum;
  },

  _distributeRemainingPercents(arr, mealsPerDay) {
    const daysRemaining = mealsPerDay - arr.length;
    const percentsRemaining = 1 - this._sumArray(arr);
    console.log(percentsRemaining, daysRemaining, percentsRemaining/daysRemaining);
    return percentsRemaining / daysRemaining;
  },

  meals: computed('mealsPerDay', 'foodPlan', 'human.bmr', function() {
    const fp = this.get('foodPlan');
    const a = [];
    let distribution = [];

    // pre workout, during, and post
    // if no w/oflag, empty array
    let revCarbDistribution = this.get('workoutFlag') ? [.35, .4, .15] : [];

    // pre workout, during, and post
    let revFatDistribution = this.get('workoutFlag') ? [.1, .0, .1] : [];

    let remainingCarbs = 1;
    let remainingFats = 1;
    let remainingProteins = 1;

    let i = 0;

    let evenCarbDist = this._distributeRemainingPercents(revCarbDistribution, this.get('mealsPerDay'));
    let evenFatDist = this._distributeRemainingPercents(revFatDistribution, this.get('mealsPerDay'));
    let evenProteinDist = this._distributeRemainingPercents([], this.get('mealsPerDay'));

    for(i; i < this.get('mealsPerDay'); i += 1) {
      let carbDist = 0;
      let fatDist = 0;
      let proteinDist = 0;

      proteinDist = evenProteinDist;

      let carbPop = revCarbDistribution.pop()
      if(carbPop) {
        carbDist = carbPop;
      } else {
        carbDist = evenCarbDist;
      }

      let fatPop = revFatDistribution.pop()
      if(fatPop) {
        fatDist = fatPop;
      } else {
        fatDist = evenFatDist;
      }

      if(i+1 == this.get('mealsPerDay')) {
        carbDist = remainingCarbs;
        fatDist = remainingFats;
        proteinDist = remainingProteins;
      }

      distribution.push({
        carbs: carbDist,
        proteins: proteinDist,
        fats: fatDist
      });

      console.log(distribution);

      remainingCarbs -= carbDist;
      remainingFats -= fatDist;
      remainingProteins -= proteinDist;
    }

    distribution.reverse();

    i = 0;
    for(i; i < this.get('mealsPerDay'); i +=1) {
      a.push({
        id: i + 1,
        carbs: fp.get('carbs') * distribution[i].carbs,
        fats: fp.get('fats') * distribution[i].fats,
        protein: fp.get('protein') * distribution[i].proteins,

        calories: computed('', function() {
          return (this.carbs * 4) + (this.protein*4) + (this.fats*9);
        })
      });
    }
    return Ember.ArrayProxy.extend({
      content: a.reverse()
    }).create()
  })
});
