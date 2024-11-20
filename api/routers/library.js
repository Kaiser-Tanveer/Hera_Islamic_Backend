const express = require("express");

const router = express.Router()
const { addBook, getAllBooks } = require('../utilities/libraryController');

router.post('/', (req, res) => addBook(req, res));
router.get('/', (req, res) => getAllBooks(req, res));

module.exports = router;