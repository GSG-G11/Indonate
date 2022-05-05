import { Response, NextFunction } from 'express';
import { customError } from '../../utils';

const authAdmin = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req;
  if (!user.isAdmin) {
    next(new customError('Unauthorized', 401));
  }
  next();
};

export default authAdmin;
