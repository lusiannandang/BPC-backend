const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.contoller');
const authMiddleware = require('../middleware/authMiddleware')


router.post('/api/login', AuthController.loginUser);
router.post('/api/register', AuthController.registerUser);
router.get("api/user/:id", authMiddleware, (req, res) => {
    res.json(req.user);
  });

module.exports = router;