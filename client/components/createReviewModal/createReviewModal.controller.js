import angular from 'angular';

export class CreateReviewController {
  /*@ngInject*/
  constructor($uibModalInstance, Review, Recipe, review, recipe) {
    this.Review = Review;
    this.Recipe = Recipe;
    this.review = review;
    this.recipe = recipe;
    this.$uibModalInstance = $uibModalInstance;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.Review.createReview(this.recipe, this.review)
      .then(result => {
        this.formInfo = 'Review (id=' + result._id + ') successfully created!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err.toString();
      });
  }
}

export default angular.module('comp3705App.createReviewModal', [])
  .controller('createReviewController', CreateReviewController)
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
