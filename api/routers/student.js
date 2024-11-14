const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, updateUserType, deleteUser } = require('../utilities/userController');

// Add a new student
router.post('/students', (req, res) => addUser(req, res, "Student"));

// Get all students
router.get('/students', (req, res) => getAllUsers(req, res, "Student"));

// Update student userType
router.patch('/students/:id', updateUserType);

// Remove User 
router.delete('/students/:id', deleteUser);

module.exports = router;
