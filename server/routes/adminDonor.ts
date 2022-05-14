import { Router } from 'express';
import { deleteDonorById, getCampaignsForDonor } from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const adminDonorRouter = Router();

adminDonorRouter.route('/donor/:id').delete(authUser, authAdmin, deleteDonorById);
adminDonorRouter.get('/donor/:id/campaigns', authUser, authAdmin, getCampaignsForDonor);
export default adminDonorRouter;
