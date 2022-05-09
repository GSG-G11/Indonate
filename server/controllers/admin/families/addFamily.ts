import { NextFunction, Response, Request } from 'express';
import { Family } from '../../../database/models';
import { familySchema, CustomError } from '../../../utils';

const addFamily = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const familyInfo = await familySchema.validateAsync(req.body);
    const { phone } = familyInfo;
    const checkPhone: object | null = await Family.findOne({
      where: { phone },
    });
    if (checkPhone) {
      throw new CustomError('phone is used try another one', 400);
    }
    await Family.create(familyInfo);
    res.status(201).json({ message: 'Family added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default addFamily;
