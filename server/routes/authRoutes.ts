import { Router } from 'express';
import signUp from '../controllers/index';

const authRouter = Router();

authRouter.post('/signUp', signUp);

export default authRouter;
