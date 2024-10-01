import express from 'express';

const products = express.Router();

// All products
products.get('/', (req, res) => {
    res.send("Products main route");
})

// Individual product
products.get('/:id', (req, res) => {
    res.send("Products route for specific id");
})

// 5 Top Popular Products
products.get('/popular', (req, res) => {
    res.send("Products route for popular products");
})

// Products by category
products.get('/category/:id', (req, res) => {
    res.send("Products route for specific category");
})

export default products;