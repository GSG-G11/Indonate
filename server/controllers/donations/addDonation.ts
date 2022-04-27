/* eslint-disable camelcase */
import { NextFunction, Response } from 'express';
import { Donation } from '../../database/models';
import { CustomedError } from '../../utils';
import { paramsSchema, donationSchema } from '../../utils/validation';

const addDonation = async (req: any, res: Response, next: NextFunction) => {
  const donorId: number = req.user.id;
  try {
    await paramsSchema.validateAsync(req.params);
    const { id } = req.params;
    await donationSchema.validateAsync(req.body);
    const {
      food, clothes, money, description, location, deliver_time,
    } = req.body;
    await Donation.create({
      campaignId: id,
      donorId,
      food,
      clothes,
      money,
      description,
      location,
      deliver_time,
    });
    res.json({ message: 'Donation added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomedError(error.details[0].message, 400));
    } else {
      next(error);
    }
  }
};
export default addDonation;
