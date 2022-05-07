import { Router } from 'express';
import { getDonorsByCampaignId } from '../controllers';

const adminDonors = Router();

adminDonors.get('/admin/campaign/donors/:id', getDonorsByCampaignId);

export default adminDonors;
