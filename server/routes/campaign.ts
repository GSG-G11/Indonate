import { Router } from 'express';
import {
  getCampaignById,
  getFilteredCampaign,
  getStatistics,
} from '../controllers';
import getCampaigns from '../controllers/campaigns/getCampaigns';
import { authAdmin, authUser } from '../middlewares';

const campaignRouter = Router();

campaignRouter.get('/campaigns', getFilteredCampaign);
campaignRouter.get('/admin/campaigns', authUser, authAdmin, getCampaigns);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.get('/statistics', getStatistics);
export default campaignRouter;
