import express, { Request, Response} from 'express';
import { ProductQueries } from '../../models/product';
// Product, 
const products = express.Router();

// All products
products.get('/', async (req: Request, res: Response) => {
    // res.json({'hi':'world'});
    const productQueries = new ProductQueries();
    const products = await productQueries.index();
    // const products = await ProductQueries.index();
    res.json(products);
})

// Product by ID
products.get('/:id', async (req: Request, res: Response) => {
    const productQueries = new ProductQueries();
    const product = await productQueries.show(req.params.id);
    res.json(product);
    // res.send(`Products route for specific id: ${req.params.id}`);
})

// 5 Top Popular Products
products.get('/popular', (req, res) => {
    res.send("Products route for popular products");
})

// Products by category
products.get('/category/:id', (req, res) => {
    res.send("Products route for specific category");
})

// Create new product POST
// products.post('/')

export default products;