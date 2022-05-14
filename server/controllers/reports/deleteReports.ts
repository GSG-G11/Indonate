import { NextFunction, Request, Response } from 'express';
import { Report } from '../../database/models';
import { CustomError, paramsSchema } from '../../utils';

const deleteReports = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const result = await Report.destroy({
      where: {
        id,
      },
    });
    if (!result) throw new CustomError('The report does not exist', 400);
    res.json({ message: 'Report deleted successfuly' });
  } catch (error) {
    if (error.name) next(new CustomError(error.message, 400));
    next(error);
  }
};
export default deleteReports;
