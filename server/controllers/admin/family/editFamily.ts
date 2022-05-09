import { NextFunction, Response, Request } from 'express';
import { Family } from '../../../database/models';
import { paramsSchema, familySchema, CustomError } from '../../../utils';

const editFamily = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const checkPhone: any = await Family.findOne({
      where:
        { phone: req.body.phone },
    });
    if (checkPhone && checkPhone.id !== id) throw new CustomError('Phone is used', 400);

    const data: any = await familySchema.validateAsync(req.body);
    const { name, phone, address } = data;
    const update: any = { name, phone, address };

    const updatedData = await Family.update(update, { where: { id } });
    if (updatedData[0] === 0) throw new CustomError('updated Failed', 400);
    res.status(200).json({ message: 'updated successfully', data: update });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default editFamily;
