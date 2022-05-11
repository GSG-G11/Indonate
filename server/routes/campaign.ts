import { Router } from 'express';
import { getCampaignById, getFilteredCampaign, getStatistics } from '../controllers';
import { deleteCampaign } from '../controllers/admin';
import { authUser, authAdmin } from '../middlewares';

const campaignRouter = Router();

campaignRouter.get('/campaigns', getFilteredCampaign);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.delete('/admin/campaigns/:id', authUser, authAdmin, deleteCampaign);
campaignRouter.get('/statistics', getStatistics);
export default campaignRouter;
