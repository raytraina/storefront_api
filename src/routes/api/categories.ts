import express, { Request, Response} from 'express';
import { CategoryQueries } from '../../models/category';
// Category, 
const categories = express.Router();

// All categories
categories.get('/', async (req: Request, res: Response) => {
    const catQueries = new CategoryQueries();
    const categories = await catQueries.index();
    res.json(categories);
})

// Category by ID
categories.get('/:id', async (req: Request, res: Response) => {
    const catQueries = new CategoryQueries();
    const category = await catQueries.show(req.params.id);
    res.json(category);
})

export default categories;