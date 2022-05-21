import { Request, Response, NextFunction } from 'express';

interface error {
  status: number;
  message: string
}

// eslint-disable-next-line no-unused-vars
const serverError = (err: error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Server Error' });
  }
};

export default serverError;
