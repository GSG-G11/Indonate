import { Router } from 'express';
import { getCampaignById, campaigns } from '../controllers';

const campaignRoutes = Router();

campaignRoutes.get('/campaigns', campaigns);
campaignRoutes.route('/campaign/:id').get(getCampaignById);
export default campaignRoutes;
