import { Router } from 'express';
import { getAllFamilies } from '../controllers';
import authAdmin from '../middlewares/auth/admin';
import authUser from '../middlewares/auth/user';

const familyRouter = Router();

familyRouter.get('/admin/families', authUser, authAdmin, getAllFamilies);
export default familyRouter;
