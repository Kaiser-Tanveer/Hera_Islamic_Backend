// userController.js
const { ObjectId } = require('mongodb');

// Add User 
const addUser = async (req, res, userType) => {
    try {
        const userData = { ...req.body, userType };
        const userCollection = req.client.db('Hera_Islamic_DB').collection('users');
        const result = await userCollection.insertOne(userData);
        res.status(201).json({ message: `${userType} added successfully`, data: result });
    } catch (error) {
        console.error(`Error adding ${userType}:`, error);
        res.status(500).json({ error: `Failed to add ${userType}` });
    }
};

// Get User 
const getAllUsers = async (req, res, userType) => {
    try {
        const userCollection = req.client.db('Hera_Islamic_DB').collection('users');
        const users = await userCollection.find({ userType }).toArray();
        res.json(users);
    } catch (error) {
        console.error(`Error fetching ${userType}s:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update userType 
const updateUserType = async (req, res) => {
    try {
        const { id } = req.params;
        const { userType } = req.body;

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
const deleteUser = async (req, res) => {
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

module.exports = { addUser, getAllUsers, updateUserType, deleteUser};
