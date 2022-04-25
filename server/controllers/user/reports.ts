import { NextFunction, Request, Response } from 'express';
import { CustomedError, reportsSchema } from '../../utils';
import { Contact } from '../../database/models';

const reports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reportsSchema.validateAsync(req.body);
    await Contact.create(result);
    res.status(201).json({ message: 'report sent successfully' });
  } catch (error) {
    if (error.errors) next(new CustomedError('fail to create report', 400));
    if (error.name === 'ValidationError') next(new CustomedError(error.details[0].message, 400));
    next(error);
  }
};

export default reports;
