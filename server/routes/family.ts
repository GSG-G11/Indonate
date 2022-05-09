import { Router } from 'express';
import { deleteFamilyById } from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const familyRouter = Router();

familyRouter.delete('/admin/family/:id', authUser, authAdmin, deleteFamilyById);

export default familyRouter;
