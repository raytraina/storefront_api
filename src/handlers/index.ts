import express, { Request, Response } from 'express';
import products from './api/products';
import categories from './api/categories';
import users from './api/users';

const routeHandlers = express.Router();

routeHandlers.get('/', (req: Request, res: Response) => {
  res.status(200).send('Try going to a different URL');
});

routeHandlers.use('/products', products);

routeHandlers.use('/categories', categories);

routeHandlers.use('/users', users);

export default routeHandlers;
