import { Router } from 'express';
import { getReports, reports } from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const reportsRouter = Router();

reportsRouter.route('/reports').post(reports);
reportsRouter.route('/admin/reports').get(authUser, authAdmin, getReports);

export default reportsRouter;
