import { Request, Response } from 'express';
import Family from '../database/models/family';
import Doners from '../database/models/donor';

const statistics = async (req: Request, res: Response) => {
  let counts = {};
  const families = await Family.count();
  const doners = await Doners.count();

  counts = { families, doners };
  res.send(counts);
};

export default statistics;
