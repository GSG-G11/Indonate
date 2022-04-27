import { Response } from 'express';

const checkUser = (req:any, res:Response) => {
  res.json({ data: req.user, message: 'Authorized user' });
};
export default checkUser;
