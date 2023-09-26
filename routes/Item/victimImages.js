const express = require('express');
const router = express.Router();
const victimController = require('../../app/api/controllers/items/VictimImage');
const verifyTioken = require('../../verifyToken');

router.get('/', verifyTioken, victimController.getAll);
router.get('/:id', verifyTioken, victimController.getOne);
router.get('/searchByKeyWord/:keyWord', verifyTioken, victimController.searchByKeyWord);
router.post('/', verifyTioken, victimController.create);
router.post('/upload', verifyTioken, victimController.CreateMany);
router.put('/:id', verifyTioken, victimController.updateById);
router.delete('/:id', verifyTioken, victimController.deleteById);
router.delete('/', verifyTioken, victimController.deleteAll);

module.exports = router;