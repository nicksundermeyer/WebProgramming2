'use strict';

export function ReviewService($resource) {
  'ngInject';
  var Review = {
    getReviewById(recipeId, reviewId) {
      return $resource('/api/recipes/:recipeId/reviews/:reviewId').$promise;
    },
    updateReview(recipe, review) {
      let updateResource = $resource('/api/recipes/:recipeid/reviews/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: review._id, recipeid: recipe._id }, review).$promise;
    },
    createReview(recipe, review) {
      let createResource = $resource('/api/recipes/:id/reviews/', null,
        {
          create: { method: 'POST' }
        });
      return createResource.create({ id: recipe._id }, review).$promise;
    },
    deleteReview(recipe, review) {
      let deleteResource = $resource('/api/recipes/:recipeid/reviews/:id', null,
        {
          delete: { method: 'DELETE' }
        });
      return deleteResource.delete({ id: review._id, recipeid: recipe._id }, review).$promise;
    }
  }
  return Review;
}