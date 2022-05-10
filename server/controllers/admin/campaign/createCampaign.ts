import { Request, Response, NextFunction } from 'express';
import { Campaign } from '../../../database/models';

const createCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title, description,
      food_target: foodTarget,
      clothes_target: clothesTarget,
      money_target: moneyTarget,
      image_link: imageLink,
    } = req.body;

    const response = await Campaign.create({
      title,
      description,
      food_target: foodTarget,
      clothes_target: clothesTarget,
      money_target: moneyTarget,
      image_link: imageLink,
    });
    console.log(response);
    res.status(201).json({ message: 'Campaign added successfully' });
  } catch (e) {
    res.json(e.name);
    next();
  }
};
export default createCampaign;
