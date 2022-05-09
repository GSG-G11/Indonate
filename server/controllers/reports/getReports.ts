import { Request, Response, NextFunction } from 'express';
import { Contact } from '../../database/models';

const getReports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reports = await Contact.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.json({ message: 'Success', data: { reports } });
  } catch (error) {
    next(error);
  }
};

export default getReports;
