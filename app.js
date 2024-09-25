const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Basic REST API!');
});

// Example GET route
app.get('/api/items', (req, res) => {
    const items = [
        { id: 1, name: 'Item One' },
        { id: 2, name: 'Item Two' }
    ];
    res.json(items);
});

// Example POST route
app.post('/api/items', (req, res) => {
    const newItem = req.body;  // Get data from request body
    newItem.id = Date.now();  // Assign a unique ID
    res.status(201).json(newItem);  // Send the new item back in the response
});

// Example PUT route
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    updatedItem.id = id;
    res.json(updatedItem);
});

// Example DELETE route
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Item with ID ${id} deleted` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
