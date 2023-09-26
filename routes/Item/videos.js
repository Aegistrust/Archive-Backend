const express = require('express');
const router = express.Router();
const videoController = require('../../app/api/controllers/items/Videos');
const verifyTioken = require('../../verifyToken');

router.get('/', verifyTioken, videoController.getAll);
router.get('/:id', verifyTioken, videoController.getOne);
router.get('/searchByKeyWord/:keyWord', verifyTioken, videoController.searchByKeyWord);
router.post('/', verifyTioken, videoController.create);
router.post('/upload', verifyTioken, videoController.CreateMany);
router.put('/:id', verifyTioken, videoController.updateById);
router.delete('/:id', verifyTioken, videoController.deleteById);
router.delete('/', verifyTioken, videoController.deleteAll);

module.exports = router;