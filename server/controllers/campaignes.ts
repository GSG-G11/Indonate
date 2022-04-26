import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Campaign, Category } from '../database/models';
import { CustomedError, querySchema } from '../utils';

const campaigns = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {
      search,
      available,
      category,
      page,
      limit,
    } = req.query;
    const pageNum = page || 1;
    const categoryObject = category ? { name: category } : {};
    const searchObject = search ? { title: search } : {};
    const availableObject = available ? { is_available: available } : {};

    const {
      page: validatedPageNumber,
      limit: validatedLimitNumber,
    } = await querySchema.validateAsync({
      page: pageNum,
      limit,
    });

    const campaignesData:any = await Campaign.findAll({
      offset: (validatedPageNumber - 1) * (validatedLimitNumber || 1),
      limit: validatedLimitNumber,
      attributes:
       ['id', 'title', 'description', 'target', 'image_link', 'is_available', 'categoryId'],
      where: {
        [Op.and]: [searchObject, availableObject],
      },
      order: [
        ['id', 'DESC'],
      ],
      include: {
        model: Category,
        attributes: ['name', 'icon_url'],
        where: categoryObject,
      },
    });

    res.json({ message: 'Success', data: campaignesData });
  } catch (e) {
    if (e.details) {
      next(new CustomedError(e.message, 400));
    }
    next(e);
  }
};
export default campaigns;
