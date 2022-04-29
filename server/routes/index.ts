import express from 'express';
import authRouter from './authRoutes';
import categoryRouter from './categoryRoutes';
import campaignRouter from './campaignRoutes';
import reportsRouter from './reportsRoutes';
import donationRouter from './donationRoutes';

const router = express.Router();
router.use(donationRouter);
router.use(authRouter);
router.use(categoryRouter);
router.use(campaignRouter);
router.use(reportsRouter);

export default router;
