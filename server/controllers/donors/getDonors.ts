import { Request, Response, NextFunction } from 'express';
import { Campaign, Donor } from '../../database/models';
import { CustomError } from '../../utils';
import { donorsQuerySchema } from '../../utils/validation';

const getDonors = async (req:Request, res:Response, next:NextFunction) => {
  try {
    // const { limit, page } = req.query;
    await donorsQuerySchema.validateAsync(req.query);
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomError(e.message, 400));
    }
  }
};

export default getDonors;
