import { Router } from 'express';
import { editFamily } from '../controllers';

const adminFamilyRouter = Router();

adminFamilyRouter.patch('/family/:id', editFamily);

export default adminFamilyRouter;
