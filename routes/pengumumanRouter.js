const express = require('express');
const router = express.Router();
const pengumumanController = require('../controllers/pengumuman.controller');


router.post('/api/pengumuman', pengumumanController.createPengumuman);
router.get('/api/pengumuman', pengumumanController.getAllPengumuman);
router.get('/api/pengumuman/:id', pengumumanController.getAllPengumumanById);
router.put('/api/pengumuman/:id', pengumumanController.updatePengumuman);
router.delete('/api/pengumuman/:id', pengumumanController.deletePengumuman);

module.exports = router;