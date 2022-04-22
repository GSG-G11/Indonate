import express from 'express';
import authRouter from './authRoutes';

const router = express.Router();
router.use(authRouter);
export default router;
