const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, updateUserType, deleteUser } = require('../utilities/userController');

// Add a new teacher
router.post('/teachers', (req, res) => addUser(req, res, "Teacher"));

// Get all teachers
router.get('/teachers', (req, res) => getAllUsers(req, res, "Teacher"));

// Update teacher userType
router.patch('/teachers/:id', updateUserType);

// Remove User 
router.delete('/teachers/:id', deleteUser);

module.exports = router;
