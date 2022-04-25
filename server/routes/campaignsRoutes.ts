import { Router } from 'express';

import { statistics } from '../controllers';

const campaignsRoutes = Router();

campaignsRoutes.get('/statistics', statistics);

export default campaignsRoutes;
