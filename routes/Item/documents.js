const express = require('express');
const router = express.Router();
const documentController = require('../../app/api/controllers/items/Document');
const verifyTioken = require('../../verifyToken');

router.get('/', verifyTioken, documentController.getAll);
router.get('/:id', verifyTioken, documentController.getOne);
router.get('/searchByKeyWord/:keyWord', verifyTioken, documentController.searchByKeyWord);
router.post('/', verifyTioken, documentController.create);
router.post('/upload', verifyTioken, documentController.createMany);
router.put('/:id', verifyTioken, documentController.updateById);
router.delete('/:id', verifyTioken, documentController.deleteById);
router.delete('/', verifyTioken, documentController.deleteAll);

module.exports = router;