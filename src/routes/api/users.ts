import express, { Request, Response} from 'express';
import { UserQueries } from '../../models/user';

const users = express.Router();

// All users
users.get('/', async (req: Request, res: Response) => {
    const userQueries = new UserQueries();
    const users = await userQueries.index();
    res.json(users); // TODO FIX SECURITY ISSUE
})

// User by ID
users.get('/:id', async (req: Request, res: Response) => {
    const userQueries = new UserQueries();
    const user = await userQueries.show(req.params.id);
    res.json(user); // TODO FIX SECURITY ISSUE
})

// Create new user GET TEST
users.get('/register', async (req: Request, res: Response) => {
    const userQueries = new UserQueries();
    const newUser = await userQueries.create(req.query.first as string, req.query.last as string, req.query.email as string, req.query.password as string, true);
    // console.log(req.query.first, req.query.last, req.query.email, req.query.password, true)
    res.json(newUser);
})

// Create new user POST
users.post('/register', async (req: Request, res: Response) => {
    console.log('in POST');
    const userQueries = new UserQueries();
    const newUser = await userQueries.create(req.body.first as string, req.body.last as string, req.body.email as string, req.body.password as string, true);
    res.json(newUser);
})

/*
// TODO
// Get current user's open orders
users.get('/:id/orders?status=active', (req, res) => {
    res.send("All active user orders");
})

// Get current user's closed orders
users.get('/:id/orders?status=complete', (req, res) => {
    res.send("All completed user orders");
})

// Create new order for current user POST
users.post('/submit-order', (req, res) => {
    res.send("Create new order");
})
*/

export default users;