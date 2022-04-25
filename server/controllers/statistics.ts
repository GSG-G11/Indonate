import { Request, Response } from 'express';
import Family from '../database/models/family';

const statistics = async (req: Request, res: Response) => {
  let counts = {};
  const families = await Family.count();
  counts = { families };
  res.send(counts);
};

export default statistics;
