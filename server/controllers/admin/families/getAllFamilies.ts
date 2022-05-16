import { Request, Response, NextFunction } from 'express';
import {
  Capon, Family, sequelize,
} from '../../../database/models';
import { CustomError, querySchema } from '../../../utils';

const getAllFamilies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1 }: any = await querySchema.validateAsync(req.query);
    const { rows, count } = await Family.findAndCountAll({
      limit: 5,
      offset: (+page - 1) * 5,
      include: [{
        duplicating: false,
        model: Capon,
        attributes: [],
      },
      ],
      attributes: ['id', 'name', 'phone', 'address',
        [sequelize.fn('sum', sequelize.col('capons.clothes')), 'clothes'],
        [sequelize.fn('sum', sequelize.col('capons.money')), 'money'],
        [sequelize.fn('sum', sequelize.col('capons.food')), 'food'],
      ],
      group: ['families.id'],
      order: [
        ['id', 'DESC'],
        ['name', 'ASC'],
      ],

    });
    res.json({ message: 'Success', data: { families: rows, count: count.length } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 401));
    }
    next(error);
  }
};

export default getAllFamilies;
