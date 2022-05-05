import { Router } from 'express';
import { getCampaignById, getFilteredCampaign, getStatistics } from '../controllers';

const campaignRouter = Router();

campaignRouter.get('/campaigns', getFilteredCampaign);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.get('/statistics', getStatistics);
export default campaignRouter;
