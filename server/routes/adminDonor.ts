import { Router } from 'express';
import { deleteDonorById } from '../controllers';

const adminDonorRouter = Router();

adminDonorRouter.route('/donor/:id').delete(deleteDonorById);

export default adminDonorRouter;
