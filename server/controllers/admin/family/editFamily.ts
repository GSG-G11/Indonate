import { NextFunction, Response, Request } from 'express';
import { Family } from '../../../database/models';
import { CustomError } from '../../../utils';
import { paramsSchema, familySchema } from '../../../utils/validation';

const editFamily = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('hello from edit family info');

    const { id } = await paramsSchema.validateAsync(req.params);
    const { dataValues }: any = await Family.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!dataValues) throw new CustomError('ID does not exist', 400);
    //     await Donor.destroy({
    //       where: { id },
    //     });
    console.log(dataValues);
    console.log(req.body);
    const data: any = await familySchema.validateAsync(req.body);
    const { name, phone, address } = data;
    const update: any = {
      id, name, phone, address,
    };

    const updatedData = await Family.update(id, update);
    console.log(updatedData);

    // console.log(updatedData, 'kkkkkkkkkkkkk');
    // if (!update) next(new CustomError('Failed update', 400));
    res.status(200).json({ message: 'updated successfully', data });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default editFamily;
