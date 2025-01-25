const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority`;

let client;

const connectToDatabase = async () => {
    try {
        if (!client) {
            client = new MongoClient(uri);
            await client.connect();
            console.log("Connected to MongoDB successfully!");
        }
        // Optional: Check connection health
        await client.db().admin().ping();
        return client;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error;
    }
};

module.exports = { connectToDatabase };
