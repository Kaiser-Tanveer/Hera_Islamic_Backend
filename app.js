const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db.js');
const errorHandler = require('./middlewares/errorHandler.js');
const apiRouter = require('./routers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
    res.send('Server is running on Vercel 🚀');
});

// 🔥 GLOBAL DB CACHE (KEY FIX)
let clientPromise = connectToDatabase();

// ✅ Inject DB into request
app.use(async (req, res, next) => {
    try {
        const client = await clientPromise;
        req.client = client;
        next();
    } catch (err) {
        next(err);
    }
});

// ✅ API routes
app.use('/api', apiRouter);

// ✅ Error handler
app.use(errorHandler);

// ✅ Local run
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;