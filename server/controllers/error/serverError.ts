import { Request, Response } from 'express';

const serverError = (err:any, req:Request, res:Response) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Server Error' });
  }
};
export default serverError;
