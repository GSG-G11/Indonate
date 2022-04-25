import { Router } from 'express';
import { getCampaignById } from '../controllers';

const userRouter = Router();

userRouter.route('/campaign/:id').get(getCampaignById);

export default userRouter;
