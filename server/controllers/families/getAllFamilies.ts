import { Request, Response, NextFunction } from 'express';
import {
  Capon, Family, sequelize,
} from '../../database/models';

const getAllFamilies = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
    });

    res.json(families);
  } catch (e) {
    next(e);
  }
};

export default getAllFamilies;
