import { Response, NextFunction } from 'express';
import { verifyToken, CustomError } from '../../utils';

const authUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { ACCESS_TOKEN } = req.cookies;
    const userToken = await verifyToken(ACCESS_TOKEN);
    const user: object = userToken as object;
    req.user = user;
    next();
  } catch (e) {
    next(new CustomError('Unauthorized user', 401));
  }
};

export default authUser;
