import { Router } from 'express';
import { authAdmin, authUser } from '../middlewares';
import {
  adminCampaignRouter,
  adminDonorRouter,
  adminFamilyRouter,
  adminReportRouter,
} from './admin';

import authRouter from './auth';
import donationRouter from './protected/donation';
import {
  categoryRouter,
  campaignRouter,
  reportsRouter,
  statisticsRouter,
} from './public';

const router = Router();

router.use(authRouter);
router.use(categoryRouter);
router.use(campaignRouter);
router.use(reportsRouter);
router.use(statisticsRouter);

router.use(authUser);
router.use(donationRouter);

router.use(authAdmin);
router.use('/admin', adminCampaignRouter);
router.use('/admin', adminDonorRouter);
router.use('/admin', adminFamilyRouter);
router.use('/admin', adminReportRouter);

export default router;
