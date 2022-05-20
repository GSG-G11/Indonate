import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import {
  Campaign, Category, Donor, sequelize,
} from '../../../database/models';
import { CustomError, querySchema } from '../../../utils';

const getFilteredCampaigns = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {
      search,
      available,
      category,
      page = 1,
      limit,
    }:any = req.query;

    await querySchema.validateAsync(req.query);
    const { count, rows: campaignesData } = await Campaign.findAndCountAll({
      offset: (page - 1) * (limit || 6),
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

      include: [{
        model: Category,
        attributes: ['name', 'icon_url'],
        where: category && { name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), { [Op.like]: `%${category.toLowerCase()}%` }) },

      },
      {
        model: Donor,
        through: {
          attributes: [],
        },
        attributes: ['id'],
      },

      ],

    });
    res.json({ message: 'Success', data: { campaigns: campaignesData, count } });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomError(e.message, 400));
    }
    next(e);
  }
};
export default getFilteredCampaigns;
