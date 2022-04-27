import { Response } from 'express';

const checkUser = (req:any, res:Response) => {
  res.status(200).json({ data: { user: req.user } });
};
export default checkUser;
