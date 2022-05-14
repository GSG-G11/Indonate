import { Router } from 'express';
import { postFamiliesForCampaign } from '../controllers';
/// import { authAdmin, authUser } from '../middlewares';

const adminCampaignRouter = Router();
adminCampaignRouter.post('/campaign/:id/families', postFamiliesForCampaign);
export default adminCampaignRouter;
