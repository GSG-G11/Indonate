import { Router } from 'express';
import {
  deleteDonor,
  getAllDonors,
  getCampaignsForDonor,
  updateDonor,
} from '../../controllers';

const donorRouter = Router();

donorRouter.get('/donors', getAllDonors);
donorRouter.route('/donor/:id').patch(updateDonor).delete(deleteDonor);
donorRouter.get('/donor/:id/campaigns', getCampaignsForDonor);

export default donorRouter;
