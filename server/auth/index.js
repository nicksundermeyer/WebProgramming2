'use strict';
import express from 'express';
import config from '../config/environment';
import User from '../api/users/users.model';

// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./twitter/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local/index').default);
router.use('/facebook', require('./facebook/index').default);
router.use('/twitter', require('./twitter/index').default);
router.use('/google', require('./google/index').default);

export default router;
