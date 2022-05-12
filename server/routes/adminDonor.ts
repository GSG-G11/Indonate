import { Router } from 'express';
import { deleteDonorById } from '../controllers';
import { updateDonorById } from '../controllers/admin';
import { authUser, authAdmin } from '../middlewares';

const adminDonorRouter = Router();

adminDonorRouter.route('/donor/:id').delete(authUser, authAdmin, deleteDonorById);
adminDonorRouter.route('/donors/:id').patch(authUser, authAdmin, updateDonorById);

export default adminDonorRouter;
