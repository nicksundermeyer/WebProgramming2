'use strict';

import { Recipe, Review } from './recipes.model';

// Find all Recipes
export function index(req, res) {
  Recipe.find()
    .exec()
    // This then method will only be called if the query was successful, so no need to error check!
    .then(function (recipes) {
      res.json(recipes);
    })
    .catch(function (err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one recipe
export function show(req, res) {
  Recipe.findById(req.params.recipeid)
    .exec()
    .then(function (existingRecipe) {
      if (existingRecipe) {
        // Recipe was found by Id
        res.status(200);
        res.json(existingRecipe);
      } else {
        // Recipe was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new recipe
export function create(req, res) {
  let recipe = req.body;

  Recipe.create(recipe)
    .then(function (createdRecipe) {
      res.status(201);
      res.json(createdRecipe);
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Update a recipe
export function update(req, res) {
  var updatedRecipe;
  // Start by trying to find the recipe by its id
  Recipe.findById(req.params.recipeid)
    .exec()
    // Update recipe and address
    .then(function (existingRecipe) {
      // If recipe exists, update all fields of the object
      if (existingRecipe) {
        existingRecipe.name = req.body.name;
        existingRecipe.description = req.body.description;
        existingRecipe.picture = req.body.picture;
        existingRecipe.preptime = req.body.preptime;
        existingRecipe.cooktime = req.body.cooktime;
        existingRecipe.directions = req.body.directions;
        existingRecipe.ingredients = req.body.ingredients;
        existingRecipe.reviews = req.body.reviews;
        // Set externally declared updatedRecipe so that later promise can return it
        updatedRecipe = existingRecipe;
        return Promise.all([
          existingRecipe.increment().save()
        ]);
      } else {
        // Recipe was not found
        return null;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the recipe was not found
    .then(function (savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (recipe was found)
      if (savedObjects) {
        res.status(200);
        res.json(updatedRecipe);
      } else {
        // Recipe was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    // Error encountered during the save of the recipe or address
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a recipe
export function destroy(req, res) {
  Recipe.findById(req.params.recipeid)
    .exec()
    .then(function (existingRecipe) {
      if (existingRecipe) {
        return Promise.all([
          existingRecipe.remove()
        ]);
      } else {
        return null;
      }
    })
    // Delete was successful
    .then(function (deletedRecipe) {
      if (deletedRecipe) {
        res.status(204).send();
      } else {
        // Recipe was not found
        res.status(404);
        res.json({ message: 'Not Found' });
      }
    })
    // Address or recipe delete failed
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Find all Reviews
export function indexReview(req, res) {
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
export function showReview(req, res) {
  Review.findById(req.params.reviewid)
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
export function createReview(req, res) {
  let review = req.body;
  review.date = new Date();
  var updatedRecipe;

  // create review
  Review.create(review)
    .then(function (createdReview) {
      review = createdReview;
      return Recipe.findById(req.params.recipeid);
    })
    .then(function (existingRecipe) {
      if (existingRecipe) {
        existingRecipe.reviews += review._id;
        updatedRecipe = existingRecipe;
        return Promise.all([
          existingRecipe.increment().save()
        ]);
      }
      else {
        return null;
      }
    })
    .then(function (savedObjects) {
      res.status(201);
      res.json(review);
    })
    .catch(function (err) {
      res.status(400);
      res.send(err);
    });
}

// Update a review
export function updateReview(req, res) {
  var updatedReview;
  // Start by trying to find the review by its id
  Review.findById(req.params.reviewid)
    .exec()
    // Update review and address
    .then(function (existingReview) {
      // If review exists, update all fields of the object
      if (existingReview) {
        existingReview.description = req.body.description;
        existingReview.rating = req.body.rating;
        existingReview.date = new Date();

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
export function destroyReview(req, res) {
  Review.findById(req.params.reviewid)
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
    .then(function (deletedRecipe) {
      return Recipe.findById(req.params.recipeid);
    })
    .then(function (existingRecipe) {
      //update recipe to remove review
      if (existingRecipe) {
        var array = existingRecipe.reviews;
        array.splice(array.indexOf(req.params.reviewid), 1);
        existingRecipe.reviews = array;
        updatedRecipe = existingRecipe;
        return Promise.all([
          existingRecipe.increment().save()
        ]);
      }
      else {
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
