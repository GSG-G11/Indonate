import { NextFunction, Response, Request } from 'express';
import { Category } from '../../database/models';
import { CustomedError } from '../../utils';

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories: any = await Category.findAll({
      attributes: ['id', 'name', 'icon_url'],
      raw: true,
    });
    console.log(categories);
    if (categories.length === 0) throw new CustomedError('There is no categories', 400);
    res.json({ message: 'Success', data: { categories } });
  } catch (error) {
    next(error);
  }
};

export default getAllCategories;
