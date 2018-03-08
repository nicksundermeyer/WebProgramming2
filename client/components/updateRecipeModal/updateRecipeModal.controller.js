import angular from 'angular';

export class UpdateRecipeController {
  /*@ngInject*/
  constructor($uibModalInstance, Recipe, recipe) {
    this.Recipe = Recipe;
    this.$uibModalInstance = $uibModalInstance;
    this.recipe = recipe;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  updateRecipe() {
    this.Recipe.updateRecipe(this.recipe)
      .then(result => {
        this.formInfo = 'Recipe successfully updated!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err.toString();
      });
  }

  deleteRecipe() {
    this.Recipe.deleteRecipe(this.recipe)
      .then(result => {
        this.formInfo = 'Recipe successfully deleted!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err.toString();
      });
  }
}

export default angular.module('comp3705App.updateRecipeModal', [])
  .controller('updateRecipeController', UpdateRecipeController)
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
