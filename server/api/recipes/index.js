import express from 'express';
import * as controller from './recipes.controller';

let router = express.Router();

// GET methods
// Basic get route for recipes with no input required. Returns a json object which contains all of the recipes that are currently in the database. If it fails, returns a 500 internal server error, because we know that without arguments it must be a server problem. 
router.get('/', controller.index);

// Basic get route for reviews with no input required. Returns json object containing all reviews currently in the database. If it fails, returns 500 internal server error.
router.get('/reviews', controller.indexReview);

// Get route for specific recipe, with input being the recipe's unique id. Returns json object containing the recipe requested. If it succeeds, returns a 200 OK status message, and if it fails, returns either a 404 not found or 400 bad request depending on the error.
router.get('/:recipeid', controller.show);

// Get route for specific review, with input being the id of the recipe that the review is about, and the id of the review itself. Returns the review object. Success: 200 OK Failure: 404 Not Found or 400 Bad Request.
router.get('/:recipeid/reviews/:reviewid', controller.showReview);

// POST methods
// Basic post route for creating a recipe, needs no inputs. Creates a recipe from the json body. Returns 201 created on success, or 400 bad request on failure.
router.post('/', controller.create);

// Basic post route for creating a review, with input being the recipe that the review is for. Creates a review object and also updates the recipe object's 'reviews' array to point to the new object. Returns 201 created or 400 bad request depending on success.
router.post('/:recipeid', controller.createReview);

// PUT method
// Put route for a recipe, giving the recipe id as input. Updates the recipe to the new input body. Returns 200 OK, 404 Not Found if recipe was not found, or 400 Bad Request for other errors.
router.put('/:recipeid', controller.update);

// Put route for a review, input being the recipe id of the review and the review's id. Updates the recipe, automatically updating date to the current date, but doesn't allow changing the recipe that the review points to. Returns 400 OK, 404 Not Found, or 400 Bad Request depending on same as above.
router.put('/:recipeid/reviews/:reviewid', controller.updateReview);

// DELETE method
// Delete for a specific recipe, id as input. Removes the recipe from the list of recipes, returns 204 No Content on success, 404 Not Found if can't find what to delete, and 400 Bad Request otherwise.
router.delete('/:recipeid', controller.destroy);

// Delete for a review, given recipe id and the id of the review. Removes the review from the review list, and also removes the review from the recipe's list of reviews. Returns 204 No Content, 404 Not Found, or 400 Bad Request as above.
router.delete('/:recipeid/reviews/:reviewid', controller.destroyReview);

export { router };
