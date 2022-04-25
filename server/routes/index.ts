import express from 'express';
import authRouter from './authRoutes';
import userRouter from './userRoutes';

const router = express.Router();
router.use(authRouter);
router.use(userRouter);

export default router;
