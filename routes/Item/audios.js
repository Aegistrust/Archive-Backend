const express = require('express');
const router = express.Router();
const audioController = require('../../app/api/controllers/items/Audio');
const verifyTioken = require('../../verifyToken');

router.get('/', verifyTioken, audioController.getAll);
router.get('/:id', verifyTioken, audioController.getOne);
router.get('/searchByKeyWord/:keyWord', verifyTioken, audioController.searchByKeyWord);
router.post('/', verifyTioken, audioController.create);
router.post('/upload', verifyTioken, audioController.createMany);
router.put('/:id', verifyTioken, audioController.updateById);
router.delete('/:id', verifyTioken, audioController.deleteById);
router.delete('/', verifyTioken, audioController.deleteAll);

module.exports = router;