import express, { Request, Response} from 'express';
import { CategoryQueries } from '../../models/category';

const categories = express.Router();

// GET All categories
categories.get('/', async (req: Request, res: Response) => {
    const catQueries = new CategoryQueries();
    const categories = await catQueries.index();
    res.json(categories);
})

// GET Category by ID
categories.get('/:id', async (req: Request, res: Response) => {
    const catQueries = new CategoryQueries();
    const category = await catQueries.show(req.params.id);
    res.json(category);
})

// TODO - POST Create new category
// categories.post('/')

export default categories;