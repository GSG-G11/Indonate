import { Router } from 'express';
import { getStatistics } from '../../controllers';

const statisticsRouter = Router();

statisticsRouter.get('/statistics', getStatistics);

export default statisticsRouter;
