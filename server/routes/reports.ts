import { Router } from 'express';
import { deleteReports, getReports, reports } from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const reportsRouter = Router();

reportsRouter.route('/reports').post(reports);
reportsRouter.route('/admin/reports').get(authUser, authAdmin, getReports);
reportsRouter.delete('/admin/report/:id', authUser, authAdmin, deleteReports);
export default reportsRouter;
