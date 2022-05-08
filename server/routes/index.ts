import { Router } from 'express';

import authRouter from './auth';
import categoryRouter from './category';
import campaignRouter from './campaign';
import reportsRouter from './reports';
import donationRouter from './donation';

const router = Router();

router.use(donationRouter);
router.use(authRouter);
router.use(categoryRouter);
router.use(campaignRouter);
router.use(reportsRouter);

export default router;
