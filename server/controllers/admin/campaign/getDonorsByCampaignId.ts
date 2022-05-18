import { Request, Response, NextFunction } from 'express';
import { Campaign, Donor, sequelize } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const getDonorsByCampaignId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1 } = req.query;
    const { id } = await paramsSchema.validateAsync(req.params);
    const { count, rows: donors } = await Donor.findAndCountAll({
      offset: (+page - 1) * 6,
      limit: 6,
      include: {
        model: Campaign,
        duplicating: false,
        where: { id },
        attributes: [],
        through: {
          attributes: [],
        },
      },
      attributes: ['id',
        'name',
        'phone',
        [sequelize.col('campaigns.donations.food'), 'food'],
        [sequelize.col('campaigns.donations.money'), 'money'],
        [sequelize.col('campaigns.donations.clothes'), 'clothes'],
        [sequelize.col('campaigns.donations.description'), 'description'],
        [sequelize.col('campaigns.donations.deliver_time'), 'deliverTime'],
        [sequelize.col('campaigns.donations.location'), 'location']]
      ,
    });
    res.json({ message: 'Success', data: { count, donors } });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.details[0].message, 400));
    next(error);
  }
};

export default getDonorsByCampaignId;
