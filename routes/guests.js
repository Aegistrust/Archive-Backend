const express = require('express');
const router = express.Router();
const guestController = require('../app/api/controllers/guests');
const verifyTioken = require('../verifyToken');

router.get('/',verifyTioken ,guestController.getAll);
router.post('/', guestController.create);
router.put('/:id',verifyTioken ,guestController.updateById);
router.delete('/:id',verifyTioken ,guestController.deleteById);

module.exports = router;