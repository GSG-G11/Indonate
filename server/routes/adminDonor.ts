import { Router } from 'express';
import { deleteDonorById, getDonorCampaigns } from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const adminDonorRouter = Router();

adminDonorRouter.route('/donor/:id').delete(authUser, authAdmin, deleteDonorById);
adminDonorRouter.get('/donor/campagins/:id', authUser, authAdmin, getDonorCampaigns);
export default adminDonorRouter;
