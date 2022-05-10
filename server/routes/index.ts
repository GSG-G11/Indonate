import { Router } from 'express';

import authRouter from './auth';
import categoryRouter from './category';
import campaignRouter from './campaign';
import reportsRouter from './reports';
import donationRouter from './donation';
import adminDonors from './adminDonors';
import adminDonorRouter from './adminDonor';
import familyRouter from './adminFamily';

const router = Router();

router.use(donationRouter);
router.use(authRouter);
router.use(categoryRouter);
router.use(campaignRouter);
router.use(reportsRouter);
router.use('/admin', adminDonors);
router.use('/admin', adminDonorRouter);
router.use('/admin', familyRouter);

export default router;
