import { NextFunction, Request, Response } from 'express';
import { CustomError, reportsSchema } from '../../utils';
import { Contact } from '../../database/models';

const reports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reportsSchema.validateAsync(req.body);
    await Contact.create(result);
    res.status(201).json({ message: 'Report sent successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default reports;
