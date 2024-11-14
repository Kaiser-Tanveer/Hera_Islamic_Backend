const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, updateUserType, deleteUser } = require('../utilities/userController');

// Add a generic user
router.post('/', (req, res) => addUser(req, res));

// Get all users
router.get('/', (req, res) => getAllUsers(req, res));

// Update user type
router.patch('/:id', updateUserType);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;
