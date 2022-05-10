import { Request, Response, NextFunction } from 'express';
import {
  Capon, Family, sequelize,
} from '../../database/models';
import { CustomError, querySchema } from '../../utils';

const getAllFamilies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1 }:any = await querySchema.validateAsync(req.query);
    const families = await Family.findAll({
      limit: 10,
      offset: (+page - 1) * 10,
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
    res.json({ message: 'Success', data: { families } });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomError(e.message, 401));
    }
    next(e);
  }
};

export default getAllFamilies;
