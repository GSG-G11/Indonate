import { Request, Response, NextFunction } from 'express';
import { Family } from '../../database/models';

const getAllFamilies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const families = await Family.findAll();
    res.json({ message: 'Success', data: { families } });
  } catch (e) {
    next(e);
  }
};

export default getAllFamilies;
