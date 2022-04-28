import { Router } from 'express';
import { getCampaignById, statistics } from '../controllers';

const campaignRouter = Router();

campaignRouter.route('/campaign/:id').get(getCampaignById);
campaignRouter.get('/statistics', statistics);

export default campaignRouter;
