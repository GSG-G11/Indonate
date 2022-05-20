import { Router } from 'express';
import { addDonation } from '../../controllers';
import { authUser } from '../../middlewares';

const donationRouter = Router();

donationRouter.post('/donation/:campaignId', authUser, addDonation);

export default donationRouter;
