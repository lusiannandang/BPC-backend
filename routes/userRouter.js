const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller.js');
const authMiddleware = require('../middleware/authMiddleware')


router.post('/api/user', UserController.createUser);
router.get('/api/user', UserController.getAllUsers);
router.get('/api/user/:id', authMiddleware, UserController.getAllUserById);
router.get('/api/users/:id', UserController.getAllUserById);
router.put('/api/user/:id', UserController.updateUser);
router.delete('/api/user/:id', UserController.deleteUser);

module.exports = router;