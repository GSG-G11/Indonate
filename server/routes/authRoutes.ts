import { Router } from 'express';
import {
  signup, login, logout, checkUser,
} from '../controllers';
import { authUser } from '../middlewares';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/checkAuth', authUser, checkUser);
authRouter.post('/signUp', signup);
authRouter.post('/logout', logout);

export default authRouter;
