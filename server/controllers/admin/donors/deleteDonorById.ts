import { NextFunction, Response, Request } from 'express';
import { Donor } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const deleteDonorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const deletedDonor = await Donor.destroy({
      where: { id },
    });
    if (!deletedDonor) throw new CustomError('The donor you are trying to delete does not exist', 400);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default deleteDonorById;
