import { Router } from 'express';
import { login, checkUser } from '../controllers/index';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/checkAuth', checkUser);

export default authRouter;
