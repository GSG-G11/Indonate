import { Router } from 'express';
import {
  createFamily,
  deleteFamily,
  getAllFamilies,
  getCampaignsForFamily,
  updateFamily,
} from '../../controllers';

const familyRouter = Router();
familyRouter.get('/families', getAllFamilies);
familyRouter.post('/family', createFamily);
familyRouter.patch('/family/:id', updateFamily);
familyRouter.delete('/family/:id', deleteFamily);
familyRouter.get('/family/:id/campaigns', getCampaignsForFamily);

export default familyRouter;
