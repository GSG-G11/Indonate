import { Router } from 'express';
import { reports } from '../controllers';

const reportsRouter = Router();

reportsRouter.route('/reports').post(reports);

export default reportsRouter;
