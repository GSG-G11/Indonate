import { Router } from 'express';
import {
  getCampaignById,
  getFilteredCampaign,
  getStatistics,
} from '../controllers';
import { deleteCampaign, createCampaign } from '../controllers/admin';
import getCampaigns from '../controllers/campaigns/getCampaigns';

import { authAdmin, authUser } from '../middlewares';

const campaignRouter = Router();
campaignRouter.post('/admin/campaigns', authUser, authAdmin, createCampaign);
campaignRouter.get('/admin/campaigns', authUser, authAdmin, getCampaigns);
campaignRouter.get('/campaigns', getFilteredCampaign);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.delete('/admin/campaigns/:id', authUser, authAdmin, deleteCampaign);
campaignRouter.get('/statistics', getStatistics);
export default campaignRouter;
