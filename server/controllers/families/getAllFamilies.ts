import { Request, Response, NextFunction } from 'express';
import { Family } from '../../database/models';

const getAllFamilies = async (req:Request, res:Response, next:NextFunction) => {
  const families = await Family.findAll();
  res.send(families);
  next();
};

export default getAllFamilies;
