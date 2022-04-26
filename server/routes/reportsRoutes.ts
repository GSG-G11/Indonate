import { Router } from 'express';
import { reports } from '../controllers';

const reportsRoutes = Router();

reportsRoutes.route('/reports').post(reports);

export default reportsRoutes;
