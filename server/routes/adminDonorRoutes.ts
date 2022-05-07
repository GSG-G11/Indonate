import { Router } from 'express';
import { deleteDonorById } from '../controllers';
import { authAdmin } from '../middlewares';

const adminDonorRouter = Router();

adminDonorRouter.route('/donor/:id').delete(authAdmin, deleteDonorById);

export default adminDonorRouter;
