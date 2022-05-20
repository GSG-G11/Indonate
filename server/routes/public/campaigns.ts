import { Router } from 'express';
import {
  getCampaignById,
  getFilteredCampaigns,
} from '../../controllers';

const campaignRouter = Router();
campaignRouter.get('/campaigns', getFilteredCampaigns);
campaignRouter.route('/campaign/:id').get(getCampaignById);

export default campaignRouter;
