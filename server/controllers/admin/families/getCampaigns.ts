import { NextFunction, Response, Request } from 'express';

const getCampagins = async (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello from family campaigns');
  next();
};

export default getCampagins;
