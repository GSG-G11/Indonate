import express from 'express';
import authRouter from './authRoutes';
import userRoutes from './UserRoutes';

const router = express.Router();
router.use(authRouter);
router.use(userRoutes);
export default router;
