// app.js
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
const errorHandler = require('./middleWares/errorHandler');

const apiRouter = require('./routers');
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Database and Routes Initialization
(async () => {
    try {
        const client = await connectToDatabase();
        app.use((req, res, next) => {
            req.client = client;
            next();
        });

        // Mount the main API router at /api
        app.use('/api', apiRouter);

        // Error handling middleware
        app.use(errorHandler);

        // Root route for health check
        app.get('/', (req, res) => {
            res.send('My server is running..');
        });
    } catch (error) {
        console.error('Failed to initialize server:', error);
    }
})();

module.exports = app;
