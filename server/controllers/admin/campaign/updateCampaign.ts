import { NextFunction, Request, Response } from 'express';
import { Campaign } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const updateCampaign = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.message, 400));
    next(error);
  }
};
export default updateCampaign;
