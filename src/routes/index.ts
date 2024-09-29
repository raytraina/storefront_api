import express from 'express';
import products from './api/products';
import categories from './api/categories';
import users from './api/users';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).send('Try going to a different URL');
});

routes.use('/products', products);

routes.use('/categories', categories);

routes.use('/users', users);

export default routes;
