import { Request, Response, NextFunction } from 'express';
import { Report } from '../../database/models';

const getReports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 }: any = req.query;
    const { count, rows: reports } = await Report.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.json({ message: 'Success', data: { reports, count } });
  } catch (error) {
    next(error);
  }
};

export default getReports;
