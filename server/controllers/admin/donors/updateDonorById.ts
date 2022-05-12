import { NextFunction, Response, Request } from 'express';
import { Donor } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';
import { donorSchema } from '../../../utils/validation';

const updateDonorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const updateData = await donorSchema.validateAsync(req.body);
    const response = await Donor.update(updateData, {
      where: { id },
    });
    if (!response[0]) {
      throw new CustomError('Update donor failed', 400);
    }
    res.json({ message: 'Donor updated successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default updateDonorById;
