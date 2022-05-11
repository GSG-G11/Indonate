import { NextFunction, Response } from 'express';
import { Campaign, Donation } from '../../database/models';
import { CustomError } from '../../utils';
import { paramsSchema, donationSchema } from '../../utils/validation';

const addDonation = async (req: any, res: Response, next: NextFunction) => {
  try {
    const {
      user: { id: donorId },
    } = req;
    const {
      params: { campaignId },
    } = req;
    const {
      body: {
        food,
        clothes,
        money,
        description,
        location,
        deliver_time: deliverTime,
      },
    } = req;

    await paramsSchema.validateAsync({ id: campaignId });

    const campaign = await Campaign.findByPk(campaignId, {
      raw: true,
    });
    if (!campaign) {
      throw new CustomError('Cannot add donation, campaign not exists', 400);
    }

    await donationSchema.validateAsync(req.body);

    if (!food && !clothes && !money) {
      next(
        new CustomError(
          'You should enter money, piece of clothes, number of meals',
          400,
        ),
      );
    }

    await Donation.create({
      campaignId,
      donorId,
      food,
      clothes,
      money,
      description,
      location,
      deliver_time: deliverTime,
    });
    res.status(201).json({ message: 'Donation added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.details[0].message, 400));
    } else {
      console.log(error);
      next(error);
    }
  }
};
export default addDonation;
