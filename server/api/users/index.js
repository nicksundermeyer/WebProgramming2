import express from 'express';
import * as controller from './users.controller';

let router = express.Router();

// GET methods
// Get can be used with or without an input id. Without returns all users currently in the system, and with an id returns the user with that specific id. Returns 500 error on fail for the basic get. For the get by id, returns 200 OK for success, 404 Not found if id not found, and 400 Bad Request otherwise.
router.get('/', controller.index);
router.get('/:id', controller.show);

// POST method
// Creates a new user, no inputs. Returns 201 Created on success, 400 Bad Request on fail
router.post('/', controller.create);

// PUT method
// Updates a user by input id. Returns 200 OK on update, 404 Not Found if id not found, 400 Bad Request otherwise.
router.put('/:id', controller.update);

// DELETE method
// Deletes a user by input id. Returns 204 No Content on destroy, 404 Not Found if id not found, 400 Bad Request otherwise.
router.delete('/:id', controller.destroy);

export { router };
