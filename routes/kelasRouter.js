const express = require('express');
const router = express.Router();
const kelasController = require('../controllers/kelas.controller');


router.post('/api/kelas', kelasController.addKelas);
router.get('/api/kelas', kelasController.getAllKelas);
// router.get('/api/kelas/:id', kelasController.getAllKelasById);
// router.put('/api/kelas/:id', kelasController.updateKelas);
// router.delete('/api/kelas/:id', kelasController.deleteKelas);

module.exports = router;