import { Router } from 'express';
import checkAuth from '../controllers';

const router = Router();
router.get('/checkAuth', checkAuth);
export default router;
