import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Campaign, Category } from '../../database/models';
import { CustomedError, querySchema } from '../../utils';

const campaigns = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {
      search,
      available,
      category,
      page,
      limit,
    }:any = req.query;

    await querySchema.validateAsync(req.query);
    const campaignesData:any = await Campaign.findAll({
      offset: ((page || 1) - 1) * (limit || 1),
      limit,
      attributes:
       ['id', 'title', 'description', 'image_link', 'is_available', 'categoryId'],
      where: {
        [Op.and]: [available && { is_available: available }, search && { title: search }],
      },
      order: [
        ['id', 'DESC'],
      ],

      include: {
        model: Category,
        attributes: ['name', 'icon_url'],
        where: category && { name: category },

      },
    });

    res.json({ message: 'Success', data: { campaigns: campaignesData } });
  } catch (e) {
    console.log(e);
    if (e.name === 'ValidationError') {
      next(new CustomedError(e.message, 400));
    }
    next(e);
  }
};
export default campaigns;
