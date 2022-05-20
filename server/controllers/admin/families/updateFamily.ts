import { NextFunction, Response, Request } from 'express';
import { Family } from '../../../database/models';
import { paramsSchema, familySchema, CustomError } from '../../../utils';

type Check = {
  id: number;
}

const updateFamily = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const checkPhone: Check | any = await Family.findOne({
      where:
        { phone: req.body.phone },
    });
    if (checkPhone && checkPhone.id !== id) throw new CustomError('Phone is used', 400);
    const data = await familySchema.validateAsync(req.body);
    const updatedData = await Family.update(data, { where: { id } });
    if (updatedData[0] === 0) throw new CustomError('updated Failed', 400);
    res.json({ message: 'Family updated successfully', data });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default updateFamily;
