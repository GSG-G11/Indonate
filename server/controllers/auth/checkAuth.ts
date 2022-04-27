import { Response } from 'express';

const checkUser = (req:any, res:Response) => {
  res.json({ data: { user: req.user } });
};
export default checkUser;
