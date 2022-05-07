import { Router } from 'express';
import { addFamily } from '../controllers';

const familyRoutes = Router();

familyRoutes.post('/family', addFamily);

export default familyRoutes;
