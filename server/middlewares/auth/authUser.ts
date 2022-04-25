import { Response, NextFunction } from 'express';
import { verifyToken, CustomedError } from '../../utils';

export interface IGetUserAuthInfoRequest extends Request {
  user: unknown,
}

const authUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { ACCESS_TOKEN } = req.cookies;
    const userToken = await verifyToken(ACCESS_TOKEN);
    const user: object = userToken as object;
    req.user = user;
    next();
  } catch (e) {
    next(new CustomedError('Unauthorized catch', 401));
  }
};

export default authUser;
