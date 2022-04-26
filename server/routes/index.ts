import express from 'express';
import authRouter from './authRoutes';
import reportsRouter from './reportsRoutes';

const router = express.Router();
router.use(authRouter);
router.use(reportsRouter);

export default router;
