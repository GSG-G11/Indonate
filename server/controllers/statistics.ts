import { Request, Response } from 'express';

const statistics = (req: Request, res: Response) => {
  res.send('Hello World');
};

export default statistics;
