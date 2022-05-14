import { Router } from 'express';

import authRouter from './auth';
import categoryRouter from './category';
import campaignRouter from './campaign';
import reportsRouter from './reports';
import donationRouter from './donation';
import adminFamilyRouter from './adminFamilyRoutes';
import adminDonors from './adminDonors';
import adminDonorRouter from './adminDonor';
import familyRouter from './adminFamily';
import adminCampaignRouter from './adminCampaign';

const router = Router();

router.use(donationRouter);
router.use(authRouter);
router.use(categoryRouter);
router.use(campaignRouter);
router.use(reportsRouter);

router.use('/admin', adminFamilyRouter);
router.use('/admin', adminDonors);
router.use('/admin', adminDonorRouter);
router.use('/admin', familyRouter);
router.use('/admin', adminCampaignRouter);

export default router;
