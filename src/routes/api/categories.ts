import express from 'express';

const categories = express.Router();

categories.get('/', (req, res) => {
    res.send("Categories route");
})

export default categories;