const express = require("express");
const router = express.Router();
const { 
    addExpense, 
    getExpense, 
    updateFieldInCollection 
} = require('../utilities/accountController.js');

// Add a new expense
router.post('/', addExpense);

// Get all expenses
router.get('/', getExpense);

// Update a specific field in an expense
router.patch('/:id', updateFieldInCollection);

module.exports = router;
