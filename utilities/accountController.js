const { ObjectId } = require('mongodb');

// Add User 
const addExpense = async (req, res) => {
    try {
        const expenseData = { ...req.body };
        const accountCollection = req.client.db('Hera_Islamic_DB').collection('accounts');
        const result = await accountCollection.insertOne(expenseData);
        res.status(201).json({ message: `Account added successfully`, data: result });
    } catch (error) {
        console.error(`Error adding Account`, error);
        res.status(500).json({ error: `Failed to add Expense`});
    }
};

// Get All Expense
const getExpense = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const expenseCollection = req.client.db('Hera_Islamic_DB').collection('accounts');
        const expenses = await expenseCollection
            .find({})
            // .skip((page - 1) * limit) // Skip documents
            // .limit(parseInt(limit)) // Limit the number of documents
            .toArray();
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update any field in a dynamic collection
const updateFieldInCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate the ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Connect to the 'expenses' collection
        const collection = req.client.db('Hera_Islamic_DB').collection('accounts');

        // Perform the update
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        // Handle cases where the document isn't found
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.json({ message: 'Expense updated successfully' });
    } catch (error) {
        console.error('Error updating field:', error);
        res.status(500).json({ error: 'Failed to update field' });
    }
};


// Delete User
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const expenseCollection = req.client.db('Hera_Islamic_DB').collection('accounts');
        const result = await expenseCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Data not found" });
        }

        res.json({ message: "Data deleted successfully" });
    } catch (error) {
        console.error('Error deleting Data:', error);
        res.status(500).json({ error: 'Failed to delete Data' });
    }
};

module.exports = { addExpense, getExpense, updateFieldInCollection };
