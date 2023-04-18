const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller.js');


router.post('/api/user', UserController.createUser);
router.get('/api/user', UserController.getAllUsers);
router.get('/api/user/:id', UserController.getAllUserById);
router.put('/api/user/:id', UserController.updateUser);
router.delete('/api/user/:id', UserController.deleteUser);

module.exports = router;