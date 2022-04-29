import { Router } from 'express';
import { getCampaignById, campaigns, statistics } from '../controllers';

const campaignRouter = Router();

campaignRouter.get('/campaigns', campaigns);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.get('/statistics', statistics);
export default campaignRouter;
