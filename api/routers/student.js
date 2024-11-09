const express = require('express');
const router = express.Router();

// Route to add a new student
router.post('/students', async (req, res) => {
    try {
        const studentData = req.body;
        const studentCollection = req.client.db('Hera_Islamic_DB').collection('users');
        const result = await studentCollection.insertOne(studentData);
        res.status(201).json({ message: 'Student added successfully', data: result });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Failed to add student' });
    }
});

// Route to load all students
router.get('/students', async (req, res, next) => {
    try {
        const studentCollection = req.client.db('Hera_Islamic_DB').collection('users');
        const students = await studentCollection.find({}).toArray();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
