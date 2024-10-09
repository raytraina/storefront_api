import express, { Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { UserQueries } from '../../models/user';
import { OrderQueries } from '../../models/order';

const users = express.Router();

const { JWT_SECRET } = process.env;

// TODO for Admin - GET All users
// users.get('/', async (req: Request, res: Response) => {
//     const userQueries = new UserQueries();
//     const users = await userQueries.index();
//     res.json(users);
// })

// TODO for Logged In User - GET User by ID
// users.get('/:id', async (req: Request, res: Response) => {
//     const userQueries = new UserQueries();
//     const user = await userQueries.show(req.params.id);
//     res.json(user);
// })

// POST Create new user
users.post('/new', async (req: Request, res: Response) => {
    const userQueries = new UserQueries();
    const newUser = await userQueries.create(req.body.first as string, req.body.last as string, req.body.email as string, req.body.password as string, true);
    try {
        const token = jwt.sign({ user: newUser }, JWT_SECRET as string);
        res.json(token);
    } catch(error) {
        console.log(error);
        throw new Error('There was an issue creating the token.');
    }
})

// POST Auth existing user
users.post('/auth', async (req: Request, res: Response) => {
    try {
        const token = jwt.verify(req.body.token, JWT_SECRET as string);
        res.json(token);
    } catch(error) {
        console.log(error);
        throw new Error('There was an issue verifying the token.');
    }
    const userQueries = new UserQueries();
    const newUser = await userQueries.authenticate(req.body.email as string, req.body.password as string);
    res.json(newUser);
})

// GET Current user's open orders
users.get('/:userId/orders?status=active', async (req: Request, res: Response) => {
    try {
        const token = jwt.verify(req.body.token, JWT_SECRET as string);
        res.json(token);
    } catch(error) {
        console.log(error);
        throw new Error('There was an issue verifying the token.');
    }
    const orderQueries = new OrderQueries();
    const openOrders = await orderQueries.showOpenOrdersByUser(req.params.userId as string);
    res.json(openOrders);
})

// GET Current user's closed orders
users.get('/:userId/orders?status=complete', async (req: Request, res: Response) => {
    try {
        const token = jwt.verify(req.body.token, JWT_SECRET as string);
        res.json(token);
    } catch(error) {
        console.log(error);
        throw new Error('There was an issue verifying the token.');
    }
    const orderQueries = new OrderQueries();
    const closedOrders = await orderQueries.showClosedOrdersByUser(req.params.userId as string);
    res.json(closedOrders);
})

/*
// TODO - Next Steps

// Create new order for current user POST
users.post('/submit-order', (req, res) => {
    res.send("Create new order");
})
    
*/

export default users;