import { Router } from 'express';
import { getCampaignById } from '../controllers';

const campaignRoutes = Router();

campaignRoutes.route('/campaign/:id').get(getCampaignById);

export default campaignRoutes;
