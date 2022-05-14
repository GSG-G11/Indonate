import { Router } from 'express';
import {
  getCampaignById,
  getFilteredCampaign,
  getStatistics,
} from '../controllers';
import getCampaigns from '../controllers/campaigns/getCampaigns';
import { createCampaign } from '../controllers/admin';

import { authAdmin, authUser } from '../middlewares';

const campaignRouter = Router();
campaignRouter.post('/admin/campaigns', authUser, authAdmin, createCampaign);
campaignRouter.get('/admin/campaigns', authUser, authAdmin, getCampaigns);
campaignRouter.get('/campaigns', getFilteredCampaign);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.get('/statistics', getStatistics);
export default campaignRouter;
