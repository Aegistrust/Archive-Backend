const express = require('express');
const router = express.Router();
const testimonyController = require('../../app/api/controllers/items/testimony');
const verifyTioken = require('../../verifyToken');

router.get('/', verifyTioken, testimonyController.getAll);
router.get('/:id', verifyTioken, testimonyController.getOne);
router.get('/searchByKeyWord/:keyWord', verifyTioken, testimonyController.searchByKeyWord);
router.post('/', verifyTioken, testimonyController.create);
router.post('/upload', verifyTioken, testimonyController.createMany);
router.put('/:id', verifyTioken, testimonyController.updateById);
router.delete('/:id', verifyTioken, testimonyController.deleteById);
router.delete('/', verifyTioken, testimonyController.deleteAll);

module.exports = router;