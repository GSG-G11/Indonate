import { NextFunction, Request, Response } from 'express';
import { Campaign, Capon, Family } from '../../../database/models';
import { CustomError, paramsSchema, familiesForCampaignSchema } from '../../../utils';

const postFamiliesForCampaign = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { params: { id: campaignId } } = req;
    const {
      body: {
        ids,
        food,
        clothes,
        money,
      },
    } = req;
    await paramsSchema.validateAsync(req.params);

    const isCampaginExist:any = await Campaign.findByPk(campaignId, {
      raw: true,
    });
    if (!isCampaginExist) throw new CustomError('Campaign does not exits', 400);
    else if (!(isCampaginExist.is_available)) throw new CustomError('Campaign has closed', 400);

    try {
      JSON.parse(ids);
    } catch (e) {
      throw new CustomError('ids must be array of number', 400);
    }

    const { ids: familiesId } = await familiesForCampaignSchema.validateAsync({
      ids: JSON.parse(ids), food, clothes, money,
    }, { convert: true });
    await Promise.all(familiesId.map(async (familyId:any) => {
      const family = await Family.findByPk(familyId, {
        raw: true,
      });
      if (!family) throw new CustomError('Cannot add families', 400);
    }));

    await Campaign.update(
      { is_available: false },
      { where: { id: campaignId } },
    );

    await Promise.all(familiesId.map(async (familyId:any) => {
      await Capon.create({
        campaignId, familyId, food, clothes, money,
      });
    }));

    res.json({ message: 'Families added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    next(error);
  }
};
export default postFamiliesForCampaign;
