import { Router } from 'express';
import { login, logout } from '../controllers';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/logout', logout);

export default authRouter;
