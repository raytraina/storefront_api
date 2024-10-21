import express, { Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { UserQueries } from '../../models/user';
import { OrderQueries } from '../../models/order';

const users = express.Router();

const { JWT_SECRET } = process.env;

// TODO for Admin only
// GET All users
users.get('/', async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers['authorization'] as string;
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET as string);
    } catch(error) {
        console.log(error);
        throw new Error('There was an issue verifying the token.');
    }
    const userQueries = new UserQueries();
    const allUsers = await userQueries.index();
    res.json(allUsers);
})

// TODO for Logged In User only
// GET User by ID
users.get('/:userId', async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers['authorization'] as string;
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET as string);
    } catch(error) {
        console.log(error);
        throw new Error('There was an issue verifying the token.');
    }
    const userQueries = new UserQueries();
    const user = await userQueries.show(req.params.userId);
    res.json(user);
})

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
    const authUser = await userQueries.authenticate(req.body.email as string, req.body.password as string);
    res.json(authUser);
})

// TODO - Once order submission api created, ensure only authorized user's orders are visible
// GET Current user's open/closed orders
users.get('/:userId/orders', async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers['authorization'] as string;
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET as string);
    } catch(error) {
        console.log(error);
        throw new Error('There was an issue verifying the token.');
    }
    const orderQueries = new OrderQueries();
    if (req.query.status === 'active') {
        const openOrders = await orderQueries.showOpenOrdersByUser(req.params.userId as string);
        res.json(openOrders);
    } else if (req.query.status === 'complete') {
        const closedOrders = await orderQueries.showClosedOrdersByUser(req.params.userId as string);
        res.json(closedOrders);
    }
})

/*
// TODO - Next Steps

// POST Create new order for current authorized user
users.post('/submit-order', (req, res) => {
    res.send("Create new order");
})
    
*/

export default users;