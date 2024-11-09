const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

console.log(uri);

let client;

const connectToDatabase = async () => {
    try {
        if (!client || !client.isConnected()) {
            client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        }
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports = { connectToDatabase };