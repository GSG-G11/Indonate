import { Response } from 'express';

const checkUser = (req:any, res:Response) => {
  const { user } = req;
  res.json({ data: user });
};
export default checkUser;
