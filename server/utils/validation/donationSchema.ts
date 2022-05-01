import * as Joi from 'joi';

const donationSchema = Joi.object({
  type: Joi.string(),
  food: Joi.number().min(1),
  clothes: Joi.number().min(1),
  money: Joi.number().min(1),
  description: Joi.string().min(1).max(255).required(),
  location: Joi.string().min(1).max(255).required(),
  deliver_time: Joi.date().required(),
  donorId: Joi.number(),
});

export default donationSchema;
