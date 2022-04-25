import { Router } from 'express';

import { statistics } from '../controllers';

const userRouter = Router();

userRouter.post('/api/statistics', statistics);

export default userRouter;
