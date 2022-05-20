import { Router } from 'express';
import {
  addFamiliesForCampaign,
  createCampaign,
  deleteCampaign,
  getAllCampaigns,
  getDonorsForCampaign,
  getFamiliesForCampaign,
  updateCampaign,
} from '../../controllers';

const campaignRouter = Router();

campaignRouter.get('/campaigns', getAllCampaigns);
campaignRouter.post('/campaign', createCampaign);
campaignRouter
  .route('/campaign/:id')
  .delete(deleteCampaign)
  .patch(updateCampaign);
campaignRouter
  .route('/campaign/:id/families')
  .post(addFamiliesForCampaign)
  .get(getFamiliesForCampaign);
campaignRouter.get('/campaign/:id/donors', getDonorsForCampaign);

export default campaignRouter;
