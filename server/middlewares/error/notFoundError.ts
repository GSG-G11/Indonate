import { Request, Response } from 'express';

const notFoundError = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Page Not Found ' });
};

export default notFoundError;
