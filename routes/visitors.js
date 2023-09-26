const express = require('express');
const router = express.Router();
const visitorController = require('../app/api/controllers/visitors');
const verifyTioken = require('../verifyToken');

router.get('/',verifyTioken ,visitorController.getAll);
router.post('/',verifyTioken , visitorController.create);
router.get('/visitor/:visitorId',verifyTioken , visitorController.getById);
router.delete('/visitor/:visitorId',verifyTioken , visitorController.deleteById);
router.put('/updateExit/:updateExit',verifyTioken , visitorController.updateExit);
router.get('/getByCheckIn',verifyTioken ,visitorController.getByCheckIn);
router.get('/searchByPlateAndName/:search',verifyTioken ,visitorController.searchByPlateAndName);
router.get('/searchCheckedInByPlateAndName/:search',verifyTioken ,visitorController.searchCheckedInByPlateAndName);

module.exports = router;