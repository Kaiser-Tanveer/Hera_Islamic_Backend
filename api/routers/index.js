const express = require('express');
const router = express.Router();

const studentRoute = require('./students');
const teacherRoute = require('./teachers');
const userRoute = require('./users');
const libraryRoute = require('./library');
const accountsRoute = require('./accounts');

// Routes for User Types
router.use('/students', studentRoute);
router.use('/teachers', teacherRoute);
router.use('/users', userRoute);

// Routes for Libraries
router.use('/library', libraryRoute);

// Routes for Accounts (including expenses)
router.use('/expenses', accountsRoute);

module.exports = router;
