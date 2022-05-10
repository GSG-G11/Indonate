import { Request, Response, NextFunction } from 'express';
import {
  Capon, Family, sequelize,
} from '../../database/models';
import { CustomError, pageSchema } from '../../utils';

const getAllFamilies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1 }:any = await pageSchema.validateAsync(req.query);
    const families = await Family.findAll({

      offset: (+page - 1) * 1,
      limit: 1,
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
    console.log(e);
    next(e);
  }
};

export default getAllFamilies;
