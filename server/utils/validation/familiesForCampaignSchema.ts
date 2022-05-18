import Joi from 'joi';

const familiesForCampaignSchema = Joi.object({
  ids: Joi.array().items(Joi.number()).required(),
});

export default familiesForCampaignSchema;
