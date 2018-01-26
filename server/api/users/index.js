import express from 'express';
import * as controller from './users.controller';

// create new router
let router = express.Router();

// export the router
export { router };

// register GET routes for /users API
router.get('/', controller.index);
router.get('/:id', controller.show);

// register POST routes for /users API
router.post('/', controller.create);

// register PUT and DELETE routes for /users API
router.put('/:id', controller.upsert);
router.delete('/:id', controller.destroy);