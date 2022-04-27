import { Request, Response } from 'express';

const logout = async (req: Request, res: Response) => {
  res.clearCookie('ACCESS_TOKEN').json({ message: 'logged out successfully!' });
};

export default logout;
