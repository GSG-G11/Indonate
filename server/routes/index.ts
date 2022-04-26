import express from 'express';
import authRouter from './authRoutes';
import categoryRouter from './categoryRoutes';
import reportsRouter from './reportsRoutes';

const router = express.Router();
router.use(authRouter);
router.use(categoryRouter);
router.use(reportsRouter);

export default router;
