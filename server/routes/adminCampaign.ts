import { Router } from 'express';
import { postCampaignFamilies } from '../controllers';
/// import { authAdmin, authUser } from '../middlewares';

const adminCampaignRouter = Router();
adminCampaignRouter.post('/campaign/families/:id', postCampaignFamilies);
export default adminCampaignRouter;
