const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.contoller');
const authMiddleware = require('../middleware/authMiddleware')


router.post('/api/login', AuthController.loginUser);
router.post('/api/register', AuthController.registerUser);
router.get("api/user/:id", authMiddleware, (req, res) => {
    res.json(req.user);
  });
// router.get('/api/kelas', AuthController.getAllKelas);
// router.get('/api/kelas/:id', AuthController.getAllKelasById);
// router.put('/api/kelas/:id', AuthController.updateKelas);
// router.delete('/api/kelas/:id', AuthController.deleteKelas);

module.exports = router;