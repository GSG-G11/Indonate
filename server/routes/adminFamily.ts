import { Router } from 'express';
import { addFamily, deleteFamilyById } from '../controllers';
import getCampagins from '../controllers/admin/families/getCampaigns';
import { authUser, authAdmin } from '../middlewares';

const familyRouter = Router();

familyRouter.post('/family', authUser, authAdmin, addFamily);
familyRouter.delete('/family/:id', authUser, authAdmin, deleteFamilyById);
familyRouter.get('/families/campaigns/:id', authUser, authAdmin, getCampagins);

export default familyRouter;
