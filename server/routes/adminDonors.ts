import { Router } from 'express';
import { getDonorsByCampaignId } from '../controllers';

const adminDonors = Router();

adminDonors.get('/campaign/donors/:id', getDonorsByCampaignId);

export default adminDonors;
