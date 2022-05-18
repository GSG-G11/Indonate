import Joi from 'joi';

const familiesForCampaignSchema = Joi.object({
  food: Joi.number().required(),
  ids: Joi.array().items(Joi.number()).required(),
  clothes: Joi.number().required(),
  money: Joi.number().required(),
});

export default familiesForCampaignSchema;
