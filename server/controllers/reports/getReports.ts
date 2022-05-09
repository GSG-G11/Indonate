import { Request, Response, NextFunction } from 'express';
import { Report } from '../../database/models';
import { CustomError, querySchema } from '../../utils';

const getReports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1 }: any = req.query;
    await querySchema.validateAsync(req.query);
    const { count, rows: reports } = await Report.findAndCountAll({
      limit: 10,
      offset: (page - 1) * 10,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.json({ message: 'Success', data: { reports, count } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 401));
    }
    next(error);
  }
};

export default getReports;
