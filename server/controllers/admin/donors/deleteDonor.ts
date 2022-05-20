import { NextFunction, Response, Request } from 'express';
import { Donor, Donation } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const deleteDonor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const donationsForDonor = await Donation.findAll({
      where: {
        donorId: id,
      },
    });
    if (donationsForDonor.length) throw new CustomError('You cannot delete this donor', 400);
    const deletedDonor = await Donor.destroy({
      where: { id },
    });
    if (!deletedDonor) { throw new CustomError('The donor you are trying to delete does not exist', 400); }
    res.json({ message: 'Donor deleted successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default deleteDonor;
