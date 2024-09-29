import express from 'express';

const products = express.Router();

products.get('/', (req, res) => {
    res.send("Products route");
})

export default products;