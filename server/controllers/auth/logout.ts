import { Request, Response } from 'express';

const logout = async (req: Request, res: Response) => {
  res.clearCookie('ACCESS_TOKEN').json({ message: 'logged out successfully!', status: 200 });
};

export default logout;
