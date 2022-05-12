import { Router } from 'express';
import { deleteDonorById } from '../controllers';
import { updateDonorById } from '../controllers/admin';
import { authUser, authAdmin } from '../middlewares';

const adminDonorRouter = Router();

adminDonorRouter.route('/donor/:id').patch(authUser, authAdmin, updateDonorById).delete(authUser, authAdmin, deleteDonorById);

export default adminDonorRouter;
