const express = require('express');
const router = express.Router();
const kelasController = require('../kelas.controller');
const authMiddleware = require('../middleware/authMiddleware')


router.post('/api/users/:id/kelas', kelasController.addKelas);
router.get('/api/kelas', kelasController.getAllKelas);
router.get('/api/users/:id/kelas', authMiddleware, kelasController.getKelasById);
// router.put('/api/kelas/:id', kelasController.updateKelas);
// router.delete('/api/kelas/:id', kelasController.deleteKelas);

module.exports = router;