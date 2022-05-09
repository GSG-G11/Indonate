import { Request, Response, NextFunction } from 'express';
import { Family } from '../../database/models';

const deleteFamilyById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const deletedFamily = await Family.destroy({
      where: {
        id,
      },
    });
    if (!deletedFamily) {
      res.status(400).json({
        message: "The family you are trying to delete doesn't exist",
      });
    } else {
      res.json({
        message: 'Family deleted successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

export default deleteFamilyById;
