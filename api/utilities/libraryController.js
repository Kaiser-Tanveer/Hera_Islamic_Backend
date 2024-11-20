const { ObjectId } = require('mongodb');

// Add User 
const addBook = async (req, res) => {
    try {
        const bookData = { ...req.body };
        const bookCollection = req.client.db('Hera_Islamic_DB').collection('library');
        const result = await bookCollection.insertOne(bookData);
        res.status(201).json({ message: `Book added successfully`, data: result });
    } catch (error) {
        console.error(`Error adding Book`, error);
        res.status(500).json({ error: `Failed to add Book` });
    }
};

// Get Users by Type
const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default page=1 and limit=10
        const bookCollection = req.client.db('Hera_Islamic_DB').collection('library');
        const books = await bookCollection
            .find({})
            // .skip((page - 1) * limit) // Skip documents
            // .limit(parseInt(limit)) // Limit the number of documents
            .toArray();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update userType 
const updateUserType = async (req, res) => {
    try {
        const { id } = req.params;
        const { userType } = req.body;
        console.log(id);

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const userCollection = req.client.db('Hera_Islamic_DB').collection('users');
        const result = await userCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { userType } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User type updated successfully" });
    } catch (error) {
        console.error('Error updating user type:', error);
        res.status(500).json({ error: 'Failed to update user type' });
    }
};

// Delete User
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const userCollection = req.client.db('Hera_Islamic_DB').collection('users');
        const result = await userCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = { addBook, getAllBooks };
