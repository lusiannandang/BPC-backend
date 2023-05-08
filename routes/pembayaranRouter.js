const express = require('express');
const router = express.Router();
const pembayaranController = require('../controllers/pembayaran. controller');
const authMiddleware = require('../middleware/authMiddleware')


router.post('/api/users/:id/pembayaran', pembayaranController.createPembayaran);
router.get('/api/pembayaran', pembayaranController.getAllPembayaran);
router.get('/api/users/:id/pembayaran', authMiddleware, pembayaranController.getAllPembayaranById);
router.put('/api/users/:id/pembayaran/:pembayaranId', pembayaranController.updatePembayaran);
router.delete('/api/users/:id/pembayaran', pembayaranController.deletePembayaran);

module.exports = router;