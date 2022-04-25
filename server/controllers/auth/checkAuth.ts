import { Response } from 'express';

const checkUser = (req:any, res:Response) => {
  res.status(200).json({
    data: [{
      id: req.user.id,
      name: req.user.name,
      isAdmin: req.user.isAdmin,
    }],
  });
};
export default checkUser;
