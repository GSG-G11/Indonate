import { Router } from 'express';
import getCampaginsforFamily from '../controllers/admin/families/getCampaginsforFamily';
import { addFamily, deleteFamilyById, getAllFamilies } from '../controllers';
import { authUser, authAdmin } from '../middlewares';

const familyRouter = Router();

familyRouter.get('/families', authUser, authAdmin, getAllFamilies);
familyRouter.post('/family', authUser, authAdmin, addFamily);
familyRouter.delete('/family/:id', authUser, authAdmin, deleteFamilyById);
familyRouter.get('/family/:id/campaigns', authUser, authAdmin, getCampaginsforFamily);

export default familyRouter;
