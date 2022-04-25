import express from 'express';
import authRouter from './authRoutes';
import campaignsRoutes from './campaignsRoutes';

const router = express.Router();
router.use(authRouter);
router.use(campaignsRoutes);

export default router;
