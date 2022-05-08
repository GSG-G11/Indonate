import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../utils';
import { donorsQuerySchema } from '../../utils/validation';

const getDonors = async (req:Request, res:Response, next:NextFunction) => {
  try {
    await donorsQuerySchema.validateAsync(req.query);
    res.json({});
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomError(e.message, 400));
    }
  }
};
export default getDonors;
