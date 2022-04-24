import { Router } from 'express';
import { signUp, login } from '../controllers/index';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/signUp', signUp);

export default authRouter;
