import { Request, Response, NextFunction } from 'express';
import {
  Capon, Family, sequelize,
} from '../../database/models';
import { CustomError, paramsSchema } from '../../utils';

const getAllFamilies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = await paramsSchema.validateAsync(req.query);
    console.log(page);
    const families = await Family.findAll({
      include: [{
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
    res.json({ message: 'Success', data: { families } });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomError(e.message, 401));
    }
    next(e);
  }
};

export default getAllFamilies;
