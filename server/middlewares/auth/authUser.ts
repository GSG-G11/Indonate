import { Response, NextFunction } from 'express';
import { verifyToken, CustomedError } from '../../utils';

export interface userRequestType extends Request {
  user: unknown,
  cookies: { ACCESS_TOKEN: string; };
}

const authUser = async (req: userRequestType, res: Response, next: NextFunction) => {
  try {
    const { ACCESS_TOKEN } = req.cookies;
    const userToken = await verifyToken(ACCESS_TOKEN);
    const user: object = userToken as object;
    req.user = user;
    next();
  } catch (e) {
    next(new CustomedError('Unauthorized user', 401));
  }
};

export default authUser;
