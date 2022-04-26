import express from 'express';
import authRouter from './authRoutes';
import campaignRoutes from './campaignRoutes';

const router = express.Router();
router.use(authRouter);
router.use(campaignRoutes);

export default router;
