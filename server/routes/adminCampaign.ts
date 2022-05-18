import { Router } from 'express';
import { postFamiliesForCampaign, updateCampaign } from '../controllers';
import {
  authAdmin,
  authUser,
} from '../middlewares';

const adminCampaignRouter = Router();
adminCampaignRouter.post('/campaign/:id/families', authUser, authAdmin, postFamiliesForCampaign);
adminCampaignRouter.patch('/campaign/:id', authUser, authAdmin, updateCampaign);
export default adminCampaignRouter;
