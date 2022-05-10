import { Router } from 'express';
import { addFamily } from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const familyRouter = Router();

familyRouter.post('/family', authUser, authAdmin, addFamily);

export default familyRouter;
