'use strict';

export function ReviewService($resource) {
  'ngInject';
  var Review = {
    getReviewById(recipeId, reviewId) {
      return $resource('/api/recipes/:recipeId/reviews/:reviewId').$promise;
    },
    updateReview(review) {
      let updateResource = $resource('/api/reviews/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: review._id }, review).$promise;
    },
    createReview(review) {
      let createResource = $resource('/api/reviews/', null,
        {
          create: { method: 'POST' }
        });
      return createResource.create({ id: review._id }, review).$promise;
    },
    deleteReview(review) {
      let deleteResource = $resource('/api/reviews/:id', null,
        {
          delete: { method: 'DELETE' }
        });
      return deleteResource.delete({ id: review._id }, review).$promise;
    }
  }
  return Review;
}