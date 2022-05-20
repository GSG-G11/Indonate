import { Router } from 'express';
import { createReport } from '../../controllers';

const reportsRouter = Router();

reportsRouter.post('/reports', createReport);

export default reportsRouter;
