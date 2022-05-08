import { Router } from 'express';
import { getDonors } from '../controllers';

const donorsRouter = Router();
donorsRouter.get('/admin/donors', getDonors);

export default donorsRouter;
