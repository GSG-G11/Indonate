import { Router } from 'express';
import { signUp, login, logout } from '../controllers';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/signUp', signUp);

export default authRouter;
