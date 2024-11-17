const express = require('express');
const router = express.Router();
const { addUser, getUsers, updateUserType, deleteUser } = require('../utilities/userController');

// Add a new teacher
router.post('/', (req, res) => addUser(req, res, "Teacher"));

// Get all teachers
router.get('/', (req, res) => getUsers(req, res, "Teacher"));

// Update teacher userType
router.patch('/:id', updateUserType);

// Remove User 
router.delete('/:id', deleteUser);

module.exports = router;
