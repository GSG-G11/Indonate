import { Router } from 'express';
import {
  signUp, login, logout, checkUser,
} from '../controllers';
import { authUser } from '../middlewares';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/checkAuth', authUser, checkUser);
authRouter.post('/signUp', signUp);
authRouter.post('/logout', logout);

export default authRouter;
