import { Router } from 'express';
import { updateCampaign } from '../controllers';
import { authAdmin, authUser } from '../middlewares';

const adminCampaignRouter = Router();
adminCampaignRouter.patch('/campaign/:id', authUser, authAdmin, updateCampaign);
export default adminCampaignRouter;
