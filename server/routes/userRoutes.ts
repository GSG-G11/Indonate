import { Router } from 'express';
import { reports } from '../controllers';

const userRouter = Router();

userRouter.route('/reports').post(reports);

export default userRouter;
