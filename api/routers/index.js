const express = require('express');
const router = express.Router();

const studentRoute = require('./students.js');
const teacherRoute = require('./teachers.js');
const userRoute = require('./users.js');
const libraryRoute = require('./library.js');
const accountsRoute = require('./accounts.js');

// Routes for User Types
router.use('/students', studentRoute);
router.use('/teachers', teacherRoute);
router.use('/users', userRoute);

// Routes for Libraries
router.use('/library', libraryRoute);

// Routes for Accounts (including expenses)
router.use('/expenses', accountsRoute);

module.exports = router;
