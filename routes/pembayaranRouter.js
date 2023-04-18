const express = require('express');
const router = express.Router();
const pembayaranController = require('../controllers/pembayaran. controller');


router.post('/api/pembayaran', pembayaranController.createPembayaran);
router.get('/api/pembayaran', pembayaranController.getAllPembayaran);
router.get('/api/pembayaran/:id', pembayaranController.getAllPembayaranById);
router.put('/api/pembayaran/:id', pembayaranController.updatePembayaran);
router.delete('/api/pembayaran/:id', pembayaranController.deletePembayaran);

module.exports = router;