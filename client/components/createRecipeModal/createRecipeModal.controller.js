import angular from 'angular';

export class CreateRecipeController {
  /*@ngInject*/
  constructor($uibModalInstance, Recipe, recipe) {
    this.Recipe = Recipe;
    this.recipe = recipe;
    this.$uibModalInstance = $uibModalInstance;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.Recipe.createRecipe(this.recipe)
      .then(result => {
        this.formInfo = 'Recipe (id=' + result._id + ') successfully created!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err.toString();
      });
  }
}

export default angular.module('comp3705App.createRecipeModal', [])
  .controller('createRecipeController', CreateRecipeController)
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
