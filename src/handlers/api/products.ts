import express, { Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { ProductQueries } from '../../models/product';
// import { ProductOrderQueries } from '../../models/productOrder';

const products = express.Router();

const { JWT_SECRET } = process.env;

// GET All products
products.get('/', async (req: Request, res: Response) => {
    const productQueries = new ProductQueries();
    const products = await productQueries.index();
    res.json(products);
})

// GET Product by ID
products.get('/:id', async (req: Request, res: Response) => {
    const productQueries = new ProductQueries();
    const product = await productQueries.show(req.params.id);
    res.json(product);
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
        jwt.verify(req.body.token, JWT_SECRET as string);
    } catch(error) {
        console.log(error);
        throw new Error('There was an issue verifying the token.');
    }
    const productQueries = new ProductQueries();
    await productQueries.create(req.body.name as string, req.body.price as number, req.body.description as string, req.body.categoryId as string);
    res.send('Success');
})

export default products;