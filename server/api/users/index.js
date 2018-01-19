import express from 'express';
import * as users from './users';

// create new router
let router = express.Router();

// export the router
export { router };

// register GET routes for /users API
router.get('/', users.listContents);
router.get('/:id', users.findOne);

// register POST routes for /users API
router.post('/', users.createUser);