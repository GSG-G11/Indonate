import { Router } from 'express';
import {
  signUp, login, logout, checkUser,
} from '../controllers';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/checkAuth', checkUser);
authRouter.post('/signUp', signUp);
authRouter.post('/logout', logout);

export default authRouter;
