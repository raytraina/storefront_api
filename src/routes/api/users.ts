import express from 'express';

const users = express.Router();

// All users
users.get('/', (req, res) => {
    res.send("Users main route");
})

// User by ID
users.get('/:id', (req, res) => {
    res.send("User route for specific id");
})

// Create new user POST
users.post('/register', (req, res) => {
    res.send("Create new user");
})

// Get current user's open orders
users.get('/:id/orders?status=active', (req, res) => {
    res.send("All active user orders");
})

// Get current user's closed orders
users.get('/:id/orders?status=complete', (req, res) => {
    res.send("All completed user orders");
})

// Create new order for current user POST
users.post('/submit-order', (req, res) => {
    res.send("Create new order");
})

export default users;