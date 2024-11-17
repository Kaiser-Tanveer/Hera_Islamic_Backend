const express = require('express');
const router = express.Router();
const { addUser, getUsers, updateUserType, deleteUser } = require('../utilities/userController');

// Add a new student
router.post('/', (req, res) => addUser(req, res, "Student"));

// Get all students
router.get('/', (req, res) => getUsers(req, res, "Student"));

// Update student userType
router.patch('/:id', updateUserType);

// Remove User 
router.delete('/:id', deleteUser);

module.exports = router;
