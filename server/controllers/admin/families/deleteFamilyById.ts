import { Request, Response, NextFunction } from 'express';
import { Capon, Family } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const deleteFamilyById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await paramsSchema.validateAsync(req.params);

    const caponsForFamily = await Capon.findAll({
      where: {
        familyId: id,
      },
      raw: true,
    });
    if (caponsForFamily.length) {
      throw new CustomError('You cannot delete this family', 400);
    }

    const deletedFamily = await Family.destroy({
      where: {
        id,
      },
    });
    if (!deletedFamily) {
      throw new CustomError(
        'The family you are trying to delete does not exist',
        400,
      );
    } else {
      res.json({
        message: 'Family deleted successfully',
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    next(error);
  }
};

export default deleteFamilyById;
