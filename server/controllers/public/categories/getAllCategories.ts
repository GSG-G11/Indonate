import { NextFunction, Response, Request } from 'express';
import { Campaign, Category } from '../../../database/models';

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories: any = await Category.findAll({
      attributes: ['id', 'name', 'icon_url'],
      include: [Campaign],
    });
    res.json({ message: 'Success', data: { categories } });
  } catch (error) {
    next(error);
  }
};

export default getAllCategories;
