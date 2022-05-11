import { Router } from 'express';
import { editFamily } from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const adminFamilyRouter = Router();

adminFamilyRouter.patch('/family/:id', authUser, authAdmin, editFamily);

export default adminFamilyRouter;
