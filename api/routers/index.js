const express = require('express');
const router = express.Router();

const studentRoute = require('./students');
const teacherRoute = require('./teachers');
const userRoute = require('./users');

// Routes for specific types
router.use('/students', studentRoute);
router.use('/teachers', teacherRoute);
router.use('/users', userRoute);

module.exports = router;
