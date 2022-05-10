import { Request, Response, NextFunction } from 'express';
import { Campaign } from '../../../database/models';

const createCampaign = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const response = await Campaign.create({
    });
    res.json(response);
  } catch (e) {
    res.json(e.name);
    next();
  }
};
export default createCampaign;
