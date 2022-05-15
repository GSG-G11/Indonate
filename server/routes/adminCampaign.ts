import { Router } from 'express';
import { postFamiliesForCampaign } from '../controllers';
import { authAdmin, authUser } from '../middlewares';

const adminCampaignRouter = Router();
adminCampaignRouter.post('/campaign/:id/families', authUser, authAdmin, postFamiliesForCampaign);
export default adminCampaignRouter;
