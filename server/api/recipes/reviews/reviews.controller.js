'use strict';

import { Review } from './reviews.model';

// Find all Reviews
export function index(req, res) {
  Review.find()
    .exec()
    // This then method will only be called if the query was successful, so no need to error check!
    .then(function (reviews) {
      res.json(reviews);
    })
    .catch(function (err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one review
export function show(req, res) {
  Review.findById(req.params.id)
    .exec()
    .then(function (existingReview) {
      if (existingReview) {
        // Review was found by Id
        res.status(200);
        res.json(existingReview);
      } else {
        // Review was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new review
export function create(req, res) {
  let review = req.body;

  Review.create(review)
    .then(function (createdReview) {
      res.status(201);
      res.json(createdReview);
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Update a review
export function update(req, res) {
  var updatedReview;
  // Start by trying to find the review by its id
  Review.findById(req.params.id)
    .exec()
    // Update review and address
    .then(function (existingReview) {
      // If review exists, update all fields of the object
      if (existingReview) {
        existingReview.description = req.body.description;
        existingReview.rating = req.body.rating;
        existingReview.date = req.body.date;
        existingReview.user = req.body.user;

        // Set externally declared updatedReview so that later promise can return it
        updatedReview = existingReview;
        return Promise.all([
          existingReview.increment().save()
        ]);
      } else {
        // Review was not found
        return null;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the review was not found
    .then(function (savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (review was found)
      if (savedObjects) {
        res.status(200);
        res.json(updatedReview);
      } else {
        // Review was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    // Error encountered during the save of the review or address
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a review
export function destroy(req, res) {
  console.log("destroying");
  Review.findById(req.params.id)
    .exec()
    .then(function (existingReview) {
      if (existingReview) {
        return Promise.all([
          existingReview.remove()
        ]);
      } else {
        return null;
      }
    })
    // Delete was successful
    .then(function (deletedReview) {
      if (deletedReview) {
        res.status(204).send();
      } else {
        // Review was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    // Address or review delete failed
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

