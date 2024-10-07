import express, { Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { ProductQueries } from '../../models/product';
// import { ProductOrderQueries } from '../../models/productOrder';

const products = express.Router();

// GET All products
products.get('/', async (req: Request, res: Response) => {
    // res.json({'hi':'world'});
    const productQueries = new ProductQueries();
    const products = await productQueries.index();
    // const products = await ProductQueries.index();
    res.json(products);
})

// GET Product by ID
products.get('/:id', async (req: Request, res: Response) => {
    const productQueries = new ProductQueries();
    const product = await productQueries.show(req.params.id);
    res.json(product);
    // res.send(`Products route for specific id: ${req.params.id}`);
})

// TODO - GET 5 Top Popular Products
// products.get('/popular', async (req: Request, res: Response) => {
//     const productOrderQueries = new ProductOrderQueries();
//     const product = await productOrderQueries.showPopularProducts();
//     res.json(product);
// })

// GET Products by category
products.get('/category/:categoryId', async (req: Request, res: Response) => {
    const productQueries = new ProductQueries();
    const products = await productQueries.showByCategory(req.params.categoryId);
    res.json(products);
})

// POST Create new product
products.post('/new', async (req: Request, res: Response) => {
    try {
        // TODO FIX
        const token = jwt.verify(req.body.token, 'my_temp_token_secret');
        res.json(token);
    } catch(error) {
        console.log(error);
        throw new Error('There was an issue verifying the token.');
    }
    const productQueries = new ProductQueries();
    const newProduct = await productQueries.create(req.body.name as string, req.body.price as number, req.body.description as string, req.body.categoryId as string);
    res.json(newProduct);
})

export default products;