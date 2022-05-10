import { Router } from 'express';
import { deleteDonorById } from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const adminDonorRouter = Router();

adminDonorRouter.route('/donor/:id').delete(authUser, authAdmin, deleteDonorById);

export default adminDonorRouter;
