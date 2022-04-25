import { Router } from 'express';
import { campaigns } from '../controllers';

const userRoutes = Router();
userRoutes.get('/campaigns', campaigns);
export default userRoutes;
