const express = require('express');
const { userGetController, userRegistrationController, userLoginController } = require('../controllers/user');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/', authenticate, userGetController);

router.post('/registration', userRegistrationController);

router.post('/login', userLoginController);

module.exports = router;