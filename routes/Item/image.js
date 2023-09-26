const express = require('express');
const router = express.Router();
const imageController = require('../../app/api/controllers/items/Image');
const verifyTioken = require('../../verifyToken');

router.get('/', verifyTioken, imageController.getAll);
router.get('/:id', verifyTioken, imageController.getOne);
router.get('/searchByKeyWord/:keyWord', verifyTioken, imageController.searchByKeyWord);
router.post('/', verifyTioken, imageController.create);
router.post('/upload', verifyTioken, imageController.CreateMany);
router.put('/:id', verifyTioken, imageController.updateById);
router.delete('/:id', verifyTioken, imageController.deleteById);
router.delete('/', verifyTioken, imageController.deleteAll);

module.exports = router;