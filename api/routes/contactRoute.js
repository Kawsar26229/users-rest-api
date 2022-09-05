const express = require('express');
const { getContactController, postContactController, getSingleContactController, deleteContactController, updatedContactController } = require('../controllers/contact');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/', getContactController);

router.post('/', authenticate, postContactController);

router.get('/:id', getSingleContactController);

router.put('/:id', authenticate, updatedContactController);

router.delete('/:id', authenticate, deleteContactController);

module.exports = router;