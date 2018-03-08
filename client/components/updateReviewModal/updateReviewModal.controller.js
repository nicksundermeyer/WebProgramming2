import angular from 'angular';

export class UpdateReviewController {
  /*@ngInject*/
  constructor($uibModalInstance, Review, Recipe, review, recipe) {
    this.Review = Review;
    this.Recipe = Recipe;
    this.$uibModalInstance = $uibModalInstance;
    this.review = review;
    this.recipe = recipe;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  updateReview() {
    this.Review.updateReview(this.recipe, this.review)
      .then(result => {
        this.formInfo = 'Review successfully updated!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err.toString();
      });
  }

  deleteReview() {
    this.Review.deleteReview(this.review)
      .then(result => {
        this.formInfo = 'Review successfully deleted!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err.toString();
      });
  }
}

export default angular.module('comp3705App.updateReviewModal', [])
  .controller('updateReviewController', UpdateReviewController)
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
