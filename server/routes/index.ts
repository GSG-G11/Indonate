import { Router } from 'express';

import authRouter from './authRoutes';
import categoryRouter from './categoryRoutes';
import campaignRoutes from './campaignRoutes';
import reportsRouter from './reportsRoutes';

const router = Router();

router.use(authRouter);
router.use(categoryRouter);
router.use(campaignRoutes);
router.use(reportsRouter);

export default router;
