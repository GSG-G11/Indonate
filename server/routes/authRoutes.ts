import { Router } from 'express';
import signUp from '../controllers';

const authRouter = Router();

authRouter.post('/signUp', signUp);

export default authRouter;
