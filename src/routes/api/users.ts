import express from 'express';

const users = express.Router();

// All users
users.get('/', (req, res) => {
    res.send("Users main route");
})

// Individual User
users.get('/:id', (req, res) => {
    res.send("User route for specific id");
})

// Create new user
users.get('/new', (req, res) => {
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

export default users;