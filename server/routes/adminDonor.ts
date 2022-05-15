import { Router } from 'express';
import {
  deleteDonorById, updateDonorById, getCampaignsForDonor, getDonors,
} from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const adminDonorRouter = Router();

adminDonorRouter.route('/donor/:id').patch(authUser, authAdmin, updateDonorById).delete(authUser, authAdmin, deleteDonorById);
adminDonorRouter.route('/donor/:id').delete(authUser, authAdmin, deleteDonorById);
adminDonorRouter.get('/donor/:id/campaigns', authUser, authAdmin, getCampaignsForDonor);
adminDonorRouter.get('/donors', authUser, authAdmin, getDonors);

export default adminDonorRouter;
