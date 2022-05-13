import { Router } from 'express';
import { addFamily, deleteFamilyById } from '../controllers';
import getCampaginsforFamily from '../controllers/admin/families/getCampaginsforFamily';
import { authUser, authAdmin } from '../middlewares';

const familyRouter = Router();

familyRouter.post('/family', authUser, authAdmin, addFamily);
familyRouter.delete('/family/:id', authUser, authAdmin, deleteFamilyById);
familyRouter.get('/family/:id/campaigns', authUser, authAdmin, getCampaginsforFamily);

export default familyRouter;
