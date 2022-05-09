import { Response, NextFunction } from 'express';
import { CustomError } from '../../utils';

const authAdmin = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req;
  if (!user.isAdmin) {
    next(new CustomError('Unauthorized admin', 401));
  }
  next();
};

export default authAdmin;
