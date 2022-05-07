import { Router } from 'express';

import authRouter from './authRoutes';
import categoryRouter from './categoryRoutes';
import campaignRouter from './campaignRoutes';
import reportsRouter from './reportsRoutes';
import donationRouter from './donationRoutes';
import adminDonorRouter from './adminDonorRoutes';

const router = Router();

router.use(donationRouter);
router.use(authRouter);
router.use(categoryRouter);
router.use(campaignRouter);
router.use(reportsRouter);
router.use('/admin', adminDonorRouter);

export default router;
