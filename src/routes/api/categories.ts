import express from 'express';

const categories = express.Router();

// All categories
categories.get('/', (req, res) => {
    res.send("Categories main route");
})

export default categories;