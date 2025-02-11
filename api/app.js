// app.js
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db.js');
const errorHandler = require('./middleWares/errorHandler.js');
const apiRouter = require('./routers'); // Import the main router
const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

async function initialize() {
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

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        app.get('/', (req, res) => {
            res.send('My server is running..');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

initialize();

module.exports = app;
