import { Router } from 'express';
import {
  getAllReports,
  deleteReport,
} from '../../controllers';

const reportRouter = Router();

reportRouter.get('/reports', getAllReports);
reportRouter.delete('/report/:id', deleteReport);

export default reportRouter;
