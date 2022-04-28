import { NextFunction, Response } from 'express';
import { Campaign, Donation } from '../../database/models';
import { CustomedError } from '../../utils';
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
        food, clothes, money, description, location, deliver_time,
      },
    } = req;
    const campaign = await Campaign.findByPk(campaignId, {
      raw: true,
    });
    if (!campaign) {
      throw new CustomedError('Cannot add donation, campaign not exists', 400);
    }
    await paramsSchema.validateAsync({ id: campaignId });
    await donationSchema.validateAsync(req.body);

    if (!food && !clothes && !money) {
      next(
        new CustomedError(
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
      deliver_time,
    });
    res.status(201).json({ message: 'Donation added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomedError(error.details[0].message, 400));
    } else {
      next(error);
    }
  }
};
export default addDonation;
