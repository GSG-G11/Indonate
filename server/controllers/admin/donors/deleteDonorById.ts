import { NextFunction, Response, Request } from 'express';
import { Donor } from '../../../database/models';
import { CustomError } from '../../../utils';
import { paramsSchema } from '../../../utils/validation';

const deleteDonorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const donorInfo = await Donor.findByPk(id);
    if (!donorInfo) throw new CustomError('ID does not exist', 400);
    await Donor.destroy({
      where: { id },
    });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default deleteDonorById;
