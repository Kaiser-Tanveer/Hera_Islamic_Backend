const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
const app = express();
const errorHandler = require('./middleWares/errorHandler');
const studentRouter = require('./routers/student');  // Make sure the path is correct
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

async function initialize() {
    try {
        const client = await connectToDatabase();
        app.use((req, res, next) => {
            req.client = client;
            next();
        });

        // Mount the studentRouter at /api
        app.use('/api', studentRouter);
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
