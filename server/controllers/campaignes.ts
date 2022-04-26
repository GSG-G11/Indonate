import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Campaign, Category } from '../database/models';

const campaigns = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {
      search,
      available,
      category,
      page,
    } = req.query;
    const limit:number = 5;
    const pageNum:number = Number(page);
    const categoryObject = category ? { name: category } : {};
    const searchObject = search ? { title: search } : {};
    const availableObject = available ? { is_available: available } : {};

    const campaignesData:any = await Campaign.findAll({
      offset: (pageNum - 1) * limit,
      limit,
      attributes:
       ['id', 'title', 'description', 'target', 'image_link', 'is_available', 'categoryId'],
      where: {
        [Op.and]: [searchObject, availableObject],
      },
      include: {
        model: Category,
        attributes: ['name', 'icon_url'],
        where: categoryObject,
      },
    });

    res.json({ message: 'Success', data: campaignesData });
  } catch (e) {
    next(e);
  }
};
export default campaigns;
