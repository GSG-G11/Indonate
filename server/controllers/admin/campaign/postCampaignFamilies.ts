import { Request, Response } from 'express';
import { paramsSchema } from '../../../utils';

const postCampaignFamilies = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    await paramsSchema.validateAsync(req.params);
  } catch (error) {
    console.log(error);
  }
};
export default postCampaignFamilies;
