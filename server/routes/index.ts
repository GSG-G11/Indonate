import express from 'express';
import authRouter from './authRoutes';
import categoryRouter from './categoryRoutes';

const router = express.Router();
router.use(authRouter);
router.use(categoryRouter);

export default router;
