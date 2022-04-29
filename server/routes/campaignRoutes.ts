import { Router } from 'express';
import { getCampaignById, campaigns,statistics } from '../controllers';
const campaignRouter = Router();


campaignRoutes.get('/campaigns', campaigns);
campaignRoutes.route('/campaign/:id').get(getCampaignById);
campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.get('/statistics', statistics);
export default campaignRouter;
