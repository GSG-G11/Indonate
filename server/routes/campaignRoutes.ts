import { Router } from 'express';
import { getCampaignById } from '../controllers';

const campaignRouter = Router();

campaignRouter.route('/campaign/:id').get(getCampaignById);

export default campaignRouter;
