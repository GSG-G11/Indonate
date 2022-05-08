import { Router } from 'express';
import { getDonors } from '../controllers';

const donorsRoute = Router();
donorsRoute.get('/admin/donors', getDonors);
export default donorsRoute;
