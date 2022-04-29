import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Campaign, Category, sequelize } from '../../database/models';
import { CustomedError, querySchema } from '../../utils';

const campaigns = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {
      search,
      available,
      category,
      page = 1,
      limit = 6,
    }:any = req.query;

    await querySchema.validateAsync(req.query);
    const campaignesData:any = await Campaign.findAll({
      offset: (page - 1) * limit,
      limit,
      attributes:
       ['id', 'title', 'description', 'image_link', 'is_available', 'categoryId'],

      where: {
        [Op.and]: [available && { is_available: available }, search && {
          title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), { [Op.like]: `%${search.toLowerCase()}%` }),

        }],
      },

      order: [
        ['id', 'DESC'],
      ],

      include: {
        model: Category,
        attributes: ['name', 'icon_url'],
        where: category && { name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), { [Op.like]: `%${category.toLowerCase()}%` }) },

      },
    });

    res.json({ message: 'Success', data: { campaigns: campaignesData } });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomedError(e.message, 400));
    }
    next(e);
  }
};
export default campaigns;
