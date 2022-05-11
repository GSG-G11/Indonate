import { Request, Response, NextFunction } from 'express';

const deleteCampaign = async (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello from delete');
  next();
};

export default deleteCampaign;
