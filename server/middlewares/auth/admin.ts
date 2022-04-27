import { Response, NextFunction } from 'express';
import { CustomedError } from '../../utils';

const authAdmin = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req;
  if (!user.isAdmin) {
    next(new CustomedError('Unauthorized', 401));
  }
  next();
};

export default authAdmin;
