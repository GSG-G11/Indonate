import { NextFunction, Request, Response } from 'express';
import { Campaign, Donor } from '../../database/models';
import { CustomError } from '../../utils';
import { donorsQuerySchema } from '../../utils/validation';

const getDonors = async (req:Request, res:Response, next:NextFunction) => {
  try {
    await donorsQuerySchema.validateAsync(req.query);
    const { rows: donors, count } = await Donor.findAndCountAll({

      include: {
        model: Campaign,
        attributes: ['id', 'title'],
        through: {
          attributes: ['food', 'clothes', 'money'],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'profile_img', 'password', 'is_admin'],
      },
      order: [
        ['id', 'DESC'],
      ],

    });

    res.json({ message: 'Success', data: { donors, count } });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomError(e.message, 400));
    }
  }
};
export default getDonors;
