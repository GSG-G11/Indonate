import { Router } from 'express';
import { updateCampaign } from '../controllers';

const adminCampaignRouter = Router();
adminCampaignRouter.patch('/campaign/:id', updateCampaign);
export default adminCampaignRouter;
