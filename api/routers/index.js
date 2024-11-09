const studentRoute = require('./student');
const express = require('express');
const router = express.Router();

router.use('/stu', studentRoute);

module.exports(router);