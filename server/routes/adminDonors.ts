import { Router } from 'express';
import { getDonorsByCampaignId } from '../controllers';
// import { authUser, authAdmin } from '../middlewares';

const adminDonors = Router();

adminDonors.get('/campaign/:id/donors', /* authUser, authAdmin, */getDonorsByCampaignId);

export default adminDonors;
